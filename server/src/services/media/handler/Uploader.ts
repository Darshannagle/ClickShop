import * as util from "util";

// Helpers
import { d, empty, logError } from "@utils";
import * as Helper from "./Helper";
import * as disk from "./disk";

// Others
import { ALLOW_FILE_TYPES, IS_LOCAL_STORAGE } from "./Constant";

//--------------------------------------------------------------
export default class Uploader {
  // Url Methods { -----------------------------------------
  // get media base path
  static baseUrl(
    isFullUrl: boolean = true,
    isLocalStorage: boolean = false,
  ): string {
    return disk.Manager.baseUrl(isFullUrl);
    // isLocalStorage?
  }

  // get media full and relative url
  static mediaUrl(
    folder: string,
    image: string | null,
    isLocalStorage: boolean = IS_LOCAL_STORAGE,
    defaultMediaName: string | null = "",
    isFullUrl: boolean = true,
  ): string {
    return disk.Manager.mediaUrl(folder, image, defaultMediaName);
    //  isLocalStorage ?
  }

  // get default image
  static defaultError(error: any, configs: any): string {
    if (error?.code === "LIMIT_UNEXPECTED_FILE")
      return `${error?.field} selected more than ${configs[0]?.maxCount || 1}`;

    return Helper.getErrorMessage(error);
  }

  static defaultMedia(
    image: string | null,
    isFullUrl: boolean = true,
    isLocalStorage: boolean = IS_LOCAL_STORAGE,
  ): string {
    return disk.Manager.defaultMedia(image, isFullUrl);
    //  isLocalStorage ?
  }
  // } Url Methods -----------------------------------------

  static async many(
    fields: any,
    folderPath: string,
    req: any,
    res: any,
    allowFileTypes: string[] = ["image"],
    isLocalStorage: boolean = IS_LOCAL_STORAGE,
    isDetails: boolean = false,
  ): Promise<any> {
    try {
      const configs = Helper.fieldConfigs(fields);

      // Resolve allowed file types dynamically
      const resolvedFileTypes = allowFileTypes;
      const uploadManager = disk;
      //    isLocalStorage ?
      await util.promisify(
        uploadManager.Manager.upload(folderPath, resolvedFileTypes).fields(
          configs,
        ),
      )(req, res);

      const media = Helper.formatFiles(req.files, configs, isDetails);
      return {
        media,
        save(saveKeys: string[] | null = null) {
          Uploader.save(media, folderPath, saveKeys, isLocalStorage);
        },
      };
    } catch (e: any) {
      logError(e);

      const configs = Helper.fieldConfigs(fields);
      return { error: this.defaultError(e, configs) };
    }
  }

  /*static async any(folderPath: string, req: any, res: any, allowFileTypes: string[] = ['image'], isLocalStorage: boolean = IS_LOCAL_STORAGE, isDetails: boolean = false): Promise<any> {
        try {
            await util.promisify((isLocalStorage ? disk : s3).Manager.upload(folderPath, allowFileTypes).any())(req, res);
            return Helper.formatFileName(req);
        } catch(e: any) {
            logError(e);
            return {error: Helper.getErrorMessage(e)};
        }
    }*/

  // } Upload Methods -----------------------------------------

  // Remove Methods { -----------------------------------------
  static async remove(
    keys: any,
    folderPath: string,
    isLocalStorage: boolean = IS_LOCAL_STORAGE,
  ): Promise<number> {
    return await disk.Manager.remove(keys, folderPath);
  }

  // } Remove Methods -----------------------------------------

  // } Save/Rename after file upload methods -----------------------------------------
  static async save(
    keysMeta: any,
    folderPath: string,
    saveKeys: string[] | null = null,
    isLocalStorage: boolean = IS_LOCAL_STORAGE,
  ): Promise<any> {
    let keys: string[] = Object.values(keysMeta).flatMap((v) =>
      Array.isArray(v) ? v : [v],
    );
    if (saveKeys) keys = keys.filter((key) => saveKeys.includes(key));
    return await disk.Manager.finalizeUpload(keys, folderPath);
  }

  // } Save/Rename after file upload methods -----------------------------------------
}
