// Helpers
import { logError } from "./Log";
import { empty } from "./Values";

//--------------------------------------------------------------
// export const makeList = (date: Date | string | null, format: string = 'D MMM YY'): string => {
//     try {
//         return empty(date) ? '' : moment(date, 'YYYY-MM-DDTHH:mm:ss.SSS').format(format);
//     } catch(e) {
//         return '';
//     }
// }

/*export const makeList = (data: any[], keyName: string = 'id', isConvertString: boolean = false): string[] => {

    try {

        if(!data) return [];
        const newData: any[] = [];
        data.forEach((r: any) => {
            newData.push(isConvertString ? r[keyName].toString() : r[keyName]);
        });
        return newData;
    } catch(e) {
        logError(data);
        logError(e);
        return [];
    }
}*/

export const makeList = (
  dataArray: any,
  keyPath: string = "_id",
  isConvertString: boolean = false,
): any => {
  try {
    // hangarSlots.[].id

    if (!dataArray) return [];

    const traverse = (obj: any, keys: string[]): any[] => {
      if (!obj) return [];

      if (keys.length === 0) {
        return [obj];
      }

      const [current, ...rest] = keys;

      if (current === "[]") {
        if (!Array.isArray(obj)) return [];
        return obj.flatMap((item) => traverse(item, rest));
      }

      return traverse(obj[current], rest);
    };

    const keyParts = keyPath.split(".").map((k) => (k === "[]" ? "[]" : k));

    let result: any[] = [];

    dataArray.forEach((item: any) => {
      const values = traverse(item, keyParts);
      values.forEach((val) => {
        if (val !== undefined && val !== null) {
          result.push(isConvertString ? val.toString() : val);
        }
      });
    });

    return result;
  } catch (e) {
    logError(dataArray);
    logError(e);
    return [];
  }
};

export const makeUniqueList = (
  data: any[],
  keyName: string = "id",
  isConvertString: boolean = false,
): any => {
  try {
    if (!data) return [];
    const newData = new Set();
    data.forEach((r: any) => {
      newData.add(isConvertString ? r[keyName].toString() : r[keyName]);
    });

    return Array.from(newData);
  } catch (e) {
    logError(data);
    logError(e);
    return [];
  }
};

export const flipOnKey = (data: any, keyName: string = "_id"): {} => {
  if (empty(data)) return {};
  const newData: any = {};
  data.forEach((r: any) => {
    if (r) newData[r[keyName]] = r;
  });
  return newData;
};

export const sortArray = (
  array: any[],
  options: { sortKey: string; distinctKey?: string; order?: "ASC" | "DESC" },
): any[] => {
  const { sortKey, distinctKey, order = "ASC" } = options;

  let result = [...array];

  // Remove duplicates based on distinctKey
  if (distinctKey) {
    const seen = new Set<any>();
    result = result.filter((item) => {
      const key = item[distinctKey];
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Sort based on sortKey and order
  result.sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const compare = (aVal as any) > (bVal as any) ? 1 : aVal < bVal ? -1 : 0;
    return order === "ASC" ? compare : -compare;
  });

  return result;
};

export const flattenedToNestedObject = (
  rows: Record<string, any>,
  separator = ".",
): Record<string, any> => {
  return rows.map((row: any) => {
    const result: Record<string, any> = {};

    for (const key in row) {
      const value = row[key];
      const parts = key.split(separator);

      if (parts.length === 1) {
        result[key] = value;
      } else {
        let current = result;
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!current[part] || typeof current[part] !== "object") {
            current[part] = {};
          }
          current = current[part];
        }
        current[parts[parts.length - 1]] = value;
      }
    }

    return result;
  });
};

export const objectToKeyLabel = (
  obj: Record<string, any>,
): Record<string, any> => {
  return Object.entries(obj).map(([key, label]) => ({
    key,
    label,
  }));
};

export const getUnique = (array: any[]): any[] => {
  return [...new Set(array)];
};

/*
export function mergeByKey<T extends Record<string, any>>(
    primary: T[] = [],     // organization-specific (takes priority)
    base: T[] = [],        // admin default (fallback)
    matchKey: string
): T[] {
    const baseMap = new Map(base.map(item => [item[matchKey], item]));

    return [
        ...primary.map(item => {
            const fallback = baseMap.get(item[matchKey]) || {};
            return {...fallback, ...item}; // primary overrides base
        }),
        ...base.filter(item =>
            !primary.find(p => p[matchKey] === item[matchKey])
        )
    ];
}*/

export const runAllAsync = (tasks = {}) => {
  // AsyncExecutor
  // asyncProcesses
  const entries = Object.entries(tasks);

  return Promise.all(
    entries.map(async ([key, fn]) => {
      /*try {*/
      const value = typeof fn === "function" ? await fn() : await fn;
      return { key, success: true, data: value };
      /*} catch(error) {
                return {key, success: false, error};
            }*/
    }),
  ).then((results) => {
    const final: any = {};
    results.forEach((r: any) => {
      // final[r.key] = r.success ? r.data : r.error;
      final[r.key] = r.data;
    });
    return final;
  });
};
