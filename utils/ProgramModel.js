import DateUtils from "./DateUtils";
import ProgramService from "../data/ProgramService";

const getIVTotalDistance = (ivDistance, repeats) => {
  const warmup = 2,
    coolDown = 1,
    recovery = 0.4;
  return warmup + (ivDistance + recovery) * repeats + coolDown;
};

const getDayDistance = day => {
  if (day.type === "iv") return getIVTotalDistance(day.distance, day.repeat);
  if (day.type === "lepo") return 0;
  return day.distance;
};

const getWeekDistance = week =>
  week.map(getDayDistance).reduce((a, b) => a + b);

const getStretchedProgramStart = (program, programLength, totalLength) => {
  let repeats = [];

  const stretchLengthInWeeks = Math.ceil(totalLength - programLength);
  const repeatBlock = program.weeks.slice(0, program.stretchRules.repeat);
  const numberOfRepeatBlocks = Math.ceil(
    stretchLengthInWeeks / repeatBlock.length
  );
  for (i = 0; i < numberOfRepeatBlocks; i++) {
    repeats = repeats.concat(repeatBlock.map(days => [].concat(days)));
  }
  const excessWeeks = repeats.length - stretchLengthInWeeks;
  return repeats.slice(excessWeeks);
};

const getProgramWeeks = (program, length) => {
  const programLength = program.weeks.length;

  if (length === programLength || program.stretchRules === undefined) {
    return program.weeks;
  }

  if (length > programLength) {
    const stretchedStart = getStretchedProgramStart(
      program,
      programLength,
      length
    );
    return [].concat(stretchedStart, program.weeks);
  }

  // TODO: check total length is within program range, or return mimimum
  return []; // TODO: handle shrinking
};

export default {
  getWeekProgram: (targetDate, { targetTime, name, length }) => {
    if (targetDate === null) return null;

    const programs = ProgramService.getPrograms(targetTime, name, length);
    if (programs.length === 0) return null;
    const program = programs[0];

    const programWeeks = getProgramWeeks(program, length);
    const firstDate = DateUtils.nextDate(
      targetDate,
      programWeeks.length * -7 + 1
    );

    let i = 0;
    const weeks = programWeeks.map((week, index) => {
      const weekNumber = programWeeks.length - index;
      const distance = getWeekDistance(week);
      const days = week.map(day => ({
        ...day,
        date: DateUtils.nextDate(firstDate, i++)
      }));
      return { weekNumber, distance, days };
    });
    return { weeks };
  }
};
