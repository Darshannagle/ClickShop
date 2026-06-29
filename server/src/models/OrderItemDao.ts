import { ModelNames, prisma } from "./Base";
import BaseDao from "./BaseDao";

export default class OrderItemDao extends BaseDao {
  protected static modelName: ModelNames = "orderItem";
  constructor() {
    super();
  }
}
