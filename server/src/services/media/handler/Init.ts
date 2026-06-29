import * as disk from "./disk";

// Helpers
import { d, empty } from "@utils";

// Others
import Config from "@config";
//--------------------------------------------------------------
export default async (): Promise<void> => {
  await disk.FolderHandler();
};
