import * as path from "path";
import multer from "multer";
import { ulid } from "ulid";
import fs from "fs";

// Helpers
import { d, empty } from "@utils";
import * as Helper from "../Helper";

// Others
import Config from "@config";
import {
  MAX_FILE_SIZE_MB,
  DEFAULT_FOLDER,
  LOCAL_STORAGE_FOLDER,
  TEMP_FOLDER_NAME,
} from "../Constant";

//--------------------------------------------------------------
export default class Manager {
  static baseUrl(isFullUrl: boolean = true): string {
    return `${isFullUrl ? Config.APP.URL : ""}/${LOCAL_STORAGE_FOLDER}/`;
  }

  static defaultMedia(image: string | null, isFullUrl: boolean = true): string {
    return image ? `${this.baseUrl(isFullUrl)}${DEFAULT_FOLDER}/${image}` : "";
  }

  static mediaUrl(
    folder: string,
    image: string | null,
    defaultMediaName: string | null = "",
    isFullUrl: boolean = true,
  ): string {
    return image
      ? `${this.baseUrl(isFullUrl)}${folder ? folder + "/" : ""}${image}`
      : this.defaultMedia(defaultMediaName);
  }

  static upload(folderPath: string, allowFileTypes: string[] = ["image"]) {
    return multer({
      storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
          cb(
            null,
            `${Config.STORAGE.LOCAL_FOLDER}/${TEMP_FOLDER_NAME ? TEMP_FOLDER_NAME + "/" : ""}${folderPath}`,
          );
        },
        filename: (req: any, file: any, cb: any) => {
          /*const fileName = `${Date.now()}X${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;*/
          const fileName = `${ulid()}${path.extname(file.originalname)}`;
          cb(null, fileName);
        },
      }),
      fileFilter: Helper.fileFilter(allowFileTypes),
      limits: {
        fileSize: MAX_FILE_SIZE_MB * 1048576,
      },
    });
  }

  static async remove(
    keyData: null | string | string[],
    folderPath: string = "",
  ): Promise<number> {
    if (empty(keyData)) return 0;

    if (typeof keyData === "string") keyData = [keyData];

    const baseFolderPath = `${Config.STORAGE.LOCAL_FOLDER}/${folderPath ? folderPath + "/" : ""}`;
    (keyData || []).forEach((fileName) => {
      try {
        fs.exists(baseFolderPath + fileName, (exists: any) => {
          if (exists) fs.unlinkSync(baseFolderPath + fileName);
        });
      } catch (e) {}
    });

    return 0;
  }

  // Marks the upload complete by saving/moving the file
  static async finalizeUpload(
    keyData: null | string | string[],
    folderPath: string = "",
  ): Promise<number> {
    if (empty(keyData)) return 0;

    if (typeof keyData === "string") keyData = [keyData];

    // const baseFolderPath = `${Config.STORAGE.LOCAL_FOLDER}/${folderPath ? folderPath + '/' : ''}`;
    const baseFolderPath = folderPath ? `${folderPath}/` : "";
    const tempFolderPath = TEMP_FOLDER_NAME ? `${TEMP_FOLDER_NAME}/` : "";

    (keyData || []).forEach((fileName) => {
      try {
        const tempFileName = `${Config.STORAGE.LOCAL_FOLDER}/${tempFolderPath}${baseFolderPath}${fileName}`;
        if (fs.existsSync(tempFileName)) {
          fs.rename(
            tempFileName,
            `${Config.STORAGE.LOCAL_FOLDER}/${baseFolderPath}${fileName}`,
            () => {},
          );
        }
      } catch (e) {}
    });

    return 0;
  }
}
