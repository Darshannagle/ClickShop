// DAOs
import { USER_MSG } from "@common/messages";
import { ProductDao } from "@models/ProductDao";
import { isQueryError, sanitize } from "@utils";

//--------------------------------------------------------------
export default class Main {
  static async create(req: any) {
    const { contextResponse, contextError } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        name: `required | text | unique: Product.name (${USER_MSG.PRODUCT.CREATE.ALREADY_EXIST})`,
        categoryId: `required | exist: Category.id (${USER_MSG.PRODUCT.CREATE.CATEGORY_NOT_FOUND})`,
        subcategoryId: `required | exist: Subcategory.id (${USER_MSG.PRODUCT.CREATE.SUBCATEGORY_NOT_FOUND})`,
        brand: `required | text`,
        description: `longtext`,
        basePrice: `required | number | normalize: number`,
        salePrice: `required | number | normalize: number`,
        stock: `required | number | normalize: number`,
        images: `array | max: 10`,
      });
      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }
      const body = sanitizeResult.body;
      // } sanitize data

      const product = await ProductDao.create(body);
      if (isQueryError(product)) return contextError.client();
      contextResponse.sendOk(product, USER_MSG.PRODUCT.CREATE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async list(req: any) {
    const { contextResponse, contextError } = req;
    try {
      // sanitize data {
      let sanitizeResult = await sanitize(req.body, {
        filters: `object`,
        page: `number`,
        limit: `number`,
      });

      if (sanitizeResult.error || !sanitizeResult.body)
        throw contextError.client(sanitizeResult);
      const body = sanitizeResult.body;

      sanitizeResult = await sanitize(body?.filters || {}, {
        search: `text`,
        categoryId: `string`,
        subcategoryId: `string`,
        minPrice: "",
        maxPrice: "",
        brand: "",
        sortBy: `string`,
        sortOrder: `string`,
      });

      if (sanitizeResult.error || !sanitizeResult.body)
        throw contextError.client(sanitizeResult);
      const rawFilters = sanitizeResult.body || {};
      const page = body.page || 1;
      const limit = body.limit || 10;
      // } sanitize data

      const list = await ProductDao.findWithFilter(rawFilters, page, limit);
      contextResponse.sendOk(list, USER_MSG.PRODUCT.LIST.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async details(req: any) {
    const { contextResponse, contextError } = req;
    try {
      // sanitize data {
      let sanitizeResult = await sanitize(req.query, {
        id: `rquired | exist: Product.id (${USER_MSG.PRODUCT.DETAILS.PRODUCT_NOT_FOUND})`,
      });

      if (sanitizeResult.error || !sanitizeResult.body)
        throw contextError.client(sanitizeResult);
      const body = sanitizeResult.body;
      // } sanitize data

      const product = sanitizeResult.records["id"];
      if (!product)
        throw contextError.client(USER_MSG.PRODUCT.DETAILS.PRODUCT_NOT_FOUND);

      contextResponse.sendOk(product, USER_MSG.PRODUCT.LIST.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async brandList(req: any) {
    const { contextResponse, contextError } = req;
    try {
      const list = await ProductDao.brandList();
      contextResponse.sendOk(list, USER_MSG.PRODUCT.LIST.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
