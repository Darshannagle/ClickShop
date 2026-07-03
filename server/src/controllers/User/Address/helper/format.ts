// Helpers
import {
  d,
  empty,
  formatDate,
  timeSince,
  getBool,
  getNum,
  getStr,
  logTrace,
  formatNumber,
  getKeyLabel,
} from "@utils";
import Media from "@services/media";

// Others
import DataSets from "@data";

// Interfaces
import { IObj } from "@common/interface";

//--------------------------------------------------------------
export const list = (rawData: any[], extra?: IObj): IObj[] => {
  if (empty(rawData)) return [];

  const data = [];
  for (const r of rawData) {
    data.push({
      id: r?.id,
      addressLine1: getStr(r?.addressLine1),
      addressLine2: getStr(r?.addressLine2),
      city: getStr(r?.city),
      state: getStr(r?.state),
      country: getStr(r?.country),
      pinCode: getStr(r?.pinCode),
      addressType: getKeyLabel(r?.addressType, DataSets.Address.AddressType),
      default: getBool(r?.default),
      createdAt: formatDate(r?.createdAt),
    });
  }
  return data;
};
