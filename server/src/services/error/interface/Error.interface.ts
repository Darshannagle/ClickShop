//--------------------------------------------------------------
export type TErrorType =
  | "OK"
  | "CLIENT"
  | "INTERNAL"
  | "SERVICE"
  | "TOKEN"
  | "ACCESS_TOKEN_EXPIRED"
  | "FORBIDDEN"
  | "MAINTENANCE";

interface IObj {
  [key: string]: any;
}

export interface IErrorRet {
  traceKey: string;
  code: string;
  codeKey: string;
  message: string;
  error: string;
  errors?: IObj;
  log: any;
}

export interface IHelperError {
  error: string;
  errors?: IObj;
  errorKey?: string;
}
