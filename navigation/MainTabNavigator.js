import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import DayScreen from "../screens/Day/DayScreen";
import ProgramScreen from "../screens/Program/ProgramScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { getIconName } from "../utils/Formatters";
import Texts from "../constants/Texts";
import Colors from "../constants/Colors";

const createNavigator = (stack, label, icon) => {
  const navigator = createStackNavigator(stack);
  navigator.navigationOptions = {
    tabBarLabel: label,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={getIconName(icon, focused)} />
    )
  };
  return navigator;
};

const DayStack = createNavigator(
  { Day: DayScreen },
  Texts.labels.dayScreen,
  "calendar"
);

const ProgramStack = createNavigator(
  { Program: ProgramScreen },
  Texts.labels.programScreen,
  "list"
);

const SettingsStack = createNavigator(
  { Settings: SettingsScreen },
  Texts.labels.settingsScreen,
  "options"
);

export default createBottomTabNavigator(
  {
    DayStack,
    ProgramStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.defaultText,
      labelStyle: { fontSize: 12 },
      style: { backgroundColor: "#fff" }
    }
  }
);
