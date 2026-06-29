import { ModelNames } from "./Base";
import BaseDao from "./BaseDao";

export class CategoryDao extends BaseDao {
  protected static modelName: ModelNames = "category";
  constructor() {
    super();
  }
}
