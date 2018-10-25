import { padStart } from "lodash";

const getPace = (targetTime, pct) => {
  const pace = (targetTime / 42.2) * pct;
  const hours = Math.trunc(pace);
  const minutes = `${Math.round((pace * 60) % 60)}`;
  return `${hours}:${padStart(minutes, 2, "0")}`;
};

const getPaceGoal = targetTime => {
  return `${getPace(targetTime, 0.95)} - ${getPace(targetTime, 1.05)} min/km`;
};

const getRaceGoal = targetTime => {
  return `<= ${getPace(targetTime, 1)} min/km`;
};

const getHeartRateGoal = (maxHr, low, high) => {
  if (maxHr == null) return "";
  const getHrPct = pct => Math.round(maxHr * pct);
  return `${getHrPct(low)} - ${getHrPct(high)} bpm`;
};

const getTargetMetricsGoals = (day, maxHr, targetTime) => {
  switch (day.type) {
    case "pa":
      return getHeartRateGoal(maxHr, 0.55, 0.7);
    case "pi":
      return getHeartRateGoal(maxHr, 0.55, 0.72);
    case "pe":
      return getHeartRateGoal(maxHr, 0.6, 0.75);
    case "t":
      return getHeartRateGoal(maxHr, 0.75, 0.9);
    case "iv":
      return `${getHeartRateGoal(maxHr, 0.75, 0.9)}`;
    case "k":
      return getPaceGoal(targetTime);
    case "r":
      return getRaceGoal(targetTime);
    default:
      return null;
  }
};

export default {
  getTargetMetricsGoals
};
