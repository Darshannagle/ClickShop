// Others
import Handler from "./handler";
import FolderConfig from "./config/FolderConfig";

//--------------------------------------------------------------
export default class ProfilePicture {
  static FOLDER = FolderConfig.PROFILE_PICTURE.FOLDER;
  static DEFAULT_MEDIA = FolderConfig.PROFILE_PICTURE.DEFAULT_MEDIA;

  static get(image: string | null, isLocalStorage?: boolean): string {
    return Handler.Uploader.mediaUrl(
      this.FOLDER,
      image,
      isLocalStorage,
      this.DEFAULT_MEDIA,
    );
  }

  static async set(fieldName: any, req: any, res: any): Promise<any> {
    return await Handler.Uploader.many(fieldName, this.FOLDER, req, res);
  }

  static async remove(keys: any): Promise<any> {
    return await Handler.Uploader.remove(keys, this.FOLDER);
  }
}
