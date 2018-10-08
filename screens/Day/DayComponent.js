import React from "react";
import propTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import Styles from "../../constants/Styles"
import Texts from "../../constants/Texts"
import Formatters from "../../utils/Formatters"
import DayGoalModel from "../../utils/DayGoalModel"
import WeekSummaryComponent from "./WeekSummaryComponent";

const DayGoal = ({ day, maxHr, targetTime }) => (
  <View style={styles.component}>
    <Text style={styles.text_label}>{Texts.labels.dayProgram}</Text>
    <Text style={styles.text_days_until}>
      {day.type !== "lepo" ? Formatters.dayToDistanceDesc(day) : "😎"}
    </Text>
    <Text style={styles.text_runType}>{Formatters.dayToTypeDesc(day)}</Text>
    <Text style={styles.text_bpmRange}>
      {DayGoalModel.getTargetMetricsGoals(day, maxHr, targetTime)}
    </Text>
  </View>
);

export default class DayScreen extends React.Component {
  static propTypes = {
    week: propTypes.object.isRequired,
    date: propTypes.string.isRequired,
    maxHr: propTypes.number,
    targetTime: propTypes.number.isRequired,
    changeDate: propTypes.func.isRequired
  };

  render() {
    const { week, date, maxHr, targetTime, changeDate } = this.props;
    const day = week.days.find(day => day.date === date);

    return (
      <View>
        <DayGoal day={day} maxHr={maxHr} targetTime={targetTime} />
        <WeekSummaryComponent week={week} date={date} changeDate={changeDate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    ...Styles.widgetContainer,
    alignItems: "center"
  },

  text_label: {
    color: "#bbb",
    fontSize: 16
  },

  text_days_until: {
    color: "#f442df",
    fontSize: 64
  },

  text_runType: {
    color: "#fff",
    fontSize: 24
  },

  text_bpmRange: {
    color: "#fff",
    fontSize: 24
  }
});
