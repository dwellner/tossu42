import "react-native";
import React from "react";
import DayComponent from "../DayComponent";
import renderer from "react-test-renderer";
import ProgramModel from "../../../utils/ProgramModel";

it("renders correctly", () => {
  const weekProgram = ProgramModel.getWeekProgram("2018-10-30", {
    targetTime: 240,
    name: "Tossu.com 4 tunnin täysohjelma",
    length: 24
  });

  const week = weekProgram.weeks[0];
  const tree = renderer
    .create(
      <DayComponent
        week={week}
        date={week.days[0].date}
        targetTime={240}
        changeDate={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
