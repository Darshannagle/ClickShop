// Helpers
// import {d, empty, toFixedDecimals} from '@utils';

//--------------------------------------------------------------
export default class Normalizer {
  static lower(data: string | null | undefined): string {
    return (data || "").trim().toLowerCase();
  }

  static deepCleanToPlainObject(input: any, seen = new WeakSet()): any {
    if (input === null || typeof input !== "object") return input;
    if (input instanceof Date) return input; // ← fix: keep Date as-is

    if (seen.has(input)) return undefined;
    seen.add(input);

    const raw = input.toJSON ? input.toJSON() : input;
    const cleaned: any = Array.isArray(raw) ? [] : {};

    for (const key in raw) {
      if (!Object.prototype.hasOwnProperty.call(raw, key)) continue;
      const value = raw[key];

      if (value === undefined) continue;

      cleaned[key] = this.deepCleanToPlainObject(value, seen);
    }

    return cleaned;
  }

  /*static lower(data: string | null | undefined): null {
        return data ? data.trim().toLowerCase() : data;
    }*/

  /*static numberFormat(data: any): string | null{
        return data;
        // return !empty(data) ? toFixedDecimals(data) : data;
    }*/
}
