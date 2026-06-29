// DAOs
import { USER_MSG } from "@common/messages";
import { CategoryDao } from "@models/CategoryDao";
import { sanitize } from "@utils";

//--------------------------------------------------------------
export default class Main {
  static async create(req: any) {
    const { contextResponse, contextError } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        name: `required | shorttext | unique: Category.name (${USER_MSG.CATEGORY.CREATE.ALREADY_EXIST})`,
      });
      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }
      const body = sanitizeResult.body;
      // } sanitize data

      const category = await CategoryDao.create(body);
      contextResponse.sendOk(category, USER_MSG.CATEGORY.CREATE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async list(req: any) {
    const { contextResponse, contextError } = req;
    try {
      const list = await CategoryDao.find({});
      contextResponse.sendOk(list, USER_MSG.CATEGORY.LIST.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
