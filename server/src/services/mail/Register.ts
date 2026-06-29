// Helpers
import { d, empty, getError, logError, logInfo } from "@utils";

// Others
import Config from "@config";
import Constant from "@config/Constant";
import mailer from "./handler/Mailer";

// Interfaces
import { ISend, ISendRet } from "./handler/interfaces";
import { IHelperError } from "@common/interface";

//--------------------------------------------------------------
export default class Register {
  static async welcome(payload: ISend): Promise<ISendRet | IHelperError> {
    const ERROR_KEY = "MAIL-SEND-REGISTER-WELCOME";
    try {
      payload.subject = `Welcome to ${Config.APP.NAME}! Let's Get Started 🚀`;

      // add common data {
      //   payload.dashboardUrl = Constant.APP.DASHBOARD_URL;
      // } add common data

      const receipt: any = await mailer("register.welcome", payload);
      if (receipt?.error) throw receipt.error;

      return { msg: "ok" };
    } catch (e) {
      return { error: getError(e), errorKey: ERROR_KEY };
    }
  }
}
