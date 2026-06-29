//--------------------------------------------------------------
export interface IHashTokenExtractVersionRet {
  version: number;
  token: string;
}

export interface IHashTokenGenerateRet {
  key: string;
  token: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  status: "ACTIVE" | "REVOKED";
}

export interface IHashTokenVerifyRet {
  tokenHash: string;
  now: Date;
  status: "ACTIVE" | "REVOKED";
}
