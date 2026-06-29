// DAOs
import { USER_MSG } from "@common/messages";
import { sanitize } from "@utils";

//--------------------------------------------------------------
export default class Main {
  static async create(req: any) {
    const { contextResponse, contextError } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {});
      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }
      const body = sanitizeResult.body;
      // } sanitize data

      const payment = await PaymentDao.create(body);
      contextResponse.sendOk(payment, USER_MSG.PAYMENT.CREATE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
