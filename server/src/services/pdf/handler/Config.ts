// Helpers
import Media from "../../media";

// Others
import Config from "@config";
import Constant from "@config/Constant";

//--------------------------------------------------------------
export const defaultPageSetup = {
  format: "A4",
  printBackground: true,
  margin: { top: "40px", bottom: "40px" },
};

export const pdfContext = {
  appName: Config.APP.NAME,
  appBaseUrl: Config.APP.URL,
  supportEmail: Constant.APP_SUPPORT.EMAIL,

  logoImg: Media.Email.get("logo.png"),

  appBrandName: Config.APP.BRAND_NAME,
  accountApp: {
    name: Config.ACCOUNT_APP.NAME,
  },
};
