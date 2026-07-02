import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export default class OrderItemDao extends BaseDao {
  protected static modelName: ModelName = "OrderItem";
  constructor() {
    super();
  }
}
