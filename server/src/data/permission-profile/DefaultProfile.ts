import { IPermissions } from "./interface";

//--------------------------------------------------------------
// NOTE: 'In the Organization module, do not assign or provide any permissions'

export default [
  {
    name: "Admin",
    tag: "ADMIN",
    permissions: {},
  },
  {
    name: "User",
    tag: "USER",
    permissions: {
      PRODUCT: {
        VIEW: true,
        CREATE: false,
        UPDATE: false,
        DELETE: false,
      },
    },
  },
] as any;
