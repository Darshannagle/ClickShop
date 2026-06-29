import express, { Request, Response, NextFunction } from "express";

// Helpers
import { d, logSuccess, logError, empty, logInfo } from "@utils";

// Others
import { ROUTE_PREFIX } from "@routes/config/Constant";

//--------------------------------------------------------------
const SKIP_BODY_PARSE_ROUTES = [
  `/${ROUTE_PREFIX.API}/webhook/stripe`,
  `/${ROUTE_PREFIX.API}/webhook/stripe/thin-payload`,
];

//--------------------------------------------------------------
export default (req: any, res: Response, next: NextFunction) => {
  const ERROR_KEY = "[MIDDLEWARE-BODY-PARSER] -";

  if (SKIP_BODY_PARSE_ROUTES.includes(req.path)) {
    logInfo(`${ERROR_KEY} preserved raw body for this route: ${req.path}`);
    express.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json({ limit: "50mb" })(req, res, next);
  }
};
