// Helpers
import { d, empty, isEqual } from "@utils";

// Others
import DataSets from "@data";

//--------------------------------------------------------------
export default class PermissionProfile {
  static getPermissions(permissions: any) {
    const permissionConfig: any = structuredClone(
      DataSets.PermissionProfile.Permissions,
    );
    const permissionPayload: any = structuredClone(
      DataSets.PermissionProfile.Permissions,
    );
    for (const category in permissionConfig) {
      const privileges = permissionConfig[category].privileges;
      permissionPayload[category] = permissionPayload[category].privileges;

      for (const privilegesKey in privileges) {
        permissionConfig[category].privileges[privilegesKey].isPermitted =
          isEqual(permissions?.[category]?.[privilegesKey], true);
        permissionPayload[category][privilegesKey] = isEqual(
          permissions?.[category]?.[privilegesKey],
          true,
        );
      }
    }
    return { permissionConfig, permissionPayload };
  }

  static hasPermissions(permissions: any, keys: string) {
    if (empty(permissions)) permissions = {};
    for (const value of (keys || "").split(",")) {
      const splitKey = value.split(".");
      const module = (splitKey[0] || "").trim();
      const subModule = (splitKey[1] || "").trim();
      if (subModule) {
        if (permissions?.[module]?.[subModule]) return true;
      } else if (permissions?.[module]) {
        const moduleRow = permissions?.[module] || {};
        const isTrue = (
          Object.keys(moduleRow).filter((key) => moduleRow[key] == true) || []
        ).length; // isTrue not remove is used for multiple permission check
        if (isTrue) return true;
      }
    }

    return false;
  }
}
