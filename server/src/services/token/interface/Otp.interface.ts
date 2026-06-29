//--------------------------------------------------------------
export interface IOtpRet {
  otp: number;
  expireAt: Date;
  expireInSecond: number;
}

export interface IOtpVerifyRet {
  status: boolean;
}
