// DAOs
import { CartItemDao } from "@models/CartItemDao";

import { USER_MSG } from "@common/messages";
import { isQueryError, sanitize } from "@utils";
import { ProductDao } from "@models/ProductDao";
import Constant from "@config/Constant";

//--------------------------------------------------------------
export default class Main {
  static async create(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        productId: `required | exist: Product.id (${USER_MSG.CART_ITEM.CREATE.PRODUCT_NOT_FOUND})`,
        quantity: `required | number | min: 1 | normalize: number`,
        soldPrice: `required | number | normalize: number`,
      });

      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }

      const body = sanitizeResult.body;
      const product = sanitizeResult.records["productId"];
      // } sanitize data

      if (product.stock < body.quantity) {
        throw contextError.client(USER_MSG.CART_ITEM.CREATE.INSUFFICIENT_STOCK);
      }

      body.userId = contextUser.id;
      const cartItem = await CartItemDao.create(body);
      if (isQueryError(cartItem)) return contextError.client();
      contextResponse.sendOk(cartItem, USER_MSG.CART_ITEM.CREATE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async getCart(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      // cart with product
      const cart = await CartItemDao.find(
        { userId: contextUser.id },
        { include: { product: true } },
      );
      if (isQueryError(cart)) return contextError.client();

      const estimatedTax: number = Constant.ESTIMATED_TAX;
      const estimatedShipping: number = Constant.ESTIMATED_SHIPPING;
      const subTotal: number = cart.reduce(
        (acc: number, curr: any) => acc + curr.soldPrice * curr.quantity,
        0,
      );
      const total: number = subTotal + estimatedTax + estimatedShipping;

      contextResponse.sendOk(
        { records: cart, subTotal, estimatedTax, estimatedShipping, total },
        USER_MSG.CART_ITEM.GET_CART.SUCCESS,
      );
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async setQuantity(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        id: `required | exist: CartItem.id (${USER_MSG.CART_ITEM.SET_QUANTITY.CART_ITEM_NOT_FOUND})`,
        quantity: `required | number | min: 1 | normalize: number`,
      });

      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }

      const body = sanitizeResult.body;
      console.log("body: ", body);
      // } sanitize data
      let cartItem = sanitizeResult.records["id"];
      const product = await ProductDao.findById(cartItem.productId);
      console.log("product: ", product);
      if (product.stock < body.quantity) {
        throw contextError.client(USER_MSG.CART_ITEM.CREATE.INSUFFICIENT_STOCK);
      }

      cartItem = await CartItemDao.findByIdAndUpdate(body.id, body);
      if (isQueryError(cartItem)) return contextError.client();
      contextResponse.sendOk(cartItem, USER_MSG.CART_ITEM.SET_QUANTITY.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async delete(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        id: `required | exist: CartItem.id (${USER_MSG.CART_ITEM.SET_QUANTITY.CART_ITEM_NOT_FOUND})`,
      });

      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }

      const body = sanitizeResult.body;
      // } sanitize data

      const cartItem = await CartItemDao.findByIdAndDelete(body.id);
      if (isQueryError(cartItem))
        return contextError.client(USER_MSG.CART_ITEM.DELETE.FAILED);
      contextResponse.sendOk(cartItem, USER_MSG.CART_ITEM.DELETE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
