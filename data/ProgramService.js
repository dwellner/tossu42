import programs300 from "./programs_300.json";
import programs330 from "./programs_330.json";
import programs400 from "./programs_400.json";
import programs500 from "./programs_500.json";

const allPrograms = [].concat(
  programs300,
  programs330,
  programs400,
  programs500
);

// TODO: also consider time range
const getBestMatch = targetTime =>
  allPrograms
    .map(p => ({ id: p.id, diff: Math.abs(p.targetTime - targetTime) }))
    .reduce((a, b) => (a.diff < b.diff ? a : b));

/** returns programs which targetTime is within 30 mins of provedided target time */
const getProgramsByTargetTime = targetTime =>
allPrograms.filter(
    p => p.targetTime >= targetTime - 30 && p.targetTime <= targetTime + 30
  );

export default {
  getAll: () => allPrograms,
  getById: id => allPrograms.find(p => p.id === id),
  getBestMatch,
  getProgramsByTargetTime
};
