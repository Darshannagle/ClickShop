export type TLogType = "DEBUG" | "TRACE" | "RESPONSE";

export interface ILog {
  "LOG-DATA": string;
  "LOG-TAG"?: string;
}

export interface IHistoryLength {
  DEBUG: number;
  TRACE: number;
  RESPONSE: number;
}

export interface IHistory {
  DEBUG: ILog[];
  TRACE: ILog[];
  RESPONSE: ILog[];
}
