import { Types } from "mongoose";

//--------------------------------------------------------------
declare global {
  // common inter faces {
  interface IHelperError {
    error: string;
    errorKey?: string;
  }
  // } common inter faces

  // common {
  type TKeyValueMap = Record<string, string>;
  type TObj = Record<string, any>;
  // } common

  // auth {
  type TUserMfaMethod = "NONE" | "EMAIL" | "SMS" | "APP"; // NONE: MFA disabled | EMAIL: OTP via email | SMS: OTP via phone | APP: Authenticator app (TOTP)
  // } auth
}
export {}; // required to make it a module
