import { Request, Response, NextFunction } from "express";

// Helpers
import { d, logSuccess, logError, empty } from "@utils";
import ResponseHandler from "@services/response";
import Error from "@services/error";

// Others
import { ROUTE_PREFIX } from "@routes/config/Constant";

//--------------------------------------------------------------
export default (req: any, res: Response, next: NextFunction) => {
  const ERROR_KEY = "[MIDDLEWARE-CONTEXT] -";

  req.contextError = new Error();

  if (req.url.startsWith(`/${ROUTE_PREFIX.API}/`)) {
    req.contextResponse = new ResponseHandler.Api(req, res);
  } else if (req.url.startsWith(`/${ROUTE_PREFIX.ADMIN}/`)) {
    req.contextResponse = new ResponseHandler.Admin(req, res);
  }
  //    else if (req.url.startsWith(`/${ROUTE_PREFIX.DEV}/`)) {
  //     req.contextResponse = new ResponseHandler.Dev(req, res);
  //   }
  /* else {
        logError(`${ERROR_KEY} Invalid route prefix. Cannot determine response context. (${req.url})`);
        return res.status(400).send(`Invalid route prefix. Cannot determine response context.`);
    }*/

  next();
};
