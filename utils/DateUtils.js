import moment from "moment";

export default {
  /** curent Date is used to open the UI to the current day by default.
   *  You should overwrite this value in automated tests to prevent changing dates in tests
   */
  currentDate: () => new Date().toISOString().substr(0, 10),
  nextDate: (date, delta) =>
    moment
      .utc(date)
      .add(delta, "day")
      .toISOString()
      .substr(0, 10),
  difference: (date1, date2) =>
    moment.utc(date1).diff(moment.utc(date2), "days")
};
