import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { RunTypes } from "../../constants/Texts";

import {
  dateToDayLabelShort,
  dayToDistanceDesc,
  dayToDistanceUnitDesc
} from "../../utils/Formatters";

const Triangle = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <View style={styles.TriangleShapeCSS} />
  </View>
);

export default class WeekSummaryComponent extends React.Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    selected: PropTypes.bool
  };

  render() {
    const { day, selected } = this.props;

    const triangle = selected ? <Triangle /> : undefined;
    const distance = `${dayToDistanceDesc(day)} ${dayToDistanceUnitDesc(day)}`;

    return (
      <View style={{ flex: 1 }}>
        <View style={selected ? styles.component_selected : styles.component}>
          <Text style={styles.text_day}>{dateToDayLabelShort(day.date)}</Text>
          <Text style={styles.text_distance}>{distance}</Text>
          <Text style={styles.text_type}>{RunTypes[day.type].short}</Text>
        </View>
        {triangle}
      </View>
    );
  }
}

const containerStyles = {
  alignItems: "center",
  paddingTop: 24,
  paddingBottom: 24
};

const styles = StyleSheet.create({
  component: {
    ...containerStyles
  },

  component_selected: {
    ...containerStyles,
    backgroundColor: Colors.tintColor
  },

  text_day: {
    ...Styles.largeContent,
    marginBottom: 8
  },

  text_distance: {
    ...Styles.strongContent,
    fontSize: 12
  },

  text_type: { ...Styles.lightContent, fontSize: 12 },

  TriangleShapeCSS: {
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 24,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.tintColor,
    marginBottom: 10
  }
});
