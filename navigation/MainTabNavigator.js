import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import DayScreen from "../screens/Day/DayScreen";
import ProgramScreen from "../screens/Program/ProgramScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import Texts from "../constants/Texts";

const getIconName = (iosIcon, mdIcon, focused) =>
  Platform.OS === "ios" ? `${iosIcon}${focused ? "" : "-outline"}` : mdIcon;

const createNavigator = (stack, label, iosIcon, mdIcon) => {
  const navigator = createStackNavigator(stack);
  navigator.navigationOptions = {
    tabBarLabel: label,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={getIconName(iosIcon, mdIcon, focused)}
      />
    )
  };
  return navigator;
};

const DayStack = createNavigator(
  { Day: DayScreen },
  Texts.labels.dayScreen,
  "ios-calendar",
  "md-calendar"
);

const ProgramStack = createNavigator(
  { Program: ProgramScreen },
  Texts.labels.programScreen,
  "ios-list",
  "md-list"
);

const SettingsStack = createNavigator(
  { Settings: SettingsScreen },
  Texts.labels.settingsScreen,
  "ios-options",
  "md-options"
);

export default createBottomTabNavigator(
  {
    DayStack,
    ProgramStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#FFF",
      labelStyle: { fontSize: 12 },
      style: { backgroundColor: "#111" }
    }
  }
);
