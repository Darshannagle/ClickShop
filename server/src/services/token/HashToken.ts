import crypto from "crypto";

// Helpers
import { d, empty, getError } from "@utils";

// Interfaces
import {
  IHashTokenExtractVersionRet,
  IHashTokenGenerateRet,
  IHashTokenVerifyRet,
} from "./interface";

//--------------------------------------------------------------
export default class HashToken {
  static encoding: any = "hex";
  static algorithm = "sha256";
  static expiryMinutes = 24;

  static generateRawToken(length = 32) {
    return crypto.randomBytes(length).toString(this.encoding);
  }

  static hashToken(token: string) {
    return crypto
      .createHash(this.algorithm)
      .update(token)
      .digest(this.encoding);
  }

  static getExpiryTime(minutes = this.expiryMinutes): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    return now;
  }

  static generate({
    key = null,
    expiryMinutes,
    token,
    attachToken,
    version,
  }: any): IHashTokenGenerateRet {
    if (!token) token = this.generateRawToken();
    if (attachToken) token = `${attachToken}${token}`;

    /*if(version) {
            const versionBytes = this.generateVersion(version);
            token = `${versionBytes}${token}`;
        }*/
    const tokenHash = this.hashToken(token);
    const expiresAt = this.getExpiryTime(expiryMinutes);

    return {
      key,
      token, // Send to user only once
      tokenHash, // Store in DB
      expiresAt,
      createdAt: new Date(),
      status: "ACTIVE", // REVOKED
    };
  }

  static verify(token: string): IHashTokenVerifyRet {
    const tokenHash = this.hashToken(token || "");
    return {
      tokenHash,
      status: "ACTIVE",
      now: new Date(),
    };
  }
}
