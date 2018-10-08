import Texts from "../constants/Texts";

const getPaceGoal = targetTime => {
  const getPace = pct => {
    const pace = (targetTime / 42.2) * pct;
    const hours = Math.trunc(pace);
    const minutes = `${Math.round((pace * 60) % 60)}`.padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  return `⏱  ${getPace(0.95)} - ${getPace(1.05)}`;
};

const getHeartRateGoal = (maxHr, low, high) => {
  if (maxHr == null) return "";
  const getHrPct = pct => Math.round(maxHr * pct);
  return `❤ ${getHrPct(low)} - ${getHrPct(high)} bpm`;
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
      return `${Texts.labels.ivLeg} ${getHeartRateGoal(maxHr, 0.75, 0.9)}`;
    case "k":
      return getPaceGoal(targetTime);
    case "m":
      return Texts.labels.goGirl;
    case "r":
      return Texts.labels.race;
    case "ve":
      return Texts.labels.lightExercise;
    default:
      return Texts.labels.takeItEasy;
  }
};

export default {
  getTargetMetricsGoals
};
