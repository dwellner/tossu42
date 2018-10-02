import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "react-native-progress/Bar";

import WeekSummaryDayComponent from "./WeekSummaryDayComponent";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import Texts from "../../constants/Texts";
import Styles from "../../constants/Styles";

const LevelBar = ({ label, level, textValue, fillColor, emptyColor }) => (
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

export default class WeekSummaryComponent extends React.Component {
  static propTypes = {
    week: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    changeDate: PropTypes.func.isRequired
  };

  render() {
    const { week, date, changeDate } = this.props;

    const dayComponents = week.days.map(day => (
      <TouchableOpacity
        style={styles.dayComponentContainer}
        onPress={() => changeDate(day.date)}
        key={day.date}
      >
        <WeekSummaryDayComponent day={day} selected={day.date === date} />
      </TouchableOpacity>
    ));

    return (
      <View style={styles.component}>
        <Text style={styles.text_label}>{Texts.labels.weekProgram}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <LevelBar
            label={Texts.labels.totalDistance}
            level={week.distanceLevel}
            textValue={`${week.distance.toFixed(0)} km`}
            fillColor={Colors.distanceFilled}
            emptyColor={Colors.distanceEmpty}
          />
          <LevelBar
            label={Texts.labels.intensity}
            level={week.intensityLevel}
            textValue={(week.intensityLevel * 5).toFixed(1)}
            fillColor={Colors.intensityFilled}
            emptyColor={Colors.intensityEmpty}
          />
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
