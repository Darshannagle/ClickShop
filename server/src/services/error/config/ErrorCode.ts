//--------------------------------------------------------------
export default {
  OK: {
    CODE: "0000",
    CODE_KEY: "Ok",
    MESSAGE: "Success",
  },

  CLIENT: {
    CODE: "C000",
    CODE_KEY: "Client error",
    // MESSAGE: 'The client made an invalid or incorrect request.',
    MESSAGE: "Oops! Something went wrong. Please try again later.",
  },

  INTERNAL: {
    CODE: "I000",
    CODE_KEY: "Internal error",
    // MESSAGE: 'An unexpected server-side issue occurred.',
    MESSAGE: "Oops! Something went wrong. Please try again later.",
  },

  SERVICE: {
    CODE: "S000",
    CODE_KEY: "3rd Party Service Error",
    // MESSAGE: 'A failure occurred in a dependent external service.',
    MESSAGE: "Oops! Something went wrong. Please try again later.",
  },

  TOKEN: {
    CODE: "T000",
    CODE_KEY: "Token or sign error",
    // MESSAGE: 'Authentication or signature validation failed.',
    MESSAGE: "Oops! Something went wrong. Please try again later.",
  },

  ACCESS_TOKEN_EXPIRED: {
    CODE: "T001",
    CODE_KEY: "Access token expired",
    MESSAGE: "Session expired. Please refresh token.",
  },

  FORBIDDEN: {
    CODE: "F000",
    CODE_KEY: "Forbidden error",
    MESSAGE: "Permission denied!",
  },

  MAINTENANCE: {
    CODE: "M000",
    CODE_KEY: "Maintenance mode",
    MESSAGE: "System is currently under maintenance. Please try again later.",
  },
};
