// Helpers
import { convertToDate, d, empty, getError, formatDate, getStr } from "@utils";

// Others
// import Config from '@config/Constant';

// Interfaces
import { IHelperError } from "@services/token/interface";
import { IOtpRet, IOtpVerifyRet } from "./interface";
//--------------------------------------------------------------

const EXPIRE_TIME_IN_SECONDS = 300;
const DIGITS = 6;

//--------------------------------------------------------------
export default class Otp {
  static generate(
    digits: number = DIGITS,
    expireTimeInSeconds: number = EXPIRE_TIME_IN_SECONDS,
  ): IOtpRet | IHelperError {
    const ERROR_KEY = "[OTP-GENERATE] -";

    try {
      let min = "1";
      let max = "9";

      while (min.length < digits) min += "0";
      while (max.length < digits) max += "9";

      const maxNum = parseInt(max);
      const minNum = parseInt(min);

      const otp = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

      const expireInSecond = expireTimeInSeconds;
      const expireAt = new Date();

      expireAt.setSeconds(expireAt.getSeconds() + expireTimeInSeconds);

      return { otp, expireAt, expireInSecond };
    } catch (e) {
      return { error: getError(e), errorKey: ERROR_KEY };
    }
  }

  static verify(
    otp: string,
    otpCode: string,
    expireTime: Date,
  ): IOtpVerifyRet | IHelperError {
    const ERROR_KEY = "[OTP-VERIFY] -";

    try {
      otp = getStr(otp);
      otpCode = getStr(otpCode);

      if (otp !== otpCode) throw `OTP invalid.`;

      const currentTime = new Date();
      if (new Date(expireTime) < currentTime) throw `OTP expired.`;

      return { status: true };
    } catch (e) {
      return { error: getError(e), errorKey: ERROR_KEY };
    }
  }
}
