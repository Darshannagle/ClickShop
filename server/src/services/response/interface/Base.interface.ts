// Interfaces
import { IObj } from "@common/interface";

//--------------------------------------------------------------
export interface IBaseConstructor {
  req: any;
  res: any;
  routePrefix: string;
  viewPrefix?: string;
  assetsPrefix?: string;
  config?: IObj;
}
