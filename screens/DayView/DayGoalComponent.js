import React from "react";
import PropTypes from "prop-types";
import Formatters from "../../utils/Formatters";
import { StyleSheet, Text, View } from "react-native";
import Texts from "../../constants/Texts";

const getTargetMetricsGoals = (day, maxHr, targetTime) => {
  const getHrPct = pct => Math.round(maxHr * pct);
  const getPace = nr => {
    const hours = Math.trunc(nr);
    const minutes = `${Math.round((nr * 60) % 60)}`.padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  if (day.type === "pa") return `❤ ${getHrPct(0.55)} - ${getHrPct(0.7)} bpm`;
  if (day.type === "pe") return `❤ ${getHrPct(0.6)} - ${getHrPct(0.75)} bpm`;
  if (day.type === "t") return `❤ ${getHrPct(0.75)} - ${getHrPct(0.9)} bpm`;
  if (day.type === "iv")
    return `${Texts.labels.ivLeg} ❤ ${getHrPct(0.9)} - ${getHrPct(1)} bpm`;
  if (day.type === "m") return Texts.labels.goGirl;
  if (day.type === "k")
    return `⏱  ${getPace((targetTime / 42.2) * 0.9)} - ${getPace(
      targetTime / 42.2
    )}`;
  if (day.type === "r") return "🏁🏁🏁 GO! 🏁🏁🏁";
  return Texts.labels.takeItEasy;
};

export default class DayGoalComponent extends React.Component {
  static propTypes = {
    maxHr: PropTypes.number.isRequired,
    targetTime: PropTypes.number.isRequired,
    day: PropTypes.object.isRequired
  };

  render() {
    const { day, maxHr, targetTime } = this.props;

    return (
      <View style={styles.component}>
        <Text style={styles.text_label}>{Texts.labels.dayProgram}</Text>
        <Text style={styles.text_days_until}>
          {day.type !== "lepo" ? Formatters.dayToDistanceDesc(day) : "😎"}
        </Text>
        <Text style={styles.text_runType}>{Formatters.dayToTypeDesc(day)}</Text>
        <Text style={styles.text_bpmRange}>
          {getTargetMetricsGoals(day, maxHr, targetTime)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: "center",
    backgroundColor: "#1119",
    paddingTop: 10,
    paddingBottom: 20,
    borderWidth: 1,
    borderTopColor: "#333",
    borderBottomColor: "#333"
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
