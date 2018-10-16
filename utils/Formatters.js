import Texts from "../constants/Texts";
import moment from "moment";

export const dayToDistanceDesc = day => {
  if (day.type === "iv") return `${day.repeat}x${day.distance * 1000}m`;
  if (day.type === "lepo") return " ";
  return `${day.distance} km`;
};

export const dateToDayLabelShort = date => {
  const dayLabel = Texts.weekDays[new Date(date).getDay()];
  return dayLabel.substr(0, 2);
};

export const dateToDayLabel = date => {
  const d = new Date(date);
  const dayLabel = Texts.weekDays[d.getDay()];
  return `${dayLabel} ${d.getDate()}.${d.getMonth() + 1}.`;
};

export const dateToDateLabel = date => {
  return date != null ? moment.utc(date).format("D.M.YY") : "";
};

export const dateRangetoLabel = (date1, date2) => {
  const d1 = moment.utc(date1);
  const d2 = moment.utc(date2);

  return `${d1.format("D.M.")} - ${d2.format("D.M.YY")}`;
};

export const minutesToTimeLabel = mins => {
  const h = Math.trunc(mins / 60).toFixed(0);
  const m = `${mins % 60}`.padStart(2, "0");
  return `${h}:${m}`;
};

export const dayToTypeDesc = day => Texts.runTypes[day.type];
export const dayToTypeDescShort = day => Texts.runTypesShort[day.type];
