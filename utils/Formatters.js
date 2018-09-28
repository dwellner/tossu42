import Texts from "../constants/Texts" 

const dayToDistanceDesc = day => {
    if (day.type === "iv")
        return `${day.repeat}x${day.distance * 1000}m`;
    if (day.type === "lepo")
        return "🛏";
  return `${day.distance} km`;
};

const dateToDayLabelShort = date => {
    const dayLabel = Texts.weekDays[new Date(date).getDay()];
    return dayLabel.substr(0,2);
}

const dateToDayLabel = date => {
    const d = new Date(date);
    const dayLabel = Texts.weekDays[d.getDay()];
    return `${dayLabel} ${d.getDate()}.${d.getMonth()+1}.`
}

const dateToDateLabel = date => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`
}


export default {
  dayToDistanceDesc,
  dayToTypeDesc: day => Texts.runTypes[day.type],
  dayToTypeDescShort:  day => Texts.runTypesShort[day.type],

  dateToDayLabel,
  dateToDayLabelShort,
  dateToDateLabel,
};
