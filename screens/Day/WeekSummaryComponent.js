import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "react-native-progress/Bar";

import WeekSummaryDayComponent from "./WeekSummaryDayComponent";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import Texts from "../../constants/Texts";
import Styles from "../../constants/Styles";

export default class WeekSummaryComponent extends React.Component {
  static propTypes = {
    week: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    changeDate: PropTypes.func.isRequired
  };

  createLevelComponent(label, level, textValue, fillColor, emptyColor) {
    return (
      <View style={styles.levelContainer}>
        <Text style={styles.text_label}>{label}</Text>
        <ProgressBar
          progress={level}
          height={8}
          color={fillColor}
          unfilledColor={emptyColor}
          borderColor={Colors.barBorder}
          borderWidth={1}
        />
        <Text style={styles.text_value}>{textValue}</Text>
      </View>
    );
  }

  createDayComponent(day) {
    const { date, changeDate } = this.props;

    return (
      <TouchableOpacity
        style={styles.dayComponentContainer}
        onPress={() => changeDate(day.date)}
        key={day.date}
      >
        <WeekSummaryDayComponent day={day} selected={day.date === date} />
      </TouchableOpacity>
    );
  }

  render() {
    const { week } = this.props;

    const distanceLevel = this.createLevelComponent(
      Texts.labels.totalDistance,
      week.distanceLevel,
      `${week.distance.toFixed(0)} km`,
      Colors.distanceFilled,
      Colors.distanceEmpty
    );

    const intensityLevel = this.createLevelComponent(
      Texts.labels.intensity,
      week.intensityLevel,
      (week.intensityLevel * 5).toFixed(1),
      Colors.intensityFilled,
      Colors.intensityEmpty
    );

    const dayComponents = week.days.map(day => this.createDayComponent(day));

    return (
      <View style={styles.component}>
        <Text style={styles.text_label}>{Texts.labels.weekProgram}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {distanceLevel}
          {intensityLevel}
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>{dayComponents}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    ...Styles.widgetContainer,
    alignItems: "center"
  },
  levelContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 8
  },
  dayComponentContainer: {
    flex: 1
  },
  text_label: { ...Styles.label },
  text_value: { ...Styles.defaultContent }
});
