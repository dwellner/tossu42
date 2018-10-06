import SettingsReducer from "../SettingsReducer";
import {
  targetEventNameChanged,
  targetEventDateChanged,
  targetTimeChanged,
  programNameChanged,
  programLengthChanged,
  maxHrChanged
} from "../../Actions";

describe("SettingsReducer", () => {
  const initState = SettingsReducer(undefined, {});

  const assertNewState = (expectedStateChanges, state, action = {}) => {
    const getNewState = () => {
      if (typeof action === "function") {
        let newState = state;
        const dispatch = action => {
          newState = SettingsReducer(newState, action);
        };
        const getState = () => ({ settings: newState });
        action(dispatch, getState);
        return newState;
      }
      return SettingsReducer(state, action);
    };

    const expectedState = { ...state, ...expectedStateChanges };
    expect(getNewState()).toEqual(expectedState);
  };

  it("initialState", () => {
    assertNewState(
      {
        targetEvent: { date: "2018-10-30", name: "Helsinki City Maraton" },
        maxHr: 189,
        program: {
          name: "Tossu.com 3.5 tunnin täysohjelma",
          targetTime: 210,
          length: 24
        }
      },
      undefined
    );
  });

  it("targetEventNameChanged should update TargetEventName", () => {
    assertNewState(
      { targetEvent: { ...initState.targetEvent, name: "Vantaa Fun Run" } },
      initState,
      targetEventNameChanged("Vantaa Fun Run")
    );
  });

  it("targetEventDateChanged should update TargetEventDate", () => {
    assertNewState(
      { targetEvent: { ...initState.targetEvent, date: "2020-01-01" } },
      initState,
      targetEventDateChanged("2020-01-01")
    );
  });

  it("maxHrChanged should update maxHr", () => {
    assertNewState({ maxHr: 185 }, initState, maxHrChanged(185));
  });

  it("targetTimeChanged should update targetTime", () => {
    assertNewState(
      { program: { ...initState.program, targetTime: 225 } },
      initState,
      targetTimeChanged(225)
    );
  });

  it("targetTimeChanged should update program name and length if needed", () => {
    const currentState = {
      ...initState,
      program: { ...initState.program, length: 45 }
    };

    const expectedState = {
      program: {
        targetTime: 300,
        name: "Tossu.com 5 tunnin täysohjelma",
        length: 24
      }
    };

    assertNewState(expectedState, currentState, targetTimeChanged(300));
  });

  it("targetTimeChanged should update program name to null when no valid program available", () => {
    const expectedState = {
      program: { targetTime: 60, name: null, length: null }
    };

    assertNewState(expectedState, initState, targetTimeChanged(60));
  });

  it("programNameChanged should update programName and length", () => {
    assertNewState(
      {
        program: {
          ...initState.program,
          name: "Tossu.com 3.5 tunnin väliohjelma",
          length: 8
        }
      },
      initState,
      programNameChanged("Tossu.com 3.5 tunnin väliohjelma")
    );
  });

  it("programNameChanged should update length to closest match", () => {
    const currentState = {
      ...initState,
      program: { ...initState.program, length: 3 }
    };

    assertNewState(
      {
        program: {
          ...initState.program,
          name: "Tossu.com 3.5 tunnin väliohjelma",
          length: 4
        }
      },
      currentState,
      programNameChanged("Tossu.com 3.5 tunnin väliohjelma")
    );
  });

  it("programLengthChanged should update program length", () => {
    assertNewState(
      {
        program: {
          ...initState.program,
          length: 27
        }
      },
      initState,
      programLengthChanged(27)
    );
  });
});
