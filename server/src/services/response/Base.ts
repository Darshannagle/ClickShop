// Helpers
import { d, logTrace, logError, empty, getError, logResponse } from "@utils";
import * as ViewHelper from "@utils/view-helper";

// Others
import Config from "@config";
import Error from "@services/error";
import ErrorCode from "../error/config/ErrorCode";
import { RESOURCE_CONFIG } from "@routes/config/Constant";
import versionInfo from "../../../version.json";

// Interfaces
import { IApiResponse, IBaseConstructor } from "./interface";
import { IErrorRet } from "../error/interface";
import { IObj } from "@common/interface";

//--------------------------------------------------------------
export default class Base {
  // Declaration {
  req: any;
  res: any;
  contextError: Error;
  routePrefix: string;
  viewPrefix: string | null;
  assetsPrefix: string | null;
  config: IObj;
  // } Declaration

  constructor({
    req,
    res,
    routePrefix,
    viewPrefix,
    assetsPrefix,
    config,
  }: IBaseConstructor) {
    this.req = req;
    this.contextError = req.contextError;
    this.res = res;
    this.routePrefix = routePrefix;
    this.viewPrefix = viewPrefix || null;
    this.assetsPrefix = assetsPrefix || null;
    this.config = config || {};
  }

  bindHelpers(config?: any) {
    const helpers: any = { ...ViewHelper };

    helpers.activeLink = helpers.activeLinkThing(config.activeUrl);
    delete helpers.activeLinkThing;

    helpers.resolveUrl = helpers.resolveUrlThing(this.routePrefix);
    delete helpers.resolveUrlThing;

    helpers.assets = helpers.assetsThing(
      `${RESOURCE_CONFIG.STATIC_ASSETS.FOLDER}/${this.assetsPrefix}`,
    );
    delete helpers.assetsThing;

    return helpers;
  }

  // Helpers {
  bindFlash(flashPayload?: any) {
    if (flashPayload) {
      if (typeof flashPayload === "string")
        this.res.flash("error", flashPayload);
      else if ("error" in flashPayload)
        this.res.flash("error", flashPayload.error);
      else if ("success" in flashPayload)
        this.res.flash("success", flashPayload.success);
    }
  }

  sendJson(payload: any, statusCode: number = 200) {
    this.res.status(statusCode).json(payload);
  }

  #sendCode(payload: IApiResponse) {
    const error = payload.error ? getError(payload.error) : null;
    payload = {
      code: payload.code,
      // @ts-ignore
      codeKey: payload.codeKey,
      // error: payload.error ? getError(payload.error) : undefined,
      /*errors: payload.errors,*/
      message: payload.log?.message || error || payload.message,
      data: payload.data,
      log: payload.log || undefined,
    };

    delete payload.log?.message;
    /*if(payload.error) {
            payload.message = payload.error;
            delete payload.error;
        }*/

    logResponse(payload, this.req.originalUrl);
    this.sendJson(payload);
  }

  // } Helpers

  // Response Code
  sendOk(data: any, message: string) {
    this.#sendCode({ code: ErrorCode.OK.CODE, data, message: message || "ok" });
  }

  sendError(error: IErrorRet) {
    if (!error.code) error = this.contextError.internal(error);
    this.#sendCode({
      code: error.code,
      error: error.message,
      codeKey: error.codeKey,
      errors: error.errors || {},
      log: error.log,
    });
  }

  /*sendClientError(error: string, data?: any) {
        this.sendCode({code: 'C000', error, data});
    }


    sendInternalError(error: string, data?: any) {
        this.sendCode({code: 'I000', error, data});
    }


    sendServiceError(error: string, data?: any) {
        this.sendCode({code: 'S000', error, data});
    }


    sendTokenError(error: string) {
        this.sendCode({code: 'T000', error});
    }*/

  // render and redirect
  redirect(route: string, flashPayload: any = null) {
    this.bindFlash(flashPayload);
    this.res.redirect(`${Config.APP.URL}/${this.routePrefix}/${route}`);
  }

  redirectBack(flashPayload?: any) {
    this.bindFlash(flashPayload);
    this.res.redirect("back");
  }

  redirectError(error: string) {
    logError(error);
    this.bindFlash("Error!");
    this.res.redirect("back");
  }

  redirectRenderError(page: string, payload: any = {}, config: any = {}) {
    config = {
      hideHeaders: true,
      layout: `${this.viewPrefix}/error/includes/layout`,
      ...config,
    };
    this.redirectRender(`error.${page}`, payload, config);
  }

  redirectRender(
    viewName: string,
    payload: any = {},
    { layout, hideHeaders }: any = {},
  ): void {
    const baseUrl = `${Config.APP.URL}/${this.routePrefix}`;
    const assetsUrl = `${Config.APP.URL}/${RESOURCE_CONFIG.STATIC_ASSETS.FOLDER}/${this.assetsPrefix}`;

    // payload._castingJsData = JSON.stringify({...(payload._ || {}), baseUrl, assetsUrl, appUrl: Config.APP.URL}); // _ data is used for pass in js code

    // page config {
    payload._config = {
      ...this.config,
      activeUrl: this.req.originalUrl.replace("/" + this.routePrefix, ""),
      baseUrl,
      assetsUrl,
      userDetails: this.req?.user || {},
      hideHeaders: hideHeaders === undefined ? false : hideHeaders,
      appName: Config.APP.NAME,
      webAppUrl: Config.WEB_APP.URL,
      versionInfo,
    };
    payload._contextData = JSON.stringify({
      ...(payload._ || {}),
      appMode: Config.APP.MODE,
      baseUrl,
      assetsUrl,
      appUrl: Config.APP.URL,
      _config: payload._config,
      identityToken: this.req?.extra?.identityToken || null,
    }); // _ data is used for pass in js code
    // } page config

    // Bind Helpers {
    payload._ = this.bindHelpers({ activeUrl: payload._config.activeUrl });
    // } Bind Helpers

    // set config for template view {
    payload.layout = !empty(layout)
      ? layout
      : `${this.viewPrefix}/includes/layout`; // set layout dynamic
    payload.extractScripts = true; // set js run end of html
    payload.extractStyles = true; // set style run start of html
    // } set config for template view

    this.res.render(
      `${this.viewPrefix}/${viewName.replace(/\./g, "/")}`,
      payload,
    );
  }
}

//--------------------------------------------------------------
