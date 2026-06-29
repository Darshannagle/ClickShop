import { Response, NextFunction } from "express";

// DAOs
import { UserDao } from "@models/UserDao";

// Helpers
import { d, empty, isQueryError } from "@utils";
import Token from "@services/token";

// Others
import Config from "@config";
import { USER_MSG } from "@common/messages";

//--------------------------------------------------------------

export default async (req: any, res: Response, next: NextFunction) => {
  const { contextResponse, contextError, headers } = req;
  try {
    if (!headers.authorization)
      throw contextError.token(USER_MSG.MIDDLEWARE_APP_AUTH.TOKEN.NOT_FOUND);

    // verify token {
    const verifyResult: any = await Token.Jwt.verify(
      headers.authorization,
      Config.JWT.SECRET_KEY,
    );
    if (verifyResult?.error) throw contextError.token(verifyResult);
    // } verify token  // check user {
    if (!verifyResult.id)
      throw contextError.token(
        USER_MSG.MIDDLEWARE_APP_AUTH.TOKEN.INVALID_PAYLOAD,
      );

    const record: any = await UserDao.findById(verifyResult.id);
    if (isQueryError(record))
      throw contextError.token(
        USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.USER_NOT_FOUND,
      );

    // user {
    req.contextUser = record;
    req.contextUserId = record.id;
    // req.contextSessionId = sessionRecord.id;
    // } user

    next();
  } catch (e) {
    contextResponse.sendError(e);
  }
};
