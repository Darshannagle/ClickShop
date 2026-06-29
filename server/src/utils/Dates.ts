import moment, { Moment } from "moment";

// Helpers
import { empty, getNum } from "./Values";

// Others
import Constant from "@config/Constant";

//--------------------------------------------------------------
export const getDate = (
  date: Date | string | null | Moment,
  format: string = Constant.DATE_FORMATS.DATE,
): string => {
  try {
    return empty(date)
      ? ""
      : moment(date, "YYYY-MM-DDTHH:mm:ss.SSS").toISOString();
  } catch (e) {
    return "";
  }
};

export const formatDate = (
  date: Date | string | null | Moment,
  format: string = Constant.DATE_FORMATS.DATE,
): string => {
  try {
    return empty(date)
      ? ""
      : moment(date, "YYYY-MM-DDTHH:mm:ss.SSS").format(format);
  } catch (e) {
    return "";
  }
};

export const formatDateTime = (
  date: Date | string | null | Moment,
  format: string = `${Constant.DATE_FORMATS.DATE} ${Constant.DATE_FORMATS.TIME}`,
): string => {
  try {
    return empty(date)
      ? ""
      : moment(date, "YYYY-MM-DDTHH:mm:ss.SSS").format(format);
  } catch (e) {
    return "";
  }
};

export const timeSince = (date: Date | string | null): string => {
  try {
    return empty(date) ? "" : moment(date, "YYYY-MM-DDTHH:mm:ss.SSS").fromNow();
  } catch (e) {
    return "";
  }
};

export const formatDuration = (date: Date | string | null): string => {
  const duration = moment.duration(moment().diff(moment(date)));

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

export const convertToDate = (timestamp: any): Date | string => {
  try {
    if (!isNaN(timestamp) && timestamp.length === 10) {
      return new Date(parseInt(timestamp) * 1000);
    } else {
      return new Date(timestamp);
    }
  } catch (e) {
    return "";
  }
};

export const startOfDay = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).startOf("day");
  } catch (e) {
    return "";
  }
};

export const endOfDay = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).endOf("day");
  } catch (e) {
    return "";
  }
};

export const startOfMonth = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).startOf("month");
  } catch (e) {
    return "";
  }
};

export const endOfMonth = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).endOf("month");
  } catch (e) {
    return "";
  }
};

export const startOfWeek = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).startOf("week");
  } catch (e) {
    return "";
  }
};

export const endOfWeek = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).endOf("week");
  } catch (e) {
    return "";
  }
};

export const startOfPrevDay = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).subtract(1, "day").startOf("day");
  } catch (e) {
    return "";
  }
};

export const endOfPrevDay = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).subtract(1, "day").endOf("day");
  } catch (e) {
    return "";
  }
};

export const startOfPrevMonth = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date)
      ? ""
      : moment(date).subtract(1, "month").startOf("month");
  } catch (e) {
    return "";
  }
};

export const endOfPrevWeek = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).subtract(1, "week").endOf("week");
  } catch (e) {
    return "";
  }
};

export const startOfPrevWeek = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).subtract(1, "week").startOf("week");
  } catch (e) {
    return "";
  }
};

export const endOfPrevMonth = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).subtract(1, "month").endOf("month");
  } catch (e) {
    return "";
  }
};

export const startOfNextDay = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).add(1, "day").startOf("day");
  } catch (e) {
    return "";
  }
};

export const endOfNextDay = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).add(1, "day").endOf("day");
  } catch (e) {
    return "";
  }
};

export const startOfNextMonth = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).add(1, "month").startOf("month");
  } catch (e) {
    return "";
  }
};

export const endOfNextMonth = (
  date: Date | string | null | Moment = new Date(),
): any => {
  try {
    return empty(date) ? "" : moment(date).add(1, "month").endOf("month");
  } catch (e) {
    return "";
  }
};

export function getExpiryDatetime(
  label: string,
  eod = false,
  base: moment.MomentInput = moment(),
): Date {
  const match = /^(\d+)([smhd])$/i.exec(label.trim());
  if (!match) throw new Error(`Invalid duration label: ${label}`);

  const [_, value, unit] = match;
  let expiry = moment(base).add(
    Number(value),
    unit as moment.unitOfTime.DurationConstructor,
  );

  if (eod) expiry = expiry.endOf("day");

  return expiry.toDate();
}

export const isDateExpired = (date: Date | string): boolean => {
  if (!date) return true;
  return moment(date).isBefore(moment());
};

export const isFutureDate = (
  date: Date | string | Moment,
  fromDate?: Date | string | Moment,
): boolean => {
  if (!date) return false;
  const compareTo = fromDate ? moment(fromDate) : moment();
  return moment(date).isAfter(compareTo);
};
