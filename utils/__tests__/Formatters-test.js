import {
  dayToDistanceUnitDesc,
  dayToDistanceDesc,
  dateToDay,
  dateToDayShort,
  dateRangetoLabel,
  minutesToTimeLabel
} from "../Formatters";

describe("Formatters", () => {
  it("dayToDistanceUnitDesc", () => {
    expect(dayToDistanceUnitDesc({ type: "iv" })).toEqual("m");
    expect(dayToDistanceUnitDesc({ type: "lepo" })).toEqual("");
    expect(dayToDistanceUnitDesc({ type: "pe" })).toEqual("km");
    expect(dayToDistanceUnitDesc()).toEqual("");
  });

  it("dayToDistanceDesc", () => {
    expect(dayToDistanceDesc({ repeat: 2, distance: 0.6, type: "iv" })).toEqual(
      "2x600"
    );
    expect(dayToDistanceDesc({ type: "lepo" })).toEqual("");
    expect(dayToDistanceDesc({ distance: 7, type: "pe" })).toEqual("7");
    expect(dayToDistanceDesc({ distance: 7.42, type: "pe" })).toEqual("7");
    expect(dayToDistanceDesc()).toEqual("");
  });

  it("dateToDay", () => {
    expect(dateToDay("2018-10-25")).toEqual("Torstai");
    expect(dateToDay("2018-10-28")).toEqual("Sunnuntai");
    expect(dateToDay()).toEqual("");
  });

  it("dateToDayShort", () => {
    expect(dateToDayShort("2018-10-25")).toEqual("To");
    expect(dateToDayShort("2018-10-28")).toEqual("Su");
    expect(dateToDayShort()).toEqual("");
  });

  it("dateRangetoLabel", () => {
    expect(dateRangetoLabel(["2018-10-25", "2018-10-28"])).toEqual("25.10.18 - 28.10.18");
  });

  it("minutesToTimeLabel", () => {
    expect(minutesToTimeLabel(300)).toEqual("5:00");
    expect(minutesToTimeLabel(280)).toEqual("4:40");
    expect(minutesToTimeLabel(270)).toEqual("4:30");
});

  
});
