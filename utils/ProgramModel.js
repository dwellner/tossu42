import DateUtils from "./DateUtils";
import programs from "../data/programs.json";

// TODO: select program in settings, maybe even adapt to target format
const selectedProgram = programs[0];

const getDayDistance = day => day.type === "iv" ? (day.distance * day.repeat) + 5 : day.distance;

const getWeekDistance = week => week.map(getDayDistance).reduce((a,b)=> a+b);

const getIntensity = week =>
  week
    .map(day => {
      if (day.type === "iv") return 2.5 * getDayDistance(day);
      if (day.type === "m" || day.type === "r" || day.type === "t")
        return 2 * getDayDistance(day);
      if (day.type === "k" || day.type === "pi" || day.type === "pe")
        return 1.5 * getDayDistance(day);
      return getDayDistance(day);
    })
    .reduce((a, b) => a + b);

export default {
  getWeekProgram: date => {
    const programLength = selectedProgram.weeks
      .map(week => week.length)
      .reduce((a, b) => a + b, 0);
    const firstDate = DateUtils.nextDate(date, programLength * -1);
    let i = 0;

    const maxWeekDistance = selectedProgram.weeks
    .map(getWeekDistance)
    .reduce((a,b) => Math.max(a,b),0);

    const maxIntensity = selectedProgram.weeks
      .map(getIntensity)
      .reduce((max, w) => Math.max(max, w), 0);

    return selectedProgram.weeks.map(week => ({
      intensityLevel: getIntensity(week) / maxIntensity,
      distanceLevel: getWeekDistance(week) / maxWeekDistance,
      days: week.map(day => ({
        ...day,
        date: DateUtils.nextDate(firstDate, i++)
      }))
    }));
  }
};
