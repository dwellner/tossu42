import React from "react";
import PropTypes from "prop-types";

import WeekSummaryDayComponent from "./WeekSummaryDayComponent";
import { StyleSheet, View, TouchableOpacity } from "react-native";

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
        style={styles.dayContainer}
        onPress={() => changeDate(day.date)}
        key={day.date}
      >
        <WeekSummaryDayComponent day={day} selected={day.date === date} />
      </TouchableOpacity>
    ));

    return <View style={styles.component}>{dayComponents}</View>;
  }
}

const styles = StyleSheet.create({
  component: {
    flexDirection: "row",
    height: 150,
    marginLeft: 8,
    marginRight: 8
  },
  dayContainer: {
    flex: 1
  }
});
