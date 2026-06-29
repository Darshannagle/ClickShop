import ejs from "ejs";

// Helpers
import { d, empty, getError, logError, logInfo, logWarn } from "@utils";
import Media from "../../media";

// Others
import Config from "@config";
import { transporter, viewName, mailContext } from "./Config";

// Interfaces
import { IMailerRet } from "./interfaces";
import { IObj, IHelperError } from "@common/interface";

//--------------------------------------------------------------
export default async (
  template: string,
  payload: IObj,
): Promise<IMailerRet | IHelperError> => {
  const ERROR_KEY = "MAIL-MAILER";
  try {
    // Check Validation {
    if (Config.APP.MODE === "dev") {
      logWarn(
        `[${ERROR_KEY}] - fired bypass app mode is ${Config.APP.MODE} - ${payload.toEmail}`,
      );
      return { msg: `mail send bypass app mode is ${Config.APP.MODE}` };
    }

    if (empty(payload.toEmail)) {
      // logInfo(`[${ERROR_KEY}] - not fired to email not found - ${payload.toEmail}`);
      throw "mail not fired to email not found";
    }
    // } Check Validation

    // logInfo(`[${ERROR_KEY}] - fired - ${payload.toEmail} - ${template}`);

    // Bind Payload {
    payload.config = mailContext;
    payload.viewTemplate = template.replace(/\./g, "/");
    // } Bind Payload

    // Render Html file {
    const html: any = await ejs.renderFile(viewName, payload);
    if (empty(html)) throw "error in mail template";

    // Send mail with transporter {
    const receipt = await transporter.sendMail({
      to: payload.toEmail,
      from: Config.MAIL.FROM,
      subject: payload.subject,
      html,
    });
    if (empty(receipt)) throw "receipt not found";

    logInfo(
      `[${ERROR_KEY}] - receipt - ${payload.toEmail} - ${template} (${receipt?.response || ""})`,
    );
    // } Send mail with transporter

    // } Render Html file
    return { msg: "ok" };
  } catch (e) {
    d(e);
    return { error: getError(e), errorKey: ERROR_KEY };
  }
};
