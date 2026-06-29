// Helpers
import { d, empty, extractErrorLog, getError } from "@utils";
import Token from "@services/token";

// Others
import ErrorCode from "./config/ErrorCode";

// Interfaces
import { IErrorRet, IHelperError, TErrorType } from "./interface";

//--------------------------------------------------------------
export default class Error {
  traceKey: string;

  constructor() {
    this.traceKey = Token.Random.randomCode(4);
  }

  #storeError(payload: IErrorRet) {
    d(payload, "#storeError");
  }

  #formatError(error: IHelperError | null, key: TErrorType): IErrorRet {
    const errorCodeDetail = ErrorCode[key];
    const log = extractErrorLog(error?.error);
    const data: any = {
      traceKey: this.traceKey,
      code: errorCodeDetail.CODE,
      codeKey: errorCodeDetail.CODE_KEY,
      message: error?.errorKey
        ? getError(error) || errorCodeDetail.MESSAGE
        : `${errorCodeDetail.CODE}-${this.traceKey}: ${errorCodeDetail.MESSAGE}`,
      error: getError(error),
      errors: error?.errors || {},
      log,
    };

    if (empty(data.log) && !empty(getError(error))) {
      data.log = {
        error: getError(error),
        executionTrace: [],
        details: "",
      };
    }

    // store unknown errors {
    if (!error?.errorKey) this.#storeError(data);
    // } store unknown errors

    return data;
  }

  client(error: IHelperError | string = ""): IErrorRet {
    if (typeof error === "string") error = { error, errorKey: "CUSTOM" };
    return this.#formatError(error, "CLIENT");
  }

  internal(error: IHelperError): IErrorRet {
    return this.#formatError(error, "INTERNAL");
  }

  service(error: IHelperError | string = ""): IErrorRet {
    if (typeof error === "string") error = { error, errorKey: "CUSTOM" };
    return this.#formatError(error, "SERVICE");
  }

  token(error: IHelperError | string): IErrorRet {
    if (typeof error === "string") error = { error, errorKey: "CUSTOM" };
    return this.#formatError(error, "TOKEN");
  }

  accessTokenExpired(error: IHelperError | string): IErrorRet {
    if (typeof error === "string") error = { error, errorKey: "CUSTOM" };
    return this.#formatError(error, "ACCESS_TOKEN_EXPIRED");
  }

  forbidden(error: IHelperError | string): IErrorRet {
    if (typeof error === "string") error = { error, errorKey: "CUSTOM" };
    return this.#formatError(error, "FORBIDDEN");
  }

  maintenance(error: IHelperError | string = ""): IErrorRet {
    if (typeof error === "string") error = { error, errorKey: "CUSTOM" };
    return this.#formatError(error, "MAINTENANCE");
  }
}
