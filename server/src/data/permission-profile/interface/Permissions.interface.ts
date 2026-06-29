//--------------------------------------------------------------

export interface IPermissions {
    [moduleKey: string]: {
        label: string,
        privileges: {
            [privilegeKey: string]: {
                label: string,
                isPermitted: boolean
            };
        };
    };
}
