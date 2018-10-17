import Texts from "../constants/Texts";
import moment from "moment";
import { Platform } from "react-native";

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

export const dateToDayName = date => Texts.weekDays[new Date(date).getDay()];

export const dateToDayLabelShort = date => dateToDayName(date).substr(0, 2);

export const dateToDayLabel = date =>
  `${dateToDayName(date)} ${formattedDate(date, "D.M.")}`;

export const dateToDayLabelFull = date =>
  `${dateToDayName(date)} ${formattedDate(date, "D.M.YYYY")}`;

export const dateToDateLabel = date => {
  return date != null ? moment.utc(date).format("D.M.YY") : "";
};

export const dateRangetoLabel = (date1, date2) =>
  `${formattedDate(d1, "D.M.")} - ${formattedDate(d2, "D.M.YY")}`;

export const minutesToTimeLabel = mins => {
  const h = Math.trunc(mins / 60).toFixed(0);
  const m = `${mins % 60}`.padStart(2, "0");
  return `${h}:${m}`;
};

export const getIconName = (icon, focused) =>
  Platform.OS === "ios"
    ? `ios-${icon}${focused ? "" : "-outline"}`
    : `md-${icon}`;

export const dayToTypeDesc = day => Texts.runTypes[day.type];
export const dayToTypeDescShort = day => Texts.runTypesShort[day.type];
