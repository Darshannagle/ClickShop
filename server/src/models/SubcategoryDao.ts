import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export class SubcategoryDao extends BaseDao {
  protected static modelName: ModelName = "Subcategory";
  constructor() {
    super();
  }
}
