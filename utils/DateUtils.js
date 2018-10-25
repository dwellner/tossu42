import moment from "moment";

/** curent Date is used to open the UI to the current day by default.
 *  You should overwrite this value in automated tests to prevent changing dates in tests
 */

const currentDate = () => new Date().toISOString().substr(0, 10);

export const nextDate = (date, delta) =>
  moment
    .utc(date)
    .add(delta, "day")
    .toISOString()
    .substr(0, 10);

export const difference = (date1, date2) =>
  moment.utc(date1).diff(moment.utc(date2), "days");

export const getValidDate = (weekProgram = null, date = currentDate()) => {
  if (weekProgram != null) {
    const weeks = weekProgram.weeks;
    const firstDate = weeks[0].days[0].date;
    if (firstDate > date) return firstDate;

    const lastDate = weeks[weeks.length - 1].days[6].date;
    if (lastDate < date) return lastDate;
  }
  return date;
};

export default {
  currentDate,
  nextDate,
  difference,
  getValidDate
};
