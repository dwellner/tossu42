import React from "react";
import PropTypes from "prop-types";
import WeekSummaryDayComponent from "./WeekSummaryDayComponent";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const getDistance = day => day.type === "iv" ? (day.distance * day.repeat) + 3 : day.distance; 

export default class WeekSummaryComponent extends React.Component {
  static propTypes = {
    week: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    changeDate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { selected: "2018-09-27" };
  }


  render() {
    const { date, week, changeDate } = this.props;
    const weekTotal = week.days.map(getDistance).reduce((a,b)=> a+b); 

    const dayComponents = week.days.map(day => (
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

        <Text style={styles.text_distTotal}>{weekTotal} km</Text>
        <Text style={styles.text_distTotal}>{week.distanceLevel}</Text>
        <Text style={styles.text_distTotal}>{week.intensityLevel}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>{dayComponents}</View>
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
    fontSize: 16,
    marginBottom: 8
  },

  text_distTotal: {
    color: "#fff",
    fontSize: 24,
    margin: 20
  }
});
