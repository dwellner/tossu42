import DateUtils from "./DateUtils";
import ProgramService from "../data/ProgramService";

const getDayDistance = day => {
  if (day.type === "iv") return day.distance * day.repeat + 5;
  if (day.type === "lepo") return 0;
  return day.distance;
};

const getWeekDistance = week =>
  week.map(getDayDistance).reduce((a, b) => a + b);

const getIntensity = week =>
  week
    .map(day => {
      const distance = getDayDistance(day);
      if (day.type === "iv") return 2.5 * distance;
      if (day.type === "m" || day.type === "r" || day.type === "t")
        return 2 * distance;
      if (day.type === "k" || day.type === "pi" || day.type === "pe")
        return 1.5 * distance;
      if (day.type === "ve") return 0.5 * distance; 
      return distance;
    })
    .reduce((a, b) => a + b);

export default {
  getWeekProgram: (date,programId) => {
    const program = ProgramService.getById(programId);
    const programLength = program.weeks
      .map(week => week.length)
      .reduce((a, b) => a + b, 0);
    const firstDate = DateUtils.nextDate(date, programLength * -1);
    let i = 0;

    const maxWeekDistance = program.weeks
      .map(getWeekDistance)
      .reduce((a, b) => Math.max(a, b), 0);

    const maxIntensity = program.weeks
      .map(getIntensity)
      .reduce((max, w) => Math.max(max, w), 0);

    const weeks = program.weeks.map(week => {
      distance = getWeekDistance(week);
      return {
        distance,
        intensityLevel: getIntensity(week) / maxIntensity,
        distanceLevel: distance / maxWeekDistance,
        days: week.map(day => ({
          ...day,
          date: DateUtils.nextDate(firstDate, i++)
        }))
      };
    });
    return {
      targetTime: program.targetTime,
      weeks
    };
  }
};
