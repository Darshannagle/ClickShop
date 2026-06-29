import fs from "fs";

// Helpers
import { d, logError } from "@utils";

// Others
import Config from "@config";
import FolderConfig from "../../config/FolderConfig";
import { TEMP_FOLDER_NAME } from "../Constant";

//--------------------------------------------------------------
const makeNewDir = async (folderPath: string) => {
  try {
    folderPath = `${Config.STORAGE.LOCAL_FOLDER}/${folderPath}`;
    if (!fs.existsSync(folderPath)) await fs.mkdirSync(folderPath);
  } catch (e) {}
};

export default async (): Promise<void> => {
  try {
    await makeNewDir("");
    await makeNewDir(TEMP_FOLDER_NAME);

    const folders: any = FolderConfig;
    for (const key in folders) {
      makeNewDir(folders[key]?.FOLDER);
      makeNewDir(
        `${TEMP_FOLDER_NAME ? TEMP_FOLDER_NAME + "/" : ""}${folders[key]?.FOLDER}`,
      );
    }
  } catch (e: any) {
    logError(
      `[DISK] - folder not created - Error: ${typeof e === "string" ? e : e.message}`,
      null,
    );
    process.exit(1);
  }
};
