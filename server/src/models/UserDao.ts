import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export class UserDao extends BaseDao {
  protected static modelName: ModelName = "User";
  constructor() {
    super();
  }
}
