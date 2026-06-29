import { ModelNames, prisma } from "./Base";
import BaseDao from "./BaseDao";

export default class RoleDao extends BaseDao {
  protected static modelName: ModelNames = "role";
  constructor() {
    super();
  }
}
