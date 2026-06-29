import stripe from "@config/Stripe";
import { CartItemDao } from "@models/CartItemDao";
import OrderDao from "@models/OrderDao";

//--------------------------------------------------------------
export default class Payment {
  static async handleSuccessfulPayment(data: any) {
    const sessionId = data.sessionId;
    if (!sessionId) return;
    const sessionObject = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "metadata"],
    });

    const orderId = sessionObject?.metadata?.orderId;
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
