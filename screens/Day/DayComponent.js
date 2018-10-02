import React from "react";
import propTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import DayGoalComponent from "./DayGoalComponent";
import WeekSummaryComponent from "./WeekSummaryComponent";

export default class HomeScreen extends React.Component {
  static propTypes = {
    week: propTypes.object.isRequired,
    date: propTypes.string.isRequired,
    maxHr: propTypes.number.isRequired,
    targetTime: propTypes.number.isRequired,
    changeDate: propTypes.func.isRequired
  };

  render() {
    const { week, date, maxHr, targetTime, changeDate } = this.props;
    const day = week.days.find(day => day.date === date);

    return (
      <View>
        <DayGoalComponent day={day} maxHr={maxHr} targetTime={targetTime} />
        <WeekSummaryComponent week={week} date={date} changeDate={changeDate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
