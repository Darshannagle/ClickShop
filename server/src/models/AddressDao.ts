import { ModelName, ModelNames } from "./Base";
import BaseDao from "./BaseDao";

export class AddressDao extends BaseDao {
  protected static modelName: ModelName = "Address";
  constructor() {
    super();
  }
}
