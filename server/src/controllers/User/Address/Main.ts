// DAOs
import { AddressDao } from "@models/AddressDao";

import { USER_MSG } from "@common/messages";
import { isQueryError, makeList, sanitize } from "@utils";
import { ProductDao } from "@models/ProductDao";
import { AddressType } from "@prisma/client";

//--------------------------------------------------------------
export default class Main {
  static async create(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      // sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        addressLine1: `required | shorttext`,
        addressLine2: `shorttext`,
        city: `required | shorttext`,
        state: `required | shorttext`,
        country: `required | shorttext`,
        pinCode: `required | shorttext | exactlength: 6`,
        addressType: `required | shorttext | in: ${Object.values(AddressType).join(",")}`,
        default: `boolean`,
      });

      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }

      const body = sanitizeResult.body;
      // } sanitize data

      body.userId = contextUser.id;
      // body.user = contextUser;
      const address = await AddressDao.create(body);
      if (isQueryError(address))
        return contextError.client(USER_MSG.ADDRESS.CREATE.FAILED);
      contextResponse.sendOk(address, USER_MSG.ADDRESS.CREATE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async list(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      const list = await AddressDao.find({ userId: contextUser.id });
      contextResponse.sendOk(list, USER_MSG.ADDRESS.LIST.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }

  static async delete(req: any) {
    const { contextResponse, contextError, contextUser } = req;
    try {
      //  sanitize data {
      const sanitizeResult = await sanitize(req.body, {
        id: `required | exist: Address.id (${USER_MSG.ADDRESS.DELETE.ADDRESS_NOT_FOUND})`,
      });

      if (sanitizeResult?.error || !sanitizeResult?.body) {
        throw contextError.client(sanitizeResult);
      }

      const { id } = sanitizeResult.body;
      // } sanitize data

      const address = await AddressDao.findByIdAndDelete(id);
      if (isQueryError(address))
        return contextError.client(USER_MSG.ADDRESS.DELETE.FAILED);
      contextResponse.sendOk(address, USER_MSG.ADDRESS.DELETE.SUCCESS);
    } catch (e) {
      contextResponse.sendError(e);
    }
  }
}
