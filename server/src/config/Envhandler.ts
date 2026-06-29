// Helpers
import { d, logSuccess, logError, empty } from "@utils";

// Others
// import Config from './';

//--------------------------------------------------------------
export default (): void => {
  let isError = false;

  const REQUIRED_ENV_VARIABLES = [
    "TZ",
    "APP_MODE",

    "APP_SERVER_PORT",
    "APP_BASE_URL",

    "DATABASE_URL",

    "ADMIN_PASSWORD",
    "APP_MASTER_PASSWORD",
    "APP_MASTER_OTP",

    "EXPRESS_SESSION_SECRET",
    "JWT_SECRET_KEY",

    // "MAIL_USER_NAME",
    // "MAIL_USER_PASSWORD",
    // "MAIL_HOST",
    // "MAIL_FROM",

    "STRIPE_PUBLIC_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_SUCCESS_URL",
    "STRIPE_CANCEL_URL",
  ];

  REQUIRED_ENV_VARIABLES.forEach((k) => {
    if (empty(process.env[k])) {
      isError = true;
      logError(`[ENV] - variables not defined: ${k}`);
    }
  });
  if (isError) process.exit(1);
  logSuccess(`[ENV] - variables satisfied`);
};
