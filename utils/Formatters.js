import { WeekDays } from "../constants/Texts";
import moment from "moment";
import { Platform } from "react-native";
import { padStart } from "lodash";

export const dayToDistanceUnitDesc = day => {
  if (day.type === "iv") return "m";
  if (day.type === "lepo") return "";
  return "km";
};

export const dayToDistanceDesc = day => {
  if (day.type === "iv") return `${day.repeat}x${day.distance * 1000}`;
  if (day.type === "lepo") return "";
  return day.distance.toFixed(0);
};

export const formattedDate = (date, format) => moment.utc(date).format(format);

export const dateToDayName = date => WeekDays[new Date(date).getDay()];

export const dateToDayLabelShort = date =>
  date != null ? dateToDayName(date).substr(0, 2) : "";

export const dateToDayLabel = date =>
  date != null ? `${dateToDayName(date)} ${formattedDate(date, "D.M.")}` : "";

export const dateToDayLabelFull = date =>
  date != null
    ? `${dateToDayName(date)} ${formattedDate(date, "D.M.YYYY")}`
    : "";

export const dateToDateLabel = date => {
  return date != null ? moment.utc(date).format("D.M.YY") : "";
};

export const dateRangetoLabel = (date1, date2) =>
  `${formattedDate(d1, "D.M.")} - ${formattedDate(d2, "D.M.YY")}`;

export const minutesToTimeLabel = mins => {
  const h = Math.trunc(mins / 60).toFixed(0);
  const m = `${mins % 60}`;
  return `${h}:${padStart(m, 2, "0")}`;
};

export const getIconName = (icon, focused) =>
  Platform.OS === "ios"
    ? `ios-${icon}${focused ? "" : "-outline"}`
    : `md-${icon}`;
