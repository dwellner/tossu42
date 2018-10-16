import React from "react";
import propTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import Styles from "../../constants/Styles";
import { Icon } from "expo";
import Texts from "../../constants/Texts";
import Colors from "../../constants/Colors";
import {
  dayToDistanceDesc,
  dayToDistanceUnitDesc,
  dayToTypeDesc,
  dateToDayLabel,
  dateToDateLabel,
  getIconName
} from "../../utils/Formatters";
import DayGoalModel from "../../utils/DayGoalModel";
import DateUtils from "../../utils/DateUtils";

const TargetEvent = ({ eventName }) => (
  <View style={{ flex: 1 }}>
    <Text style={styles.text_targetName}>{eventName}</Text>
  </View>
);

const DaysUntilTargetEvent = ({ targetEvent, daysUntil }) => {
  const daysUntilLabel =
    daysUntil > 1 ? Texts.labels.daysUntil : Texts.labels.dayUntil;
  const targetEventDate = dateToDateLabel(targetEvent.date);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ ...Styles.strongContent }}>{daysUntil}</Text>
      <Text style={{ ...Styles.lightContent }}>{daysUntilLabel}</Text>
      <Text style={{ ...Styles.largeContent }}>{targetEvent.name}</Text>
      <Text style={{ ...Styles.lightContent }}>{targetEventDate}</Text>
    </View>
  );
};

const DayMetricsGoal = ({ day, maxHr, targetTime }) => {
  if (day.type === "lepo") return null;
  const goal = DayGoalModel.getTargetMetricsGoals(day, maxHr, targetTime);
  const iconName = getIconName(goal.indexOf("bpm") > 0 ? "heart" : "timer");

  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
      <Icon.Ionicons name={iconName} size={26} color={Colors.defaultText} />
      <Text style={{ ...Styles.largeContent }}> {goal}</Text>
    </View>
  );
};

export default class DayContentComponent extends React.PureComponent {
  static propTypes = {
    day: propTypes.object.isRequired,
    targetEvent: propTypes.object.isRequired,
    targetTime: propTypes.number.isRequired,
    maxHr: propTypes.number
  };

  render() {
    const { day, maxHr, targetEvent, targetTime } = this.props;
    const daysUntil = DateUtils.difference(targetEvent.date, day.date);

    const targetComponent =
      daysUntil > 0 ? (
        <DaysUntilTargetEvent targetEvent={targetEvent} daysUntil={daysUntil} />
      ) : (
        <TargetEvent eventName={targetEvent.name} />
      );

    return (
      <View style={styles.component}>
        {targetComponent}
        <View
          style={{
            borderColor: "#E8E8E8",
            alignSelf: "stretch",
            borderBottomWidth: 1,
            marginTop: 24,
            marginBottom: 24,
            marginLeft: 48,
            marginRight: 48
          }}
        />
        <Text style={{ ...Styles.lightContent }}>
          {Texts.labels.dayProgram}
        </Text>
        <Text style={{ ...Styles.strongContent }}>
          {dateToDayLabel(day.date)}
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.text_distance}>
            {day.type !== "lepo" ? dayToDistanceDesc(day) : "😎"}
          </Text>
          <Text style={styles.text_distance_unit}>
            {day.type !== "lepo" ? dayToDistanceUnitDesc(day) : ""}
          </Text>
        </View>
        <Text style={{ ...Styles.largeContent }}>{dayToTypeDesc(day)}</Text>
        <DayMetricsGoal day={day} maxHr={maxHr} targetTime={targetTime} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: "center",
    backgroundColor: "#FFF",
    flex: 1
  },

  text_distance: {
    color: Colors.defaultText,
    paddingLeft: 16,
    fontSize: 84,
    alignSelf: "flex-end"
  },

  text_distance_unit: {
    color: Colors.defaultText,
    fontSize: 12,
    paddingBottom: 20,
    alignSelf: "flex-end" 
  }
});
