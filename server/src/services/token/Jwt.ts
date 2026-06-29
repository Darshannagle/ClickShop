import jsonwebtoken from "jsonwebtoken";

// Helpers
import { d, empty, getError } from "@utils";

// Others
import Config from "@config";

// Interfaces
import { IHelperError, IVerifyRet } from "./interface";

//--------------------------------------------------------------
export default class Jwt {
  static sign(identity: any): string {
    console.log("Config.JWT.EXPIRES_IN: ", Config.JWT.EXPIRES_IN);
    return jsonwebtoken.sign(identity, Config.JWT.SECRET_KEY, {
      expiresIn: Config.JWT.EXPIRES_IN,
    } as any);
  }

  static verify(
    token: string,
    secretKey: string,
  ): Promise<IHelperError | IVerifyRet> {
    const ERROR_KEY = "JWT-VERIFY";
    token = token.replace("Bearer ", "");

    return new Promise((resolve) => {
      jsonwebtoken.verify(token, secretKey, (err: any, decoded: any) => {
        // handle error {
        const errorDetails = err ? getError(err) : null;
        if (errorDetails === "jwt expired")
          return resolve({
            error: getError(err),
            type: "EXPIRED",
            errorKey: ERROR_KEY,
          });
        else if (errorDetails)
          return resolve({
            error: errorDetails,
            type: "UNKNOWN",
            errorKey: ERROR_KEY,
          });
        // } handle error

        resolve(decoded);
        /*resolve(err ? {error: getError(err), type: 'UNKNOWN', errorKey: ERROR_KEY} : decoded);*/
      });
    });
  }
}
