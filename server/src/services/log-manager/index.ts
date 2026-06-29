import fs from "fs";

// NOTE: dont include util helper function its create circular dependency error

// Others
import Config from "@config";

// Interfaces
import {
  TLogType,
  ILog,
  IHistory,
  IHistoryLength,
} from "./interface/interface";

//--------------------------------------------------------------
export default class LogManager {
  static DEFAULT_LOG_KEY: string = "UNKNOWN";
  static HISTORY_LENGTH: IHistoryLength = {
    DEBUG: 100,
    TRACE: 100000,
    RESPONSE: 100,
  };
  static HISTORY: IHistory = { DEBUG: [], TRACE: [], RESPONSE: [] };

  static addData(data: string, label: any = "", type: TLogType): ILog {
    const payload: ILog = {
      "LOG-TAG": (label + "").trim() || this.DEFAULT_LOG_KEY,
      "LOG-DATA": data,
    };
    this.HISTORY[type].push(payload);

    // check history and slice {
    const currentHistoryLength = this.HISTORY[type].length;
    if (currentHistoryLength > this.HISTORY_LENGTH[type])
      this.HISTORY[type] = this.HISTORY[type].slice(
        currentHistoryLength - this.HISTORY_LENGTH[type],
        currentHistoryLength,
      );
    // } check history and slice

    return payload;
  }

  static add(data: string, label: any = ""): ILog {
    return this.addData(data, label, "DEBUG");
  }

  static addTrace(data: string, label: any = ""): ILog {
    return this.addData(data, label, "TRACE");
  }

  static addResponse(data: string, label: any = ""): ILog {
    return this.addData(data, label, "RESPONSE");
  }

  static get(type: TLogType, tag?: string): ILog[] {
    const tagList: string[] = (tag || "").toLowerCase().split(",");
    const history = tag
      ? this.HISTORY[type].filter((h: ILog) =>
          tagList.includes((h["LOG-TAG"] || "").toLowerCase()),
        )
      : this.HISTORY[type];
    history.reverse();
    return history;
  }

  static async render(type: TLogType, tag?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        "./src/services/log-manager/template/log.html",
        "utf8",
        (err, html) => {
          if (err) return reject(err);
          const data = {
            "LOG-CONFIG": {
              baseUrl: `${Config.APP.URL}/log`,
              currentLogType: type,
              logTypes: ["DEBUG", "RESPONSE", "TRACE"],
            },
            "LOG-DATA": this.get(type, tag),
          };
          // Replace all placeholders
          Object.entries(data).forEach(([key, value]) => {
            html = html.replace(`'%=${key}=%'`, JSON.stringify(value));
          });

          resolve(html);
        },
      );
    });
  }
}
