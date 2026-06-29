import { ModelNames, prisma } from "./Base";
import BaseDao from "./BaseDao";

export default class OrderDao extends BaseDao {
  protected static modelName: ModelNames = "order";
  constructor() {
    super();
  }
}
