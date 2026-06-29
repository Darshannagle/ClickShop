import axios from "axios";

// Helpers

// Others
import { INTERNAL_MSG } from "@common/messages";

// Interfaces
import { IHealthcheck, IClientRet } from "./interface";
import { IObj } from "@common/interface";

//--------------------------------------------------------------
export default class Client {
  static async callRequest(
    url: string,
    method: "GET" | "POST",
    payload: IObj = {},
    headers: IObj = {},
  ): Promise<IClientRet> {
    const ERROR_KEY = "CLIENT-CALL-REQUEST";
    const resultFormat = (result: any): IClientRet => {
      result = result || {};
      const isSuccess = result.status === 200;
      return {
        status: isSuccess,
        data: isSuccess ? result.data || {} : {},
        message: isSuccess ? "Success!" : "Fail!",
        statusCode: result.status || 0,
        error: !isSuccess
          ? { ...(result.data || {}), errorKey: ERROR_KEY }
          : null,
        info: {
          url,
          method,
          headers,
          payload,
          error: !isSuccess ? result.data || {} : null,
        },
      };
    };

    try {
      const result = await axios({
        method: method.toLowerCase(),
        url,
        headers,
        data: payload,
      });

      return resultFormat(result);
    } catch (e: any) {
      return resultFormat(e.response);
    }
  }

  static async healthcheck(
    url: string,
    method: "GET" | "POST" = "GET",
    payload: IObj = {},
    headers: IObj = {},
  ): Promise<IHealthcheck> {
    const response = await this.callRequest(url, "GET");
    return response.status
      ? { data: INTERNAL_MSG.API_CLIENT.HEALTHCHECK.HEALTHY, error: null }
      : { data: null, error: INTERNAL_MSG.API_CLIENT.HEALTHCHECK.DEATH };
  }

  static async get(
    url: string,
    payload: IObj = {},
    headers: IObj = {},
  ): Promise<IClientRet> {
    return await this.callRequest(url, "GET", payload, headers);
  }

  static async post(
    url: string,
    payload: IObj = {},
    headers: IObj = {},
  ): Promise<IClientRet> {
    return await this.callRequest(url, "POST", payload, headers);
  }
}
