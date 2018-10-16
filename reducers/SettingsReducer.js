import { combineReducers } from "redux";
import { ActionTypes } from "../Actions";
import ProgramReducer from "./ProgramReducer";

const targetEvent = (state = { name: null, date: "2019-01-01" }, action) => {
  switch (action.type) {
    case ActionTypes.targetEventNameChanged:
      return { ...state, name: action.name };
    case ActionTypes.targetEventDateChanged:
      return { ...state, date: action.date };
    default:
      return state;
  }
};

const maxHr = (state = 185, action) => {
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
