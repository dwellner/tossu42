import "react-native";
import React from "react";
import ProgramWeekComponent from "../ProgramWeekComponent";
import renderer from "react-test-renderer";
import ProgramModel from "../../../utils/ProgramModel";

it("renders correctly", () => {
  const targetEvent = { name: "Foo maraton", date: "2018-10-30" };

  const weekProgram = ProgramModel.getWeekProgram("2018-10-30", {
    targetTime: 240,
    name: "Peruskunto - 4t tavoiteaika",
    length: 24
  });
  const tree = renderer
    .create(
      <ProgramWeekComponent
        weekNumber={4}
        week={weekProgram.weeks[3]}
        isPast={false}
        targetEvent={targetEvent}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
