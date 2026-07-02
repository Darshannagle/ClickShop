import stripe from "@config/Stripe";
import { CartItemDao } from "@models/CartItemDao";
import OrderDao from "@models/OrderDao";

//--------------------------------------------------------------
export default class Payment {
  static async handleSuccessfulPayment(data: any) {
    const sessionObject = data.session;
    if (!sessionObject) return;

    const orderId = sessionObject?.metadata?.order; // matches Main.ts's metadata key
    console.log("orderId: ", orderId);
    if (!orderId) return;

    let order = await OrderDao.findById(orderId);
    if (!order) return;

    order = await OrderDao.findByIdAndUpdate(orderId, {
      paymentStatus: "PAID",
      orderStatus: "CONFIRMED",
    });

    await CartItemDao.deleteMany({ userId: order.userId });
    return order;
  }
}
