import { OrderStatus } from "@prisma/client";
import { toTitleCase } from "@utils";

export default Object.values(OrderStatus).reduce((acc: any, value: string) => {
  acc[value] = toTitleCase(value);
  return acc;
}, {});
