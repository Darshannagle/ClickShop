import moment from "moment";
import { validate as uuidValidate } from "uuid";
import {
  monotonicFactory as ulidMonotonicFactory,
  isValid as ulidValidate,
} from "ulid";

//--------------------------------------------------------------
const ulidMonotonicFactoryInstance = ulidMonotonicFactory();

//--------------------------------------------------------------
export const getTrim = (data: string) => {
  return data.trim();
};

export const empty = (data: any): boolean => {
  if (data instanceof Date) return false;
  if (
    [undefined, "undefined", null, "null", ""].includes(data) ||
    (typeof data === "object" && Object.keys(data).length === 0)
  )
    return true;
  return typeof data === "string" && !data.trim().length;
};

export const getVal = (value: any): any => {
  return empty(value) ? null : value;
};

export const getStr = (value: any): string => {
  if (empty(value)) return "";

  if (value instanceof Date) return value.toISOString();
  if (moment.isMoment && moment.isMoment(value)) return value.toISOString();

  return typeof value !== "object" ? getTrim(value + "") : "";
};

export const getBool = (value: any): boolean => {
  if (empty(value)) return false;
  if (["false", false, 0, "0"].includes(value)) return false;
  if (["true", true, 1, "1"].includes(value)) return true;
  return false;
};

export const getNum = (value: any, defaultVal: number = 0): number => {
  // if (typeof value === 'object') value = Number(value);
  return isFinite(value) ? +value : defaultVal;
};

export const getArrayOfStr = (
  array: any,
  isRemoveEmpty: boolean = false,
): any => {
  const data = [];
  if (empty(array)) return [];
  for (const a of array) {
    if (isRemoveEmpty && empty(a)) continue;
    data.push(getStr(a));
  }
};

export const getKeyLabel = (
  key: any,
  dataSets: any,
): { key: string; label: string } | {} => {
  if (empty(key)) return {};
  return {
    key: getStr(key),
    label: getStr(dataSets[key] || key), // Unknown
  };
};

export const isNumbersOnly = (value: any): boolean => {
  return !Number.isNaN(Number(value));
};

export const isEqual = (v1: any, v2: any, isConvertString = true): boolean => {
  return isConvertString ? v1 + "" === v2 + "" : v1 === v2;
};

export const isUUID = (value: string): boolean => {
  return uuidValidate(value);
};

export const isULID = (value: string): boolean => {
  return ulidValidate(value);
};

export const newULID = (): string => {
  return ulidMonotonicFactoryInstance();
};

export const formatKey = (
  data: string | number,
  keyWith: string = "-",
  isUpperCase: boolean = true,
): string | null => {
  try {
    data = (data as string).toString();
    return empty(data)
      ? ""
      : (isUpperCase ? data.toUpperCase() : data.toLowerCase())
          .replace(/[^a-zA-Z0-9]+/g, " ")
          .trim()
          .replace(/\s+/g, keyWith);
  } catch (e) {
    return null;
  }
};

export const lower = (
  value: string | number | null | undefined,
): string | number | null | undefined => {
  return !value ? value : value.toString().toLowerCase();
};

export const upper = (
  value: string | number | null | undefined,
): string | number | null | undefined => {
  return !value ? value : value.toString().toUpperCase();
};

export const toFixedDecimals = (
  value: any,
  decimals: number = 2,
): number | null | undefined => {
  if (typeof value === "object") value = Number(value);
  if (typeof value === "string") value = Number(value);
  return Number((value || 0).toFixed(decimals));
};

export const formatNumber = (
  value: any,
  decimals: number = 2,
): string | number | null | undefined => {
  value = toFixedDecimals(value, decimals);
  return value.toFixed(decimals);
};

export const toDecimal = (value: string, decimals: number = 18): number => {
  const bigValue = BigInt(value);
  const divisor = 10 ** decimals;
  return Number(bigValue) / divisor;
};

export const percentage = (
  amount: string | number,
  percent: string | number,
): any => {
  amount = getNum(amount);
  percent = getNum(percent);
  return toFixedDecimals((amount * percent) / 100);
};

export const getRandomNumber = (
  min: number,
  max: number,
  decimals: number = 4,
): number => {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
};

export const maskString = (value: any, hiddenChar: any = "●"): string => {
  // ● ⬤
  return hiddenChar.repeat(getStr(value).length);
};

export const maskEmail = (email: any): string => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (!domain) return email;

  const visible = name.slice(0, 2);
  return `${visible}***@${domain}`;
};

export const formatMemory = (bytes: number = 0): string => {
  if (bytes < 1024) return `${bytes} B`;
  else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  else if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  else return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

export const getFullName = ({
  firstName,
  middleName,
  lastName,
}: any): string => {
  return `${firstName || ""} ${middleName || ""} ${lastName || ""}`
    .replace(/\s+/g, " ")
    .trim();
};

export const mergeValues = (
  values: any[] | any,
  concater: string = " ",
): string => {
  const arr = Array.isArray(values) ? values : [values];
  return arr
    .filter((v) => v !== undefined && v !== null && v !== "")
    .map(String)
    .join(concater);
};

export const getCurrentMonthProrated = (
  amountPerMonth: any,
  activeAt: any = new Date(),
) => {
  const startDate = moment(activeAt).startOf("day");
  const endDate = moment(activeAt).endOf("month");

  const totalDaysInMonth = endDate.daysInMonth();
  const remainingDays = endDate.date() - startDate.date() + 1;

  const amount = ((amountPerMonth / totalDaysInMonth) * remainingDays).toFixed(
    2,
  );

  return {
    startDate,
    endDate,
    amount: parseFloat(amount),
    amountPerMonth,
  };
};

export const getLastMonthProrated = (amountPerMonth: number, endAt: any) => {
  const endDate = moment(endAt).endOf("day");
  const startDate = moment(endAt).startOf("month");

  const totalDaysInMonth = endDate.daysInMonth();
  const usedDays = endDate.date();

  const amount = ((amountPerMonth / totalDaysInMonth) * usedDays).toFixed(2);

  return {
    startDate,
    endDate,
    amount: parseFloat(amount),
    amountPerMonth,
  };
};

export const getPaymentCardExpiryStatus = (
  expiryMonth?: string | number,
  expiryYear?: string | number,
  expireSoonDays: number = 90,
): string => {
  if (empty(expiryMonth) || empty(expiryYear)) return "EXPIRED";

  const expMonth = Number(expiryMonth);
  const expYear = Number(expiryYear);

  // Card expires at end of expiry month
  const expiryDate = new Date(expYear, expMonth, 0, 23, 59, 59);
  const today = new Date();

  // expired
  if (expiryDate < today) {
    return "EXPIRED";
  }

  // days difference
  const diffInDays = Math.ceil(
    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays <= expireSoonDays) {
    return "EXPIRE-SOON";
  }

  return "ACTIVE";
};
