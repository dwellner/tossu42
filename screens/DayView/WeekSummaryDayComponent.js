import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import Formatters from "../../utils/Formatters"

export default class WeekSummaryComponent extends React.Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    selected: PropTypes.bool
  };

  render() {
    const { day, selected } = this.props;
    return (
      <View style={selected ? styles.component_selected : styles.component}>
        <Text style={styles.text_day}>{Formatters.dateToDayLabelShort(day.date)}</Text>
        <Text style={styles.text_distance}>{Formatters.dayToDistanceDesc(day)}</Text>
        <Text style={styles.text_type}>{Formatters.dayToTypeDescShort(day)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  component: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#777",
    borderWidth: 1,
    borderColor: "#444",
    paddingBottom: 8,
    margin: 1
  },
  component_selected: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#999",
    borderWidth: 1,
    borderColor: "#f442df",
    margin: 1,
    paddingBottom: 8
  },

  text_day: {
    color: Colors.defaultText,
    fontSize: 16,
    marginBottom: 8
  },

  text_distance: {
    color: Colors.defaultText,
    fontWeight: "bold"
  },

  text_type: {
    color: Colors.defaultText,
    fontSize: 12
  }
});
