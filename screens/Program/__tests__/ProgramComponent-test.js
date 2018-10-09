import "react-native";
import React from "react";
import ProgramComponent from "../ProgramComponent";
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
      <ProgramComponent
        weekProgram={weekProgram}
        targetEvent={targetEvent}
        onWeekClicked={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
