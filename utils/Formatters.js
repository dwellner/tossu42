import { WeekDays } from "../constants/Texts";
import moment from "moment";
import { Platform } from "react-native";
import { padStart } from "lodash";

export const dayToDistanceUnitDesc = day => {
  if (day == null) return "";
  if (day.type === "iv") return "m";
  if (day.type === "lepo") return "";
  return "km";
};

export const dayToDistanceDesc = day => {
  if (day == null || day.distance == null) return "";
  if (day.type === "iv") return `${day.repeat}x${day.distance * 1000}`;
  return day.distance.toFixed(0);
};

const toStr = formatFn => val => (val != null ? formatFn(val) : "");
const formattedDate = (date, format) => moment.utc(date).format(format);

export const dateToDay = toStr(date => WeekDays[new Date(date).getDay()]);
export const dateToDayShort = toStr(date => dateToDay(date).substr(0, 2));
export const dateToDate = toStr(date => formattedDate(date, "D.M.YY"));
export const dateToDateShort = toStr(date => formattedDate(date, "D.M."));
export const dateToDateLong = toStr(date => formattedDate(date, "D.M.YYYY"));
export const dateToDayLabel = toStr(
  date => `${dateToDay(date)} ${dateToDateShort(date, "D.M.")}`
);
export const dateToDayLabelFull = toStr(
  date => `${dateToDay(date)} ${dateToDateLong(date)}`
);

export const dateRangetoLabel = toStr(
  ([date1, date2]) => `${dateToDate(date1)} - ${dateToDate(date2)}`
);

export const minutesToTimeLabel = mins => {
  const h = Math.trunc(mins / 60).toFixed(0);
  const m = `${mins % 60}`;
  return `${h}:${padStart(m, 2, "0")}`;
};

export const getIconName = (icon, focused) =>
  Platform.OS === "ios"
    ? `ios-${icon}${focused ? "" : "-outline"}`
    : `md-${icon}`;
