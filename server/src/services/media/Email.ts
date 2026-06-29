// Others
import Handler from "./handler";
import FolderConfig from "./config/FolderConfig";

//--------------------------------------------------------------
export default class Email {
  static FOLDER = FolderConfig.EMAIL.FOLDER;

  /*static DEFAULT_MEDIA = FolderConfig.EMAIL.DEFAULT_MEDIA;*/

  static get(image: string | null, isLocalStorage?: boolean): any {
    return Handler.Uploader.mediaUrl(this.FOLDER, image, isLocalStorage);
  }
}
