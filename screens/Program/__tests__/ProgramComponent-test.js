import "react-native";
import React from "react";
import ProgramComponent from "../ProgramComponent";
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
      <ProgramComponent
        weekProgram={weekProgram}
        date={weekProgram.weeks[10].days[3].date}
        targetEvent={targetEvent}
        onWeekClicked={() => {}}
        onGotoToday={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
