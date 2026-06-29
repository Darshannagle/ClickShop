import { Request, Response, NextFunction } from "express";

// Helpers
import { d, logInfo, logError, empty, formatDate } from "@utils";

// Others
import Config from "@config";
import { RESOURCE_CONFIG } from "@routes/config/Constant";

//--------------------------------------------------------------
// Middleware to enable CORS by setting Access-Control-Allow-Origin headers common for all request
export default (req: any, res: Response, next: NextFunction) => {
  const origin: any = req.ip;

  // new request log {
  const ignoredPaths = [
    `/log/`,
    `/favicon.ico`,
    `/${RESOURCE_CONFIG.STORAGE.PREFIX}/`,
    `/${RESOURCE_CONFIG.STATIC_ASSETS.PREFIX}/`,
  ];
  if (!ignoredPaths.some((path) => req.originalUrl.startsWith(path)))
    logInfo(
      `[REQUEST:${req?.contextError?.traceKey || "XXXX"}:${formatDate(new Date(), "YYYYMMDDHHmmssSSS")}] - ` +
        req.originalUrl,
    );
  // } new request log

  // check cors {
  if (!req.originalUrl.includes("/resource/")) {
    if (
      !empty(Config.CORS.ALLOW_ORIGIN) &&
      !Config.CORS.ALLOW_ORIGIN.includes(origin)
    ) {
      logError(
        `[CORS] - allow origin only: ${Config.CORS.ALLOW_ORIGIN.join(" | ")}`,
      );
      return res.status(403).send("Forbidden - IP is not allowed");
    }

    /*res.header('Access-Control-Allow-Origin', origin);*/
  }
  // } check cors
  next();
};
