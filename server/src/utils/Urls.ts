// Helpers
import { empty } from "./Values";

//--------------------------------------------------------------
export const buildQueryString = (
  baseURL: string,
  params?: Record<string, string | number | boolean>,
): string => {
  if (!params || Object.keys(params).length === 0) return baseURL; // return original url if no params
  const queryString = new URLSearchParams(
    params as Record<string, string>,
  ).toString();
  return `${baseURL}?${queryString}`;
};

export const buildQueryParams = (
  url: string,
  params?: Record<string, string | number | boolean>,
): string => {
  if (!params) return url;
  return url.replace(/:([a-zA-Z_]+)/g, (_, key) => params[key] + "" || "");
};

export const buildQueryAndParams = (
  url: string,
  params: Record<string, string | number | boolean>,
  query: Record<string, string | number | boolean>,
): string => {
  return buildQueryString(buildQueryParams(url, params), query);
};

export const buildUpiUrl = ({
  upi,
  payeeName,
  amount,
  currency = `INR`,
  note,
  tnx,
}: any): string | null => {
  if (empty(upi)) return null;

  const payload: any = {
    pa: upi,
    // pn: payeeName,
    // am: amount,
    // cu: currency,
    // tn: note,
    // tr: tnx,
  };

  if (payeeName) payload.pn = payeeName;
  if (amount) payload.am = amount;
  if (currency) payload.cu = currency;
  if (note) payload.tn = note;
  if (tnx) payload.tr = tnx;

  return buildQueryString(`upi://pay`, payload);
};
