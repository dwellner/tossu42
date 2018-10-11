import programs300 from "./programs_300.json";
import programs330 from "./programs_330.json";
import programs400 from "./programs_400.json";
import programs500 from "./programs_500.json";

const unique = arr => [...new Set(arr)];

const range = (min, max) =>
  Array(max - min)
    .fill()
    .map((_, i) => i + min);

const addId = program => ({
  ...program,
  id: `${program.name.replace(/[^0-9a-ö.,]/gi, "")}_${program.weeks.length}`
});
const allPrograms = []
  .concat(programs300, programs330, programs400, programs500)
  .map(addId);

const getBestMatch = targetTime => {
  const bestMatch = allPrograms
    .map(p => ({
      program: p,
      diff: Math.abs(p.targetTime.target - targetTime)
    }))
    .reduce((a, b) => (a.diff <= b.diff ? a : b));
  return bestMatch !== null ? bestMatch.program : null;
};

const getPrograms = (targetTime, name = null, length = null) => {
  const targetTimeFilter = p =>
    p.targetTime.min <= targetTime && p.targetTime.max >= targetTime;

  const lengthFilter = p => {
    return (
      p.weeks.length === length ||
      (p.stretchRules !== undefined &&
        p.stretchRules.minWeeks <= length &&
        p.stretchRules.maxWeeks >= length)
    );
  };
  return allPrograms
    .filter(targetTimeFilter)
    .filter(p => (name != null ? p.name === name : true))
    .filter(p => (length != null ? lengthFilter(p) : true));
};

const getValidLengthsForProgram = p =>
  p.stretchRules !== undefined
    ? range(p.stretchRules.minWeeks, p.stretchRules.maxWeeks + 1)
    : [p.weeks.length];

const getProgramLengths = (targetTime, programName) =>
  unique(
    getPrograms(targetTime, programName).map(getValidLengthsForProgram)
  ).reduce((a, b) => a.concat(b), []);

const getProgramNames = targetTime =>
  unique(getPrograms(targetTime).map(p => p.name));

export default {
  getAll: () => allPrograms,
  getById: id => allPrograms.find(p => p.id === id),
  getBestMatch,
  getPrograms,
  getProgramNames,
  getProgramLengths
};
