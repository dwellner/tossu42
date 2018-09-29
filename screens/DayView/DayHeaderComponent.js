import React from "react";
import PropTypes from "prop-types";
import Formatters from "../../utils/Formatters";
import DateUtils from "../../utils/DateUtils";
import Texts from "../../constants/Texts";
import { StyleSheet, Text, View, Button } from "react-native";

export default class DayHeaderComponent extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    targetEvent: PropTypes.object.isRequired,
    changeDate: PropTypes.func.isRequired
  };

  getTargetComponent(targetEvent, date) {
    const daysUntil = DateUtils.difference(targetEvent.date, date) - 1;

    if (daysUntil < 0) return undefined;

    if (daysUntil > 0)
      return (
        <View
          style={{
            flex: 1,
            padding: 10,
            borderWidth: 1,
            borderTopColor: "#333",
            alignItems: "center",
            backgroundColor: "#1117"
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.text_days_until}>{daysUntil}</Text>
            <Text style={styles.text_label}>
              {daysUntil > 1 ? Texts.labels.daysUntil : Texts.labels.dayUntil}
            </Text>
          </View>
          <Text style={styles.text_targetName}>
            {targetEvent.name} - {Formatters.dateToDateLabel(targetEvent.date)}
          </Text>
        </View>
      );

    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderTopColor: "#333",
          alignItems: "center",
          backgroundColor: "#1117"
        }}
      >
        <Text style={styles.text_targetName}>
          {targetEvent.name}
        </Text>
      </View>
    );
  }

  render() {
    const { date, targetEvent, changeDate } = this.props;

    const targetComponent = this.getTargetComponent(targetEvent,date);
    return (
      <View style={styles.component}>
        <View
          style={{ flex: 1, flexDirection: "row", backgroundColor: "#1115" }}
        >
          <View style={{ flex: 1 }}>
            <Button
              color="#333"
              title="◀"
              onPress={() => changeDate(DateUtils.nextDate(date, -7))}
            />
          </View>
          <View style={{ flex: 4, alignItems: "center" }}>
            <Text style={styles.text_date}>
              {Formatters.dateToDayLabel(date)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              color="#333"
              title="▶"
              onPress={() => changeDate(DateUtils.nextDate(date, 7))}
            />
          </View>
        </View>
        {targetComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    alignItems: "center",
    alignItems: "stretch"
  },
  text_days_until: {
    color: "#f442df",
    fontSize: 24,
    fontWeight: "bold"
  },
  text_date: {
    color: "#fff",
    fontSize: 24
  },
  text_label: {
    color: "#fff",
    textAlignVertical: "center",
    fontSize: 24,
    marginLeft: 4
  },
  text_targetName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900"
  }
});
