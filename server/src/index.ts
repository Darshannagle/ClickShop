require("dotenv").config();
import { Server } from "http";
//--------------------------------------------------------------
// Helpers
import { d, logSuccess, logError, logWarn, formatDate, logInfo } from "@utils";
// import App from "./app";
import EnvHandler from "@config/Envhandler";
import DatabaseHandler from "@config/DatabaseHandler";
import InitializationProcess from "@config/Init";

// Others
import Config from "@config";
const versionInfo = require("../version.json");
import App from "./app";
import BaseDao from "@models/BaseDao";
import prisma from "./prisma";
import { PaymentMethod, PrismaClient } from "@prisma/client";
//--------------------------------------------------------------
if (Config.APP.MODE === "dev") console.clear();
let server: Server | null = null;
//--------------------------------------------------------------

//--------------------------------------------------------------
logInfo(`...............................................`);
logInfo(
  `\n\n\n\n\n\n\n\n\n\n______________________________________________________________\n`,
);
logInfo(versionInfo.asciiBranding);
logInfo(`\n..............................................................`);
logWarn(
  `[APP-RESTART] - app restarted at: ${formatDate(new Date(), "YYYY-MM-DDTHH:mm:ss.SSS")} UTC`,
);
logInfo(`[DEPLOY] - ${versionInfo.note}`);
logInfo(
  `[APP-MODE] - ${{ prod: "production", dev: "development" }[Config.APP.MODE || ""] || "UNKNOWN"}`,
);
//--------------------------------------------------------------
BaseDao.init(prisma);
//--------------------------------------------------------------
// Check env {
EnvHandler();
// } Check env
//--------------------------------------------------------------

DatabaseHandler.connect(async (): Promise<void> => {
  server?.close(); // Server connection close before new server connection start

  // Server Connect {
  try {
    server = App.listen(Config.SERVER_PORT, async (): Promise<any> => {
      // initialization process {
      //   await InitializationProcess();
      // } initialization process

      logSuccess(`[SERVER] - server listen on ${Config.SERVER_PORT}`);
      logSuccess(`[APP] - app is run on ${Config.APP.URL}`);
      /*logSuccess(`[CORS] - allow origin (${Config.CORS.ALLOW_ORIGIN.length ? Config.CORS.ALLOW_ORIGIN.join(', ') : '*'})`);*/
      logSuccess(
        `[HEALTHCHECK] - check app health on ${Config.APP.URL}/healthcheck`,
      );

      logSuccess(
        `[LOG] - check app last 100 log on ${Config.APP.URL}/log/debug`,
      );
      logSuccess(`[APP] - app is live now...`);
      logInfo(`...............................................`);
    });
  } catch (e) {
    logError(`[SERVER] - server error occurred: ${e || ""}`);
  }
  // } Server Connect
});
