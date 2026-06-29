import { Response, NextFunction } from "express";

// Helpers
import { d, logState } from "@utils";

// Others
import { RESOURCE_CONFIG } from "@routes/config/Constant";

//--------------------------------------------------------------
const allowedResource = Object.values(RESOURCE_CONFIG).map((item) =>
  item.PREFIX.startsWith("/") ? item.PREFIX : `/${item.PREFIX}`,
);
allowedResource.push("/favicon.ico");
//--------------------------------------------------------------
export default async (req: any, res: Response, next: NextFunction) => {
  const { contextResponse, contextError, body, headers } = req;

  try {
    const requestUrl = req.url;
    const userAgent = req.headers["user-agent"];

    // missing user-agent (common bot behavior) {
    if (!userAgent) throw `Missing User-Agent`;
    // } missing user-agent (common bot behavior)

    // obvious bot agents {
    if (/bot|crawler|spider|curl|wget/i.test(userAgent))
      throw `Obvious bot agents`;
    // } obvious bot agents

    // if url contains . → block immediately {
    const allowed = allowedResource.some((prefix) =>
      requestUrl.startsWith(prefix),
    );
    if (!allowed && requestUrl.includes(".")) throw `Invalid Request Url`;
    // } if url contains . → block immediately

    next();
  } catch (e) {
    logState(`[ROUTE] 403 - Access denied: ${req.originalUrl}`);
    res.status(403).send("403 - Access denied");
  }
};
