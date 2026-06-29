// Helpers
// import {logError} from './log';

//--------------------------------------------------------------
import { empty } from "@utils/Values";

export const throwInvalidData = (message?: string): void => {
  throw message ?? "Throw Invalid Data";
};

/*export const getError = (e: any, label?: string): string => {
    let errorMsg = `An error occurred: Unknown Custom Error :(`;

    if(typeof e === 'string') errorMsg = e;
    if(typeof e.message === 'string') errorMsg = e.message;

    if(label) errorMsg = `${label} ${errorMsg}`;
    // logError(errorMsg)
    return errorMsg;

}
*/

export const isQueryError = (result: any): boolean => {
  return result === null;
};

export const getError = (
  e: any,
  label?: string,
  isObject: boolean = false,
): string => {
  if (!e) return "";

  let errorMsg = `An error occurred: Unknown Error :(`;

  if (typeof e === "string") {
    errorMsg = e;
  } else if (e.codeName && typeof e.codeName === "string") {
    errorMsg = `${e.code ? e.code + ": " : ""}${e.codeName}`;
  } else if (typeof e.message === "string") {
    errorMsg = `${e.code ? e.code + ": " : ""}${e.message}`;
  } else if (typeof e.error === "string") {
    errorMsg = e.error;
    // errorMsg = `${e.errorKey ? e.errorKey + ': ' : ''}${e.error}`;
  } else if (typeof e === "object") {
    if (isObject) errorMsg = e.errors;
    else errorMsg = e.error;
  }

  if (label && typeof errorMsg === "string")
    errorMsg = `${label.trim()} ${errorMsg}`;
  return errorMsg;
};

export const extractErrorLog = (fullError: any) => {
  if (empty(fullError) || typeof fullError !== "string") return {};
  // Extract flows inside []
  const flowMatches = [...fullError.matchAll(/\[(.*?)\]/g)];
  const executionTrace = flowMatches.map((m) => m[1]);

  // Remove all [FLOW] - parts from beginning
  let cleaned = fullError.replace(/(\[.*?\]\s*-\s*)+/g, "");

  const error = cleaned.trim();
  if (empty(executionTrace)) return {};

  return {
    message: error,
    error,
    executionTrace,
    details: `${executionTrace.join(" → ")}${!empty(executionTrace) ? " :: " : ""}${error}`,
  };
};
