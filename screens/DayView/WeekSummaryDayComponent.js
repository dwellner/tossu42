import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";

import Formatters from "../../utils/Formatters";

export default class WeekSummaryComponent extends React.Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    selected: PropTypes.bool
  };

  render() {
    const { day, selected } = this.props;
    return (
      <View style={selected ? styles.component_selected : styles.component}>
        <Text style={styles.text_day}>
          {Formatters.dateToDayLabelShort(day.date)}
        </Text>
        <Text style={styles.text_distance}>
          {Formatters.dayToDistanceDesc(day)}
        </Text>
        <Text style={styles.text_type}>
          {Formatters.dayToTypeDescShort(day)}
        </Text>
      </View>
    );
  }
}

const containerStyles = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  paddingBottom: 8,
  margin: 1
}

const styles = StyleSheet.create({
  component: {
    ...containerStyles,
    backgroundColor: "#777",
    borderColor: "#444",
  },
  
  component_selected: {
    ...containerStyles,
    backgroundColor: "#999",
    borderColor: Colors.tintColor,
  },

  text_day: {
    ...Styles.defaultContent,
    marginBottom: 8
  },

  text_distance: {
    ...Styles.smallContent,
    fontWeight: "bold"
  },

  text_type: { ...Styles.smallContent }
});
