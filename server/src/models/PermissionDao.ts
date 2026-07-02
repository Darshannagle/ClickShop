import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export default class PermissionDao extends BaseDao {
  protected static modelName: ModelName = "Permission";
  constructor() {
    super();
  }
}
