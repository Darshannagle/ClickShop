export interface IAddress {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  addressType: AddressType;
  default: boolean;
}
export enum AddressType {
  HOME = "Home",
  OFFICE = "Office",
}

export const toString = (address: IAddress): string => {
  if (!address) return "";

  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.country,
    address.pinCode,
  ].filter(Boolean); // removes undefined, null, or empty strings

  return parts.join(", ");
};
