import { ModelNames } from "./Base";
import BaseDao from "./BaseDao";

export class CartItemDao extends BaseDao {
  protected static modelName: ModelNames = "cartItem";

  constructor() {
    super();
  }
}
