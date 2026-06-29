// Helpers
import Base from "./Base";

// Others
// import Config from '@config';
import { ROUTE_PREFIX, VIEW_CONFIG } from "@routes/config/Constant";

//--------------------------------------------------------------
export default class Organization extends Base {
  constructor(req: any, res: any) {
    const routePrefix = ROUTE_PREFIX.ADMIN;
    const viewPrefix = VIEW_CONFIG.ADMIN.VIEW_PREFIX;
    const assetsPrefix = VIEW_CONFIG.ADMIN.ASSETS_PREFIX;

    const config = {
      // Extra data
    };

    super({ req, res, routePrefix, viewPrefix, assetsPrefix, config });
  }
}
