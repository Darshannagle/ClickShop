// DAOs
import { USER_MSG } from "@common/messages";
import stripe from "@config/Stripe";
import Payment from "@services/stripe/Payment";
import { isQueryError, logError, logInfo, sanitize } from "@utils";

//--------------------------------------------------------------
export default class Main {
  // static async confirmPayment(req: any) {
  //   const { contextResponse, contextError } = req;
  //   try {
  //     // sanitize data {
  //     const sanitizeResult = await sanitize(req.body, {
  //       sessionId: `required | longtext`,
  //     });
  //     if (sanitizeResult?.error || !sanitizeResult?.body) {
  //       throw contextError.client(sanitizeResult);
  //     }
  //     const body = sanitizeResult.body;
  //     // } sanitize data
  //     const session = await stripe.checkout.sessions.retrieve(body.sessionId);
  //     if (isQueryError(session))
  //       return contextError.client(USER_MSG.PAYMENT.CREATE.FAILED);
  //     if (isQueryError(payment))
  //       return contextError.client(USER_MSG.PAYMENT.CREATE.FAILED);
  //     contextResponse.sendOk({}, USER_MSG.PAYMENT.CREATE.SUCCESS);
  //   } catch (e) {
  //     contextResponse.sendError(e);
  //   }
  // }

  static async webhookHandler(req: any, res: any) {
    const { contextResponse, contextError } = req;
    try {
      const signature = req.headers["stripe-signature"];
      const endpointSecret: string = process.env.STRIPE_WEBHOOK_SECRET || "";
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req?.body,
          signature,
          endpointSecret,
        );
      } catch (error) {
        logError(error, "[STRIPE-WEBHOOK-ERROR]");
        return contextResponse.sendError(error);
      }
      logInfo(`[STRIPE-WEBHOOK] EVENT : ${event.type}`);
      try {
        switch (event.type) {
          case "checkout.session.completed":
            const session = event.data.object;
            if (session.payment_status === "paid") {
              const order = await Payment.handleSuccessfulPayment({ session });
            }
            break;
          case "checkout.session.async_payment_succeeded":
            const asyncSession = event.data.object;

            const order = await Payment.handleSuccessfulPayment({
              session: asyncSession,
            });

            break;

          default:
            logError(`[STRIPE-WEBHOOK] - Unhandled event type: ${event.type}`);
            break;
        }
      } catch (error) {
        logError(error, "[STRIPE-WEBHOOK-ERROR]");
        return contextResponse.sendError(error);
      }
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
