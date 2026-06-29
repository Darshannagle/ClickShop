import { ModelNames } from "./Base";
import BaseDao from "./BaseDao";

export class AddressDao extends BaseDao {
  protected static modelName: ModelNames = "address";
  constructor() {
    super();
  }
}
