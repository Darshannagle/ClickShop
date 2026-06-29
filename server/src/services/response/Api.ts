// Helpers
import Base from "./Base";

// Others
// import Config from '@config';
import { ROUTE_PREFIX, VIEW_CONFIG } from "@routes/config/Constant";

//--------------------------------------------------------------
export default class Api extends Base {
  constructor(req: any, res: any) {
    const routePrefix = ROUTE_PREFIX.API;
    const viewPrefix = VIEW_CONFIG.API.VIEW_PREFIX;
    const assetsPrefix = VIEW_CONFIG.API.ASSETS_PREFIX;

    const config = {
      // Extra data
    };

    super({ req, res, routePrefix, viewPrefix, assetsPrefix, config });
  }
}
