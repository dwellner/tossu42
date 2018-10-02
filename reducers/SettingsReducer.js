import { combineReducers } from "redux";
import ProgramService from "../data/ProgramService"

// TODO: remove defaults, handle undefined
const targetEvent = (
  state = { name: "Helsinki City Maraton", date: "2018-10-30" },
  action
) => {
  switch (action.type) {
    case "TARGET_EVENT_NAME_CHANGED":
      return { ...state, name: action.name };
    case "TARGET_EVENT_DATE_CHANGED":
      return { ...state, date: action.date };
    default:
      return state;
  }
};

// TODO: remove default, handle undefined
const targetTime = (state = 210, action) => {
  switch (action.type) {
    case "TARGET_TIME_CHANGED":
      return action.time;
    default:
      return state;
  }
};

// TODO: remove default, handle undefined
const programId = (state = "tossu_2018_24_400", action) => {
    console.log(action);
    switch (action.type) {
    case "PROGRAM_ID_CHANGED": 
        return action.id;
    case "TARGET_TIME_CHANGED":
      const validIds = ProgramService.getProgramsByTargetTime(action.time).map(
        p => p.id
      );
      return validIds.indexOf(state) >= 0
        ? state
        : ProgramService.getBestMatch(action.time).id;
    default:
      return state;
  }
};

// TODO: remove default, handle undefined
const maxHr = (state = 189, action) => {
  switch (action.type) {
    case "MAX_HR_CHANGED":
      return action.hr;
    default:
      return state;
  }
};

export default combineReducers({
  targetEvent,
  targetTime,
  programId,
  maxHr
});
