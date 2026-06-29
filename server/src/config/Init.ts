// Helpers
import { d, logSuccess, logWarn, logError, newULID, logTrace } from "@utils";
import MediaHandler from "@services/media/handler";
// import CronJobs from "@cron";
// import Infrastructure from "@infrastructure";
// import Mail from '@services/mail';

// Others
import Constant from "@config/Constant";
import Core from "@core";

//--------------------------------------------------------------

//--------------------------------------------------------------
export default async (): Promise<void> => {
  logSuccess(`[INIT] - initialization process started...`);

  // check auth method {
  //   if (!Constant.APP.AUTH_METHOD_ALLOW.includes(Constant.APP.AUTH_METHOD)) {
  //     logError(
  //       `[INIT] - Authentication method not supported. Current method is ${Constant.APP.AUTH_METHOD}. Allowed methods: ${Constant.APP.AUTH_METHOD_ALLOW}.`,
  //     );
  //     process.exit(1);
  //   }
  // } check auth method
};
