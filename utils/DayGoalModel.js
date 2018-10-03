import Texts from "../constants/Texts";

const getPace = nr => {
  const hours = Math.trunc(nr);
  const minutes = `${Math.round((nr * 60) % 60)}`.padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getTargetMetricsGoals = (day, maxHr, targetTime) => {
  const getHrPct = pct => Math.round(maxHr * pct);
  switch (day.type) {
    case "pa":
      return `❤ ${getHrPct(0.55)} - ${getHrPct(0.7)} bpm`;
    case "pi":
      return `❤ ${getHrPct(0.55) - 5} - ${getHrPct(0.75) - 5} bpm`;
    case "pe":
      return `❤ ${getHrPct(0.55)} - ${getHrPct(0.75)} bpm`;
    case "t":
      return `❤ ${getHrPct(0.75)} - ${getHrPct(0.9)} bpm`;
    case "iv":
      return `${Texts.labels.ivLeg} ❤ ${getHrPct(0.9)} - ${getHrPct(1)} bpm`;
    case "m":
      return Texts.labels.goGirl;
    case "k":
      return `⏱  ${getPace((targetTime / 42.2) * 0.9)} - ${getPace(
        targetTime / 42.2
      )}`;
    case "r":
      return "🏁🏁🏁 GO! 🏁🏁🏁";
    case "ve":
      return "Kevyt liikunta tai kuntosali";
    default:
      return Texts.labels.takeItEasy;
  }
};

export default {
  getTargetMetricsGoals
};
