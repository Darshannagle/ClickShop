import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export default class OrderDao extends BaseDao {
  protected static modelName: ModelName = "Order";
  constructor() {
    super();
  }
}
