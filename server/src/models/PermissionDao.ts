import BaseDao from "./BaseDao";

export default class PermissionDao extends BaseDao {
  protected static modelName = "Permission";
  constructor() {
    super();
  }
}
