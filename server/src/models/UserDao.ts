import { ModelNames } from "./Base";
import BaseDao from "./BaseDao";

export class UserDao extends BaseDao {
  protected static modelName: ModelNames = "user";
  constructor() {
    super();
  }
}
