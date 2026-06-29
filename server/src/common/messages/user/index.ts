//--------------------------------------------------------------
export const COMMON = {
  DATA: {
    FOUND: `Data Found`,
    NOT_FOUND: `Data not found`,
    NOT_UPDATE: `Data not updated`,
    RESOURCE_SCOPE_INVALID: `The requested resource does not exist under your scope.`,
  },
};

export const MIDDLEWARE_APP_AUTH = {
  TOKEN: {
    NOT_FOUND: `Token not found`,
    INVALID: `Invalid Token`,
    INVALID_PAYLOAD: `Invalid token payload`,
  },

  SESSION: {
    // NOT_FOUND: `Session not found`,
    INVALID: `Invalid Session`,
    INVALID_PAYLOAD: `Invalid session payload`,
  },

  AUTH: {
    USER_NOT_FOUND: `User not found!`,
    UNVERIFIED_EMAIL: `Your email address is not verified. Please verify your email to proceed.`,
    BLOCKED: `Your account does not have permission to access this feature. Please contact support for further assistance.`,
    EMAIL_ALREADY_EXIST: `Email already exist`,
    PASSWORD_NOT_MATCH: `Password does not match`,
    INVALID_CREDENTIALS: `Invalid credentials`,

    SIGNUP: {
      SUCCESS: `Signup successfully`,
      INVALID_PAYLOAD: `Invalid signup payload`,
    },

    GET_PROFILE: {
      SUCCESS: `Profile fetched`,
      FAILED: `Failed to fetch profile`,
    },
  },

  ORGANIZATION_PROFILE: {
    NOT_FOUND: `Organization profile not found`,
    INVALID: `Invalid Token`,
    INVALID_TOKEN: `Invalid organization profile token`,
    UNAUTHORIZED_ACCESS: `You are not authorized to access this organization`,
  },
};

export const CATEGORY = {
  CREATE: {
    SUCCESS: `Category created`,
    INVALID_PAYLOAD: `Invalid category payload`,
    ALREADY_EXIST: `Category already exist`,
  },
  LIST: {
    SUCCESS: `Categories fetched`,
    INVALID_PAYLOAD: `Invalid category payload`,
  },
};

export const SUBCATEGORY = {
  CREATE: {
    SUCCESS: `Subcategory created`,
    CATEGORY_NOT_FOUND: `Category not found`,
    ALREADY_EXIST: `Subcategory already exist`,
  },
  LIST: {
    SUCCESS: `Subcategories fetched`,
    INVALID_PAYLOAD: `Invalid subcategory payload`,
  },
};

export const PRODUCT = {
  CREATE: {
    SUCCESS: `Product created`,
    INVALID_PAYLOAD: `Invalid product payload`,
    ALREADY_EXIST: `Product already exist`,
    CATEGORY_NOT_FOUND: `Category not found`,
    SUBCATEGORY_NOT_FOUND: `Subcategory not found`,
  },
  LIST: {
    SUCCESS: `Products fetched`,
    INVALID_PAYLOAD: `Invalid product payload`,
  },
  DETAILS: {
    PRODUCT_NOT_FOUND: `Product not found`,
  },
};
export const CART_ITEM = {
  CREATE: {
    SUCCESS: `Item added to cart`,
    INSUFFICIENT_STOCK: `Insufficient stock`,
    PRODUCT_NOT_FOUND: `Product not found`,
  },
  GET_CART: {
    SUCCESS: `Cart fetched`,
  },
  SET_QUANTITY: {
    SUCCESS: `Item quantity updated in cart`,
    FAIL: `Failed to update item quantity in cart`,
    CART_ITEM_NOT_FOUND: `Cart item not found`,
  },
  DELETE: {
    SUCCESS: `Item deleted from cart`,
    CART_ITEM_NOT_FOUND: `Cart item not found`,
    FAILED: `Failed to delete item from cart`,
  },
};

export const PAYMENT = {
  CREATE: {
    SUCCESS: `Payment created successfully`,
    INVALID_PAYLOAD: `Invalid payment payload`,
    ALREADY_EXIST: `Payment already exist`,
    FAILED: `Failed to create payment`,
  },
  LIST: {
    SUCCESS: `Payment fetched successfully`,
    INVALID_PAYLOAD: `Invalid payment payload`,
  },
  CONFIRM: {
    SUCCESS: `Payment confirmed`,
    INVALID_PAYLOAD: `Invalid payment payload`,
    FAILED: `Failed to confirm payment`,
  },
  CANCEL: {
    SUCCESS: `Payment cancelled`,
    INVALID_PAYLOAD: `Invalid payment payload`,
    FAILED: `Failed to cancel payment`,
  },
};

export const ORDER = {
  CREATE: {
    SUCCESS: `Order place successfully`,
    INVALID_PAYLOAD: `Invalid order payload`,
    ALREADY_EXIST: `Order already exist`,
    ADDRESS_NOT_FOUND: `Address not found`,
    FAILED: `Failed to place order`,
  },
  LIST: {
    SUCCESS: `Order fetched successfully`,
    INVALID_PAYLOAD: `Invalid order payload`,
  },
};

export const ADDRESS = {
  CREATE: {
    SUCCESS: `Address created successfully`,
    INVALID_PAYLOAD: `Invalid address payload`,
    ALREADY_EXIST: `Address already exist`,
    FAILED: `Failed to create address`,
  },
  LIST: {
    SUCCESS: `Address fetched successfully`,
    INVALID_PAYLOAD: `Invalid address payload`,
  },
  DELETE: {
    SUCCESS: `Address deleted successfully`,
    ADDRESS_NOT_FOUND: `Address not found`,
    FAILED: `Failed to delete address`,
  },
};
