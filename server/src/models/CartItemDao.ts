import { ModelName } from "./Base";
import BaseDao from "./BaseDao";

export class CartItemDao extends BaseDao {
  protected static modelName: ModelName = "CartItem";

  constructor() {
    super();
  }
}
