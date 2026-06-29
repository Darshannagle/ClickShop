import Config from "./index";
//--------------------------------------------------------------

//--------------------------------------------------------------

export default {
  APP_SUPPORT: { EMAIL: process.env.APP_SUPPORT_EMAIL || "" },
  OTP: {
    LENGTH: 6, // otp digits length
    EXPIRE_TIME_IN_SECONDS: 180,
  },

  SESSION: {
    REFRESH_EXPIRE_TIME_IN_MINUTES: Config.APP.MODE === "prod" ? 1 : 9999999, // refresh token expire at this minutes
  },

  APP: {
    NAME_KEY: "CLICKSHOP",
    APP_SUPPORT: { EMAIL: process.env.APP_SUPPORT_EMAIL || "" },
  },

  PAGINATION_OPTIONS: {
    limit: 10, // if set limit 0 then return all records
    sort: { _id: -1 },
    page: 1,
    lean: true,
    totalPages: true,
  },

  DATE_FORMATS: {
    // date format used for response data formate
    DATETIME: "",
    DATE: "DD/MM/YYYY",
    TIME: "HH:mm",
  },

  STRIPE: {
    DEFAULT_CURRENCY: "USD",
    CURRENCY_CONFIG: {
      USD: { currency: "USD", multiplier: 100 },
    },
    // https://docs.stripe.com/api/events/types
    WEBHOOK_WHITELISTED_EVENTS: [
      "payment_intent.succeeded",
      "payment_intent.payment_failed",
      "payment_method.attached",
    ],
  },
  ESTIMATED_TAX: 50,
  ESTIMATED_SHIPPING: 150,
} as const;
//--------------------------------------------------------------
