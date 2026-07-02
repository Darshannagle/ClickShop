import { AddressType } from "@prisma/client";
import { toTitleCase } from "@utils";

export default Object.values(AddressType).reduce((acc: any, value: string) => {
  acc[value] = toTitleCase(value);
  return acc;
}, {});
