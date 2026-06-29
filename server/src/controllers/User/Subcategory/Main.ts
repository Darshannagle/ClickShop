// DAOs
import { USER_MSG } from "@common/messages";
import { SubcategoryDao } from "@models/SubcategoryDao";
import { sanitize } from "@utils";

//--------------------------------------------------------------
export default class Main {
  static async create(req: any) {
    const { contextResponse, contextError } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        categoryId: `required | exist: Category.id (${USER_MSG.SUBCATEGORY.CREATE.CATEGORY_NOT_FOUND})`,
        name: `required | shorttext | unique: Category.name (${USER_MSG.SUBCATEGORY.CREATE.ALREADY_EXIST})`,
      });
      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }
      const body = sanitizeResult.body;
      // } sanitize data

      const category = await SubcategoryDao.create(body);
      contextResponse.sendOk(category, USER_MSG.CATEGORY.CREATE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async list(req: any) {
    const { contextResponse, contextError } = req;
    try {
      const list = await SubcategoryDao.find({});
      console.log("list : ", list);
      contextResponse.sendOk(list, USER_MSG.CATEGORY.LIST.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
