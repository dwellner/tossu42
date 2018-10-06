import { combineReducers } from "redux";
import { ActionTypes } from "../Actions";
import ProgramReducer from "./ProgramReducer"

// TODO: remove defaults, handle undefined
const defaultHr = 189;
const defaultEventName = "Helsinki City Maraton";
const defaultEventDate = "2018-10-30";

const targetEvent = (
  state = { name: defaultEventName, date: defaultEventDate },
  action
) => {
  switch (action.type) {
    case ActionTypes.targetEventNameChanged:
      return { ...state, name: action.name };
    case ActionTypes.targetEventDateChanged:
      return { ...state, date: action.date };
    default:
      return state;
  }
};

const maxHr = (state = defaultHr, action) => {
  switch (action.type) {
    case ActionTypes.maxHrChanged:
      return action.hr;
    default:
      return state;
  }
};

export default combineReducers({
  targetEvent,
  program: ProgramReducer,
  maxHr
});