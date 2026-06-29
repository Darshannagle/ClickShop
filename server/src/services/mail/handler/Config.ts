import nodemailer from "nodemailer";

// Helpers
import Media from "../../media";

// Others
import Config from "@config";
import Constant from "@config/Constant";

//--------------------------------------------------------------
export const transporter = nodemailer.createTransport({
  host: Config.MAIL.HOST,
  secure: false,
  port: Config.MAIL.SMTP_PORT,
  auth: {
    user: Config.MAIL.USER_NAME,
    pass: Config.MAIL.USER_PASSWORD,
  },
} as any);

export const viewName = `${Config.APP.ROOT_DIR}/views/email/master/layout.ejs`;

export const mailContext = {
  appName: Config.APP.NAME,
  appBrandName: Config.APP.BRAND_NAME,
  appBaseUrl: Config.APP.URL,
  supportEmail: Constant.APP.APP_SUPPORT.EMAIL,

  logoImg: Media.Email.get("logo.png"),
  footerLogoImg: Media.Email.get("logo-footer.png"),

  webApp: {
    url: Config.WEB_APP.URL,
  },

  socialMedia: {
    facebook: {
      url: "",
      icon: Media.Email.get("social-facebook-bg.png"),
    },
    instagram: {
      url: "",
      icon: Media.Email.get("social-instagram-bg.png"),
    },
    x: {
      url: "",
      icon: Media.Email.get("social-x-bg.png"),
    },
    linkedin: {
      url: "",
      icon: Media.Email.get("social-linkedin-bg.png"),
    },
  },

  images: {
    trading: Media.Email.get("trading.png"),
    rocket: Media.Email.get("rocket.png"),
  },
};
