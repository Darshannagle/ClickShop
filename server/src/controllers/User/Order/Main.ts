// DAOs

import { USER_MSG } from "@common/messages";
import OrderDao from "@models/OrderDao";
import OrderItemDao from "@models/OrderItemDao";
import { ProductDao } from "@models/ProductDao";
import { PaymentMethod } from "@prisma/client";
import { isQueryError, sanitize } from "@utils";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { CartItemDao } from "@models/CartItemDao";
import stripe from "@config/Stripe";
import config from "@config";
import Constant from "@config/Constant";

//--------------------------------------------------------------
export default class Main {
  static async create(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      // sanitize data {
      console.log("req.body: ", req.body);
      const sanitizeResult = await sanitize(req.body, {
        addressId: `required | exist: Address.id (${USER_MSG.ORDER.CREATE.ADDRESS_NOT_FOUND})`,
        totalAmount: `required | number | normalize: number`,
        paymentMethod: `required | in: ${Object.values(PaymentMethod).join(",")}`,
      });
      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }
      const body = sanitizeResult.body;
      // } sanitize data

      const cartItemsRes = Promise.all(
        body.cartItems.map(async (cartItem: any) => {
          const res = await sanitize(cartItem, {
            id: `required | exist: CartItem.id (${USER_MSG.CART_ITEM.SET_QUANTITY.CART_ITEM_NOT_FOUND})`,
            quantity: `required | number | min: 1 | normalize: number`,
            soldPrice: `required | number | normalize: number`,
          });
          if (res?.error || !res?.body) throw contextError.client(res);
          return res.body;
        }),
      );

      const cartItems = await cartItemsRes;
      body.cartItems = cartItems;

      const user = contextUser;
      console.log("body.paymentMethod: ", body.paymentMethod);
      let order = await OrderDao.create({
        totalAmount: 0,
        orderStatus: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: body.paymentMethod,
        user: { connect: { id: user.id } },
        address: { connect: { id: body.addressId } },
        orderItems: [],
      });
      if (isQueryError(order))
        throw contextError.client(USER_MSG.ORDER.CREATE.FAILED);

      let totalAmount = 0;

      for (const cartItem of cartItems) {
        const product = await ProductDao.findById(cartItem.productId);
        totalAmount += cartItem.quantity * cartItem.soldPrice;
        const orderItem = await OrderItemDao.create({
          // productId: cartItem.productId,
          product: { connect: { id: cartItem.productId } },
          quantity: cartItem.quantity,
          soldPrice: cartItem.soldPrice,
          productSnapshot: JSON.parse(JSON.stringify(product)),
          order: { connect: { id: order.id } },
        });
        if (isQueryError(orderItem))
          throw contextError.client(USER_MSG.ORDER.CREATE.FAILED);
        order.orderItems.push(orderItem);
      }
      order.addressId = body.addressId;
      order.totalAmount = totalAmount;
      order.paymentMethod = body.paymentMethod;

      order = await OrderDao.findByIdAndUpdate(order.id, order);
      if (isQueryError(order))
        throw contextError.client(USER_MSG.ORDER.CREATE.FAILED);

      if (body.paymentMethod === PaymentMethod.ONLINE) {
        order.paymentStatus = PaymentStatus.PENDING;
        order = await OrderDao.findByIdAndUpdate(order.id, order);
        if (isQueryError(order))
          throw contextError.client(USER_MSG.ORDER.CREATE.FAILED);

        console.log("order?.orderItems: ", order?.orderItems);
        const lineItems = (order?.orderItems || [])?.map((orderItem: any) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: orderItem?.productSnapshot?.name,
              },
              unit_amount: Math.round(orderItem.soldPrice * 100),
            },
            quantity: orderItem.quantity,
          };
        });
        lineItems.push(
          {
            currency: "inr",
            product_data: {
              name: "Estimated Shipping",
            },
            unit_amount: Math.round(Constant.ESTIMATED_SHIPPING * 100),
          },
          {
            currency: "inr",
            product_data: {
              name: "Estimated Tax",
            },
            unit_amount: Math.round(Constant.ESTIMATED_TAX * 100),
          },
        );
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card", "amazon_pay"],
          line_items: lineItems,
          mode: "payment",
          success_url: `${config.WEB_APP.URL}/${config.STRIPE.STRIPE_SUCCESS_URL}/{CHECKOUT_SESSION_ID}`,
          cancel_url: `${config.WEB_APP.URL}/${config.STRIPE.STRIPE_CANCEL_URL}/{CHECKOUT_SESSION_ID}`,

          metadata: {
            id: contextUser.id,
            user: contextUser.fullName,
            order: order.id,
          },
        });
        if (!session) throw contextError.client(USER_MSG.ORDER.CREATE.FAILED);
        order.checkoutSessionId = session.id;
        order = await OrderDao.findByIdAndUpdate(order.id, order);
        if (isQueryError(order))
          throw contextError.client(USER_MSG.ORDER.CREATE.FAILED);

        contextResponse.sendOk(
          {
            orderId: order.id,
            totalAmount: order.totalAmount,
            sessionId: session.id,
            checkoutUrl: session.url,
          },
          USER_MSG.PAYMENT.CREATE.SUCCESS,
        );
      }

      // await CartItemDao.deleteMany({ userId: contextUser.id });
      contextResponse.sendOk(order, USER_MSG.PAYMENT.CREATE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async list(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      const list = await OrderDao.find(
        { userId: contextUser.id },
        { include: { address: true }, orderBy: { createdAt: "desc" } },
      );
      contextResponse.sendOk(list, USER_MSG.ORDER.LIST.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
