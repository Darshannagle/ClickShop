import { ModelNames } from "./Base";
import BaseDao from "./BaseDao";

export class SubcategoryDao extends BaseDao {
  protected static modelName: ModelNames = "subcategory";
  constructor() {
    super();
  }
}
