import { IPermissions } from "./interface";

//--------------------------------------------------------------

export default {
  DASHBOARD: {
    label: "Dashboard",
    privileges: {
      VIEW: {
        label: "View",
        isPermitted: false,
      },
    },
  },
} as IPermissions;
