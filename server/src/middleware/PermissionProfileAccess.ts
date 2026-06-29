// import { Response, NextFunction } from "express";

// // DAOs
// import { AdminDao } from "@models/";
// import { PermissionProfileDao } from "@models/permission-profile";

// // Helpers
// import { d, empty, isQueryError, isULID } from "@utils";
// import Core from "@core";

// // Others
// import { ADMIN_MSG } from "@common/messages";

// //--------------------------------------------------------------

// const permissionProfileAccess =
//   (keyPaths: string) => async (req: any, res: Response, next: NextFunction) => {
//     const { contextResponse, contextError, contextAdminId } = req;

//     try {
//       // check invalid permission {
//       if (!contextAdminId)
//         throw contextError.forbidden(
//           ADMIN_MSG.MIDDLEWARE_APP_AUTH.PERMISSION_PROFILE_ACCESS
//             .PERMISSION_INVALID,
//         );
//       // } check invalid permission

//       // find accept permission profile record {
//       // const permissionProfileMapRecord = await PermissionProfileMapDao.findOne({userId: contextUserId, organizationId: contextOrganizationId}, {relations: ['permissionProfile']})
//       // if(isQueryError(permissionProfileMapRecord)) throw contextError.forbidden(ADMIN_MSG.MIDDLEWARE_APP_AUTH.PERMISSION_PROFILE_ACCESS.NOT_FOUND);
//       // } find accept permission profile record

//       const permissionProfileMapRecord = await AdminDao.findById(
//         contextAdminId,
//         { populate: ["permissionProfileId"] },
//       );
//       if (isQueryError(permissionProfileMapRecord))
//         throw contextError.forbidden(
//           ADMIN_MSG.MIDDLEWARE_APP_AUTH.PERMISSION_PROFILE_ACCESS.NOT_FOUND,
//         );

//       // check permission disable {
//       // if(!empty(permissionProfileMapRecord.disabledAt)) throw contextError.forbidden(ADMIN_MSG.MIDDLEWARE_APP_AUTH.PERMISSION_PROFILE_ACCESS.PERMISSION_DISABLED);
//       // } check permission disable

//       // check master user {
//       if (
//         permissionProfileMapRecord.isMaster &&
//         empty(permissionProfileMapRecord.permissionProfileId)
//       ) {
//         return next();
//       }
//       // } check master user

//       if (empty(permissionProfileMapRecord.permissionProfileId?.permissions))
//         throw contextError.forbidden(
//           ADMIN_MSG.MIDDLEWARE_APP_AUTH.PERMISSION_PROFILE_ACCESS.NOT_FOUND,
//         );

//       // check permission {
//       const isPermitted = Core.PermissionProfile.hasPermissions(
//         permissionProfileMapRecord.permissionProfileId?.permissions,
//         keyPaths,
//       );
//       if (isPermitted) return next();
//       // } check permission

//       throw contextError.forbidden(
//         ADMIN_MSG.MIDDLEWARE_APP_AUTH.PERMISSION_PROFILE_ACCESS.DENIED,
//       );
//     } catch (e) {
//       contextResponse.sendError(e);
//     }
//   };

// export default permissionProfileAccess;
