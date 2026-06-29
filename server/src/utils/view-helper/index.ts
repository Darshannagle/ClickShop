import Config from "@config";

//--------------------------------------------------------------
export const empty = (data: any): boolean => {
  if (data instanceof Date) return false;
  if (
    [undefined, "undefined", null, "null", ""].includes(data) ||
    (typeof data === "object" && Object.keys(data).length === 0)
  )
    return true;
  return typeof data === "string" && !data.trim().length;
};

export const activeLinkThing =
  (activeUrlDefault: string = "") =>
  (
    slug: string = "",
    returnValue: string = "active",
    activeUrl: string = activeUrlDefault,
  ): string => {
    const activeSlugs = slug.split(",");

    // method check active or not {
    const checkActive = (activeSlug: string = "") => {
      const slugParts = activeSlug.split("/");
      const routeParts = activeUrl.split("?")[0].split("/");

      if (routeParts[0] === "") routeParts.shift();
      /*if(isExcludePrefix) routeParts.shift();*/

      if (slugParts.length !== routeParts.length) return "";
      // Compare the parts one by one
      for (let i = 0; i < slugParts.length; i++) {
        const routePart = routeParts[i];
        const slugPart = slugParts[i];

        // If prefix part is dynamic (e.g., :id, *id, :, *), skip the check
        if (slugPart.startsWith(":") || slugPart.startsWith("*")) continue;

        // If the parts do not match, return false
        if (routePart !== slugPart) return "";
      }
      return returnValue;
    };
    // } method check active or not

    // check multiple slug ase active {
    for (const activeSlug of activeSlugs) {
      const valid = checkActive(activeSlug.trim());
      if (valid) return valid;
    }
    return "";
    // } check multiple slug ase active
  };

export const resolveUrlThing =
  (prefix: string) =>
  (url: string): string => {
    return Config.APP.URL + "/" + (prefix ? prefix + "/" : "") + url;
  };

export const assetsThing =
  (prefix: string) =>
  (postFixUrl: string): string => {
    return Config.APP.URL + "/" + prefix + "/" + postFixUrl;
  };

export const centerSortText = (text: any, maxLength: number = 20): string => {
  if (empty(text)) return "";
  text = text + "";
  if (text.length <= maxLength) return text;
  const half = Math.floor(maxLength / 2);
  return text.slice(0, half) + "......" + text.slice(-half);
};

export const toFixedDecimals = (
  value: any,
  decimals: number = 8,
): number | null | undefined => {
  if (typeof value === "object") value = Number(value);
  if (typeof value === "string") value = Number(value);
  return Number((value || 0).toFixed(decimals));
};

export const formatNumber = (
  value: any,
  decimals: number = 4,
): string | number | null | undefined => {
  value = toFixedDecimals(value, decimals);
  return value.toFixed(decimals);
};

export const formatNumberWithCommas = (
  value: any,
  decimals: number = 4,
): string => {
  const splitValue: any = formatNumber(value)?.toString().split(".");
  return (
    splitValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (splitValue?.[1] ? `.${splitValue?.[1]}` : "")
  );
};

export const maskString = (value: any, hiddenChar: any = "●"): string => {
  // ● ⬤
  return hiddenChar.repeat((value || "").toString().length);
};
