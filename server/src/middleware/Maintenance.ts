import { Request, Response, NextFunction } from "express";

// Helpers
import {
  d,
  logSuccess,
  logError,
  empty,
  formatDuration,
  logInfo,
} from "@utils";
// import redis from "@infrastructure/redis";

// Others
import { ROUTE_PREFIX } from "@routes/config/Constant";

//--------------------------------------------------------------
const maintenanceTiming: any = {
  app: {
    startAt: null,
  },
  admin: {
    startAt: null,
  },
  interval: null,
};
//--------------------------------------------------------------
export default async (req: any, res: Response, next: NextFunction) => {
  const { contextResponse, contextError } = req;
  const ERROR_KEY = "[MAINTENANCE] -";

  try {
    let maintenanceResult: any = {};
    let type = null;
    if (req.url.startsWith(`/${ROUTE_PREFIX.API}/`)) {
      //   maintenanceResult = await redis.Maintenance.appGet();
      type = "app";
    } else if (req.url.startsWith(`/${ROUTE_PREFIX.ADMIN}/`)) {
      //   maintenanceResult = await redis.Maintenance.adminGet();
      type = "admin";
    } else {
      return next();
    }

    // set date {
    if (maintenanceResult.status !== "OFF") {
      if (!maintenanceTiming[type].startAt)
        maintenanceTiming[type].startAt = new Date();
    } else {
      maintenanceTiming[type].startAt = null;
    }
    // } set date

    // start interval {
    if (maintenanceTiming.app.startAt || maintenanceTiming.admin.startAt) {
      if (!maintenanceTiming.interval) {
        maintenanceTiming.interval = setInterval(() => {
          if (
            !maintenanceTiming.app.startAt &&
            !maintenanceTiming.admin.startAt
          ) {
            clearInterval(maintenanceTiming.interval!);
            maintenanceTiming.interval = null;
            return;
          }

          let message = [];
          if (maintenanceTiming.app.startAt)
            message.push(
              `App: ${formatDuration(maintenanceTiming.app.startAt)}`,
            );
          if (maintenanceTiming.admin.startAt)
            message.push(
              `Admin: ${formatDuration(maintenanceTiming.admin.startAt)}`,
            );

          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.write(`${ERROR_KEY} ${message.join(" | ")}`);
          // logInfo(`${ERROR_KEY} ${message.join(' | ')}`);
        }, 1000);
      }
    }
    // } start interval

    if (maintenanceResult.status !== "OFF") throw contextError.maintenance();

    next();
  } catch (e) {
    contextResponse.sendError(e);
  }
};
