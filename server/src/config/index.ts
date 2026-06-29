require("dotenv").config();
import path from "path";

//--------------------------------------------------------------

const ROOT_DIR = path.join(process.cwd(), "src");
const IS_PROD_ENV = process.env.APP_MODE === "prod"; // dev, stage, prod

//--------------------------------------------------------------
const config = {
  SERVER_PORT: process.env.APP_SERVER_PORT,

  BASE_ROOT_DIR: process.cwd(),

  APP: {
    BRAND_NAME: "DAN",
    NAME: "ClickShop",
    ROOT_DIR,
    MODE: process.env.APP_MODE || "", // dev, stage, prod
    URL: process.env.APP_BASE_URL || "",
    ADMIN_PASSWORD: process.env.APP_ADMIN_PASSWORD || "",
    MASTER_PASSWORD: process.env.APP_MASTER_PASSWORD || "",
    MASTER_OTP: process.env.APP_MASTER_OTP || "",
  },
  WEB_APP: {
    URL: process.env.CLIENT_URL,
  },

  WEB_APP_ORGANIZATION: {
    URL: ``,
  },

  STORAGE: {
    IS_LOCAL: false,
    LOCAL_FOLDER: "storage",
    MAX_FILE_SIZE_MB: 50,
  },

  EXPRESS_SESSION: {
    secret: process.env.EXPRESS_SESSION_SECRET || "", // 100
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
  },

  MAIL: {
    SMTP_PORT: 587,
    ENCRYPTION: "tls",
    USER_NAME: process.env.MAIL_USER_NAME,
    USER_PASSWORD: process.env.MAIL_USER_PASSWORD,
    HOST: process.env.MAIL_HOST,
    FROM: process.env.MAIL_FROM,
    DEV_EMAIL_FORWARDED: (process.env.DEV_EMAIL_FORWARDED || "").split(","), // all other emails forward on 0 index email
  },

  ADMIN: {
    PASSWORD: process.env.ADMIN_PASSWORD || "",
    AUTH_TOKEN: process.env.ADMIN_AUTH_TOKEN || null,
  },

  CORS: {
    ALLOW_ORIGIN: process.env.ALLOW_ORIGIN
      ? process.env.ALLOW_ORIGIN.split(",")
      : [],
    IP_FIREWALL_ALLOW: process.env.IP_FIREWALL_ALLOW
      ? process.env.IP_FIREWALL_ALLOW.split(",")
      : [],
  },

  DATABASE: {
    URL: process.env.DATABASE_URL,
  },

  JWT: {
    SECRET_KEY: process.env.JWT_SECRET_KEY || "", // 100
    EXPIRES_IN: "30d",
  },

  STRIPE: {
    ACCESS_KEY: process.env.DEV_STRIPE_PUBLISHABLE_KEY || "",
    SECRET_KEY: process.env.DEV_STRIPE_SECRET_KEY || "",
    mainAccountKey: "",
    STRIPE_SUCCESS_URL: process.env.STRIPE_SUCCESS_URL,
    STRIPE_CANCEL_URL: process.env.STRIPE_CANCEL_URL,
  },
};

export default config;
