import "react-native";
import React from "react";
import SettingsComponent from "../SettingsComponent";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  Date.now = jest.fn(() => 1539074812374);

  const tree = renderer
    .create(
      <SettingsComponent
        eventName={"Foo maraton"}
        eventDate={"2018-10-30"}
        targetTime={240}
        programName={"Peruskunto - 4t tavoiteaika"}
        programLength={24}
        maxHr={185}
        onEventNameChanged={() => {}}
        onEventDateChanged={() => {}}
        onTargetTimeChanged={() => {}}
        onProgramNameChanged={() => {}}
        onProgramLengthChanged={() => {}}
        onMaxHrChanged={() => {}}
        onGotoToday={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
