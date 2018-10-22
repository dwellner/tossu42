import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import Styles from "../../constants/Styles";
import Texts from "../../constants/Texts";
import {
  dayToDistanceDesc,
  dayToDistanceUnitDesc,
  dayToTypeDesc,
  dateToDayLabel
} from "../../utils/Formatters";
import DateUtils from "../../utils/DateUtils";
import DayMetricsGoal from "./DayMetricsGoalComponent";

const Border = () => (
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
);

const DaysUntilTargetEvent = ({ daysUntil, eventName }) => {
  if (daysUntil == 0)
    return (
      <View>
        <Text style={styles.text_targetName}>{eventName}</Text>
      </View>
    );

  const daysUntilLabel =
    daysUntil == 1 ? Texts.labels.dayUntil : Texts.labels.daysUntil;

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ ...Styles.strongContent }}>{daysUntil}</Text>
      <Text style={{ ...Styles.lightContent }}>{daysUntilLabel}</Text>
    </View>
  );
};

const DayGoal = ({ day }) => {
  if (day.type == "lepo") return <Text style={{ fontSize: 48 }}>😎</Text>;

  if (day.type == "ve") {
    const time = Math.round(day.distance * 0.8) * 10;
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text_daygoal_double}>{day.distance}</Text>
        <Text style={styles.text_daygoal_unit}>km</Text>
        <Text style={styles.text_daygoal_separator}>/</Text>
        <Text style={styles.text_daygoal_double}>{time}</Text>
        <Text style={styles.text_daygoal_unit}>min</Text>
      </View>
    );
  }
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.text_daygoal_single}>{dayToDistanceDesc(day)}</Text>
      <Text style={styles.text_daygoal_unit}>{dayToDistanceUnitDesc(day)}</Text>
    </View>
  );
};

export default class DayContentComponent extends React.PureComponent {
  static propTypes = {
    day: PropTypes.object.isRequired,
    targetEvent: PropTypes.object.isRequired,
    targetTime: PropTypes.number.isRequired,
    maxHr: PropTypes.number
  };

  render() {
    const { day, maxHr, targetEvent, targetTime } = this.props;
    const daysUntil = DateUtils.difference(targetEvent.date, day.date);

    return (
      <View style={styles.component}>
        <DaysUntilTargetEvent
          daysUntil={daysUntil}
          eventName={targetEvent.name}
        />
        <Border />
        <Text style={{ ...Styles.lightContent }}>
          {Texts.labels.dayProgram}
        </Text>
        <Text style={{ ...Styles.strongContent }}>
          {dateToDayLabel(day.date)}
        </Text>
        <View style={{ alignItems: "center" }}>
          <DayGoal day={day} />
          <Text style={{ ...Styles.largeContent }}>{dayToTypeDesc(day)}</Text>
        </View>
        <DayMetricsGoal day={day} maxHr={maxHr} targetTime={targetTime} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 24,
    borderWidth: 1,
    borderColor: "#fafafa"
  },

  text_daygoal_single: {
    ...Styles.strongContent,
    paddingLeft: 16,
    fontSize: 84
  },

  text_daygoal_double: {
    ...Styles.strongContent,
    fontSize: 84
  },

  text_daygoal_unit: {
    ...Styles.defaultContent,
    fontSize: 12,
    paddingBottom: 21,
    alignSelf: "flex-end"
  },

  text_daygoal_separator: {
    ...Styles.lightContent,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 10,
    fontSize: 72
  }
});
