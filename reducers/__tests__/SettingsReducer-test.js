import SettingsReducer from "../SettingsReducer";
import {
  targetEventNameChanged,
  targetEventDateChanged,
  targetTimeChanged,
  programIdChanged,
  maxHrChanged
} from "../../Actions";

describe("SettingsReducer", () => {
  const initState = SettingsReducer(undefined, {});

  const assertNewState = (expectedStateChanges, state, action = {}) => {
    const expectedState = { ...state, ...expectedStateChanges };
    const newState = SettingsReducer(state, action);
    expect(newState).toEqual(expectedState);
  };

  it("initialState", () => {
    assertNewState(
      {
        maxHr: 189,
        programId: "tossu_2018_24_400",
        targetEvent: { date: "2018-10-30", name: "Helsinki City Maraton" },
        targetTime: 210
      },
      undefined
    );
  });

  it("targetEventNameChanged should update TargetTime", () => {
    assertNewState(
      { targetEvent: { ...initState.targetEvent, name: "Vantaa Fun Run" } },
      initState,
      targetEventNameChanged("Vantaa Fun Run")
    );
  });

  it("targetEventDateChanged should update TargetTime", () => {
    assertNewState(
      { targetEvent: { ...initState.targetEvent, date: "2020-01-01" } },
      initState,
      targetEventDateChanged("2020-01-01")
    );
  });

  it("targetTimeChanged should update TargetTime", () => {
    assertNewState({ targetTime: 225 }, initState, targetTimeChanged(225));
  });

  it("programIdChanged should update ProgramId", () => {
    assertNewState(
      { programId: "tossu_2018_24_300" },
      initState,
      programIdChanged("tossu_2018_24_300")
    );
  });

  it("targetTimeChanged should update ProgramId when current programId is not valid for new targetTime", () => {
    assertNewState(
      { targetTime: 300, programId: "tossu_2018_24_500" },
      initState,
      targetTimeChanged(300)
    );
  });
  it("maxHrChanged should update TargetTime", () => {
    assertNewState({ maxHr: 185 }, initState, maxHrChanged(185));
  });
});
