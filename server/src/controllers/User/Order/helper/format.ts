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
    (getKeyLabel(r?.orderStatus, DataSets.Order.OrderStatus),
      data.push({
        id: r?.id,
        totalAmount: r?.totalAmount,
        orderStatus: getKeyLabel(r?.orderStatus, DataSets.Order.OrderStatus),
        paymentStatus: r?.paymentStatus,
        paymentMethod: r?.paymentMethod,
        createdAt: r?.createdAt,
        images: r?.orderItems?.map((item: any) => item?.product?.images?.[0]),
      }));
  }
  return data;
};
