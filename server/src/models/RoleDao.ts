import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export default class RoleDao extends BaseDao {
  protected static modelName: ModelName = "Role";
  constructor() {
    super();
  }
}
