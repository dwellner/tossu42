import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";
import { getIconName } from "../../utils/Formatters";
import DayGoalModel from "../../utils/DayGoalModel";
import { Icon } from "expo";

const getIconId = goal => {
  if (goal.indexOf("bpm") > 0) return "heart";
  if (goal.indexOf("min/km") > 0) return "timer";
  return null;
};

const GoalIcon = ({ iconId }) => {
  if (iconId == null) return null;
  return (
    <Icon.Ionicons
      name={getIconName(iconId)}
      size={20}
      color={Colors.defaultText}
    />
  );
};

export default class DayMetricsGoal extends React.Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    maxHr: PropTypes.number,
    targetTime: PropTypes.number
  };

  render() {
    const { day, maxHr, targetTime } = this.props;

    if (day.type === "lepo") return null;
    const goal = DayGoalModel.getTargetMetricsGoals(day, maxHr, targetTime);
    if (goal == null || goal.length == 0) return null;
    const iconId = getIconId(goal);

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <GoalIcon iconId={iconId} />
        <Text style={{ ...Styles.largeContent }}> {goal}</Text>
      </View>
    );
  }
}
