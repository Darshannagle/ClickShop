import prisma from "../../../prisma";
// DAOs
import { UserDao } from "@models/UserDao";

// Helpers
import Jwt from "@services/token/Jwt";
import Password from "@services/token/Password";
import { isQueryError, sanitize } from "@utils";
import { USER_MSG } from "@common/messages";
import { OAuth2Client } from "google-auth-library";
import Constant from "@config/Constant";

//--------------------------------------------------------------
export default class Main {
  static client = new OAuth2Client(Constant.OAUTH.GOOGLE_CLIENT_ID);
  static async signup(req: any, res: any) {
    const { contextResponse, contextError } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        fullName: `required | shorttext`,
        email: `required | email | unique: User.email (${USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.EMAIL_ALREADY_EXIST}) | normalize: lower`,
        password: `required | password | normalize: password`,
        phone: `required | shorttext`,
        gender: `required | in: MALE,FEMALE,OTHER`,
        location: `required | shorttext`,
        pinCode: `required | number | normalize: number`,
      });
      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }
      const body = sanitizeResult.body;
      // } sanitize data

      // check user exist {
      const user = await UserDao.findOne({ email: body.email });
      if (user)
        throw contextError.client(
          USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.EMAIL_ALREADY_EXIST,
        );
      // } check user exist

      const { token } = await prisma.$transaction(async (tx) => {
        // create user {

        // hash password {
        body.password = Password.encryptPassword(body.password);
        // } hash password

        const user = await UserDao.create(body, tx);
        if (isQueryError(user)) throw contextError.server(user);
        // } create user

        // create token {
        const token = Jwt.sign({ id: user.id });
        // } create token

        // return {
        return { token };
        // } return
      });
      // response {

      contextResponse.sendOk(
        { token },
        USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.SIGNUP.SUCCESS,
      );
      // } response
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async login(req: any, res: any) {
    const { contextResponse, contextError } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        email: `required | email | exist: User.email (${USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.USER_NOT_FOUND}) | normalize: lower`,
        password: `required | password | normalize: password`,
      });
      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }
      const body = sanitizeResult.body;
      // } sanitize data

      const { token } = await prisma.$transaction(async (tx) => {
        const user = sanitizeResult?.records["email"];

        // check password {
        const isPasswordMatch = Password.verifyPassword(
          body?.password,
          user?.password?.hash,
          user?.password?.salt,
        );
        if (!isPasswordMatch)
          throw contextError.client(
            USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.INVALID_CREDENTIALS,
          );
        // } check password

        // create token {
        const token = Jwt.sign({ id: user.id });
        // } create token

        return { token };
      });
      // response {

      contextResponse.sendOk(
        { token },
        USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.SIGNUP.SUCCESS,
      );
      // } response
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async getProfile(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      const user = await UserDao.findById(contextUser.id, null, {
        include: { addresses: true },
      });
      if (!user)
        throw contextError.client(
          USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.USER_NOT_FOUND,
        );

      return contextResponse.sendOk(
        user,
        USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.GET_PROFILE.SUCCESS,
      );
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async googleLogin(req: any, res: any) {
    const { contextResponse, contextError } = req;
    try {
      console.log(
        "Constant.OAUTH.GOOGLE_CLIENT_ID",
        Constant.OAUTH.GOOGLE_CLIENT_ID,
      );

      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        token: `required | string`,
      });
      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }
      const body = sanitizeResult.body;
      // } sanitize data

      const ticket = await Main.client.verifyIdToken({
        idToken: body.token,
        audience: Constant.OAUTH.GOOGLE_CLIENT_ID,
      });
      console.log("ticket: ", ticket);

      const payload = ticket.getPayload();
      console.log("payload: ", payload);
      let user = await UserDao.findOne({
        $or: [{ googleId: payload?.email }, { email: payload?.email }],
      });
      console.log("existing user: ", user);
      const { token } = await prisma.$transaction(async (tx) => {
        // check user exist {
        if (!user) {
          // create user {
          user = await UserDao.create({
            email: payload?.email,
            fullName: payload?.name,
            googleId: payload?.sub,
          });
          console.log("user: ", user);
          // } create user
          if (isQueryError(user)) throw contextError.client(user);
        }

        // } check user exist

        // create token {
        const token = Jwt.sign({ id: user.id });
        // } create token

        // return {
        return { token };
        // } return
      });
      // response {

      console.log("token: ", token);
      contextResponse.sendOk(
        { token, user },
        USER_MSG.MIDDLEWARE_APP_AUTH.AUTH.SIGNUP.SUCCESS,
      );
      // } response
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
