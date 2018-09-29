import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import DayScreen from "../screens/Day/DayScreen";
import ProgramScreen from "../screens/Program/ProgramScreen";

import SettingsScreen from "../screens/SettingsScreen";

const DayStack = createStackNavigator({
  Day: DayScreen
});

DayStack.navigationOptions = {
  tabBarLabel: "Päivänäkymä",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-calendar${focused ? "" : "-outline"}`
          : "md-calendar"
      }
    />
  )
};

const ProgramStack = createStackNavigator({
  Program: ProgramScreen
});

ProgramStack.navigationOptions = {
  tabBarLabel: "Ohjelma",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-list${focused ? "" : "-outline"}`
          : "md-list"
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Asetukset",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

export default createBottomTabNavigator(
  {
    DayStack,
    ProgramStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#fFF",
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: "#111"
      }
    }
  }
);
