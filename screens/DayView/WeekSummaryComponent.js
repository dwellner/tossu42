import React from "react";
import PropTypes from "prop-types";
import WeekSummaryDayComponent from "./WeekSummaryDayComponent";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class WeekSummaryComponent extends React.Component {
  static propTypes = {
    week: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    changeDate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { selected: "2018-09-27" };
  }

  render() {
    const { date, week, changeDate } = this.props;

    const dayComponents = week.map(day => (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => changeDate(day.date)}
        key={day.date}
      >
        <WeekSummaryDayComponent day={day} selected={day.date === date} />
      </TouchableOpacity>
    ));

    return (
      <View style={styles.component}>
        <Text style={styles.text_label}>Viikon ohjelma</Text>

        <Text style={styles.text_distTotal}>72 km</Text>

        <View style={{ flex: 1, flexDirection: "row" }}>{dayComponents}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: "center",
    backgroundColor: "#111",
    paddingTop: 10,
    paddingBottom: 20,
    borderWidth: 1,
    borderTopColor: "#333",
    borderBottomColor: "#333"
  },

  text_label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8
  },

  text_distTotal: {
    color: "#fff",
    fontSize: 32,
    margin: 20
  }
});
