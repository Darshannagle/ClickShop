import moment from "moment";

// Helpers
import LogManager from "@services/log-manager";

//--------------------------------------------------------------
const logStyle: any = {
  Reset: "\x1b[0m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  FgBrightBlack: "\x1b[90m",
  FgBrightRed: "\x1b[91m",
  FgBrightGreen: "\x1b[92m",
  FgBrightYellow: "\x1b[93m",
  FgBrightBlue: "\x1b[94m",
  FgBrightMagenta: "\x1b[95m",
  FgBrightCyan: "\x1b[96m",
  FgBrightWhite: "\x1b[97m",
};

const isDate = (value: any) => {
  if (moment.isMoment(value)) return value.isValid();

  if (value instanceof Date) return !isNaN(value.getTime());

  return false;
};

const colorizeByType = (
  value: any,
  depth: number = 0,
  tabSize: number = 2,
): string => {
  const indent = " ".repeat(depth * tabSize);
  const nextIndent = " ".repeat((depth + 1) * tabSize);

  if (typeof value === "string")
    return `${logStyle.FgGreen}'${value}'${logStyle.Reset}`;
  if (typeof value === "number")
    return `${logStyle.FgYellow}${value}${logStyle.Reset}`;
  if (typeof value === "boolean")
    return `${logStyle.FgMagenta}${value}${logStyle.Reset}`;
  if (isDate(value))
    return `${logStyle.FgMagenta}${value.toISOString()}${logStyle.Reset}`;
  // if(isDate(value)) return value;

  if (typeof value === "object" && value !== null) {
    // Handle Arrays with brackets
    if (Array.isArray(value)) {
      if (value.length === 0) return "[]";
      return `[\n${value.map((item) => `${nextIndent}${colorizeByType(item, depth + 1, tabSize)}`).join(",\n")}\n${indent}]`;
    }

    // Handle Objects with curly braces
    const entries = Object.entries(value)
      .map(([key, val]) => {
        return `${nextIndent}${logStyle.FgWhite}${key}${logStyle.Reset}: ${colorizeByType(val, depth + 1, tabSize)}`;
      })
      .join(",\n");

    return `{\n${entries}\n${indent}}`;
  }

  return `${logStyle.FgRed}${value}${logStyle.Reset}`;
};

const logMasterNested = (type: string, data: any, flag?: any): void => {
  if (type === "TRACE") LogManager.addTrace(data, flag);
  else LogManager.add(data, flag);

  const label = flag
    ? `${logStyle.FgCyan}----- ${flag} -----${logStyle.Reset}`
    : "";
  console.log(`${label}\n${colorizeByType(data)}\n`);
  console.log();
};

const logMaster = (type: string, data: any, flag?: any): void => {
  if (type === "TRACE") LogManager.addTrace(data, flag);
  else LogManager.add(data, flag);

  if (flag) console.log(logStyle.FgCyan, `----- ${flag} -----`, logStyle.Reset);
  console.log(logStyle.FgWhite, data, logStyle.Reset);
  console.log();
};

export const d = (data: any, flag?: any): void => {
  logMaster("DEBUG", data, flag);
};

export const logTrace = (data: any, flag?: any): void => {
  logMasterNested("TRACE", data, flag);
};

export const logResponse = (data: any, flag?: any): void => {
  LogManager.addResponse(data, flag);
  // logMasterNested('RESPONSE', data, flag);
};

export const logStringify = (data: any, flag?: any): void => {
  logMaster(JSON.stringify(data), flag);
};

export const logSuccess = (data: any, flag?: any): void => {
  if (flag) console.log(logStyle.FgCyan, `----- ${flag} -----`, logStyle.Reset);
  console.log(logStyle.FgGreen, data, logStyle.Reset);
};

export const logInfo = (data: any, flag?: any): void => {
  if (flag) console.log(logStyle.FgCyan, `----- ${flag} -----`, logStyle.Reset);
  console.log(logStyle.FgCyan, data, logStyle.Reset);
};

export const logWarn = (data: any, flag?: any): void => {
  if (flag) console.log(logStyle.FgCyan, `----- ${flag} -----`, logStyle.Reset);
  console.log(logStyle.FgYellow, data, logStyle.Reset);
};

export const logError = (data: any, flag?: any): void => {
  if (flag) console.log(logStyle.FgCyan, `----- ${flag} -----`, logStyle.Reset);
  console.log(logStyle.FgRed, data, logStyle.Reset);
};

export const logState = (data: any, flag?: any): void => {
  if (flag)
    console.log(logStyle.FgMagenta, `----- ${flag} -----`, logStyle.Reset);
  console.log(logStyle.FgRed, data, logStyle.Reset);
};

export const logTable = (data: any, flag?: any): void => {
  if (flag)
    console.log(logStyle.FgMagenta, `----- ${flag} -----`, logStyle.Reset);
  console.table(data);
};
