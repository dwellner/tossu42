import Texts from "../constants/Texts";

const getTargetMetricsGoals = (day, maxHr, targetTime) => {
    const getHrPct = pct => Math.round(maxHr * pct);
    const getPace = nr => {
      const hours = Math.trunc(nr);
      const minutes = `${Math.round((nr * 60) % 60)}`.padStart(2, "0");
      return `${hours}:${minutes}`;
    };
  
    if (day.type === "pa") return `❤ ${getHrPct(0.55)} - ${getHrPct(0.7)} bpm`;
    if (day.type === "pe") return `❤ ${getHrPct(0.6)} - ${getHrPct(0.75)} bpm`;
    if (day.type === "t") return `❤ ${getHrPct(0.75)} - ${getHrPct(0.9)} bpm`;
    if (day.type === "iv")
      return `${Texts.labels.ivLeg} ❤ ${getHrPct(0.9)} - ${getHrPct(1)} bpm`;
    if (day.type === "m") return Texts.labels.goGirl;
    if (day.type === "k")
      return `⏱  ${getPace((targetTime / 42.2) * 0.9)} - ${getPace(
        targetTime / 42.2
      )}`;
    if (day.type === "r") return "🏁🏁🏁 GO! 🏁🏁🏁";
    return Texts.labels.takeItEasy;
  };

  export default {
      getTargetMetricsGoals
  }