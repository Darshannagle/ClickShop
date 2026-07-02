import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export class CategoryDao extends BaseDao {
  protected static modelName: ModelName = "Category";
  constructor() {
    super();
  }
}
