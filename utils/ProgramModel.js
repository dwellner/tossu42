import DateUtils from "./DateUtils";
import programs from "../data/programs.json"



// TODO: select program in settings, maybe even adapt to target format
const selectedProgram = programs[0];

export default {
  getWeekProgram: date => {
    const programLength = selectedProgram.weeks
      .map(week => week.length)
      .reduce((a, b) => a + b, 0);
    const firstDate = DateUtils.nextDate(date, programLength * -1);
    let i = 0;
    return selectedProgram.weeks.map(week =>
      week.map(day => ({ ...day, date: DateUtils.nextDate(firstDate, i++) }))
    );
  }
};
