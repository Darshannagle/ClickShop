// Helpers
import { d, empty, getError, logError, logInfo } from "@utils";

// Others
import Config from "@config";
import mailer from "./handler/Mailer";

// Interfaces
import { ISend, ISendRet } from "./handler/interfaces";
// import {IHelperError} from '@error/interfaces';

//--------------------------------------------------------------
export default class Auth {
  static async otp(payload: ISend): Promise<ISendRet | any> {
    const ERROR_KEY = "MAIL-SEND-OTP";
    try {
      payload.subject = `[${Config.APP.NAME}] - Your verification OTP code`;
      const receipt: any = await mailer("auth.otp", payload);
      logInfo(`[OTP] otp mail send: ${payload.toEmail} - ${payload.otp}`);

      if (receipt?.error) throw receipt.error;

      return { msg: "ok" };
    } catch (e) {
      return { error: getError(e), errorKey: ERROR_KEY };
    }
  }
}
