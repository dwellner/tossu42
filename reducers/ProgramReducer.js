import ProgramService from "../data/ProgramService";
import { ActionTypes } from "../Actions";

// TODO: remove defaults, handle undefined
const defaultTargetTime = 210;
const defaultProgram = ProgramService.getBestMatch(defaultTargetTime);

const getValidProgramName = (targetTime, currentName) => {
  const validProgramNames = ProgramService.getPrograms(targetTime).map(
    p => p.name
  );
  if (validProgramNames.length === 0) return null;
  return validProgramNames.indexOf(currentName) >= 0
    ? currentName
    : validProgramNames[0];
};

const getValidProgramLength = (targetTime, name, currentLength) => {
  const validLengths = ProgramService.getPrograms(targetTime, name).map(
    p => p.weeks.length
  );
  if (validLengths.length === 0) return null;
  return validLengths.indexOf(currentLength) >= 0
    ? currentLength
    : validLengths
        .map(length => ({ length, diff: Math.abs(length - currentLength) }))
        .reduce((a, b) => (a.diff <= b.diff ? a : b)).length;
};

const targetTimeUpdated = (newTargetTime, state) => {
  const newName = getValidProgramName(newTargetTime, state.name);
  const newLength = getValidProgramLength(newTargetTime, newName, state.length);
  return {
    targetTime: newTargetTime,
    name: newName,
    length: newLength
  };
};

const programNameUpdated = (newName, state) => {
  const newLength = getValidProgramLength(
    state.targetTime,
    newName,
    state.length
  );
  return { ...state, name: newName, length: newLength };
};

export default ProgramReducer = (
  state = {
    targetTime: defaultTargetTime,
    name: defaultProgram.name,
    length: defaultProgram.weeks.length
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.targetTimeChanged:
      return targetTimeUpdated(action.time, state);
    case ActionTypes.programNameChanged:
      return programNameUpdated(action.name, state);
    case ActionTypes.programLengthChanged:
      return { ...state, length: action.length };
    default:
      return state;
  }
};
