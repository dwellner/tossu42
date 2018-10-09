import "react-native";
import React from "react";
import DayHeaderComponent from "../DayHeaderComponent";
import renderer from "react-test-renderer";
import ProgramModel from "../../../utils/ProgramModel";

it("renders correctly", () => {
  const targetEvent = { name: "Foo maraton", date: "2018-10-30" };

  const weekProgram = ProgramModel.getWeekProgram("2018-10-30", {
    targetTime: 240,
    name: "Tossu.com 4 tunnin täysohjelma",
    length: 24
  });

  const week = weekProgram.weeks[0];
  const tree = renderer
    .create(
      <DayHeaderComponent
        weekProgram={weekProgram}
        date={week.days[0].date}
        targetEvent={targetEvent}
        changeDate={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
