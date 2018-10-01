import React from "react";
import PropTypes from "prop-types";
import Formatters from "../../utils/Formatters";
import DateUtils from "../../utils/DateUtils";
import Texts from "../../constants/Texts";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";

export default class DayHeaderComponent extends React.Component {
  static propTypes = {
    weekProgram: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    targetEvent: PropTypes.object.isRequired,
    changeDate: PropTypes.func.isRequired
  };

  createNoProgramComponent() {
    const { weekProgram } = this.props;
    const firstDate = Formatters.dateToDateLabel(
      weekProgram.weeks[0].days[0].date
    );
    const lastDate = Formatters.dateToDateLabel(
      weekProgram.weeks.slice(-1)[0].days.slice(-1)[0].date
    );

    return (
      <View style={styles.goalContainer}>
         <Text style={{ ...Styles.defaultContent, textAlign: "center" }}>
          {Texts.labels.programSetFor} {firstDate} - {lastDate}
        </Text>
      </View>
    );
  }

  getTargetComponent() {
    const { date, targetEvent } = this.props;

    const daysUntil = DateUtils.difference(targetEvent.date, date) - 1;
    const eventName = targetEvent.name;
    if (daysUntil < 0) return this.createNoProgramComponent();

    if (daysUntil > 0)
      return (
        <View style={styles.goalContainer}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.text_days_until}>{daysUntil}</Text>
            <Text style={styles.text_label}>
              {daysUntil > 1 ? Texts.labels.daysUntil : Texts.labels.dayUntil}
            </Text>
          </View>
          <Text style={styles.text_targetName}>
            {eventName} - {Formatters.dateToDateLabel(targetEvent.date)}
          </Text>
        </View>
      );

    return (
      <View style={styles.goalContainer}>
        <Text style={styles.text_targetName}>{eventName}</Text>
      </View>
    );
  }

  render() {
    const { date, changeDate } = this.props;

    const prevWeek = () => changeDate(DateUtils.nextDate(date, -7));
    const nextWeek = () => changeDate(DateUtils.nextDate(date, 7));

    const targetComponent = this.getTargetComponent();

    return (
      <View style={styles.component}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button color="#333" title="◀" onPress={prevWeek} />
          </View>
          <View style={{ flex: 4, alignItems: "center" }}>
            <Text style={styles.text_date}>
              {Formatters.dateToDayLabel(date)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button color="#333" title="▶" onPress={nextWeek} />
          </View>
        </View>
        {targetComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    ...Styles.widgetContainer,
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
    alignItems: "stretch",
  },

  goalContainer: {
    flex: 1,
    alignItems: "center"
  },

  text_days_until: {
    ...Styles.defaultContent,
    color: Colors.tintColor,
    fontWeight: "bold"
  },
  text_date: { ...Styles.defaultContent },
  
  text_label: {
    ...Styles.defaultContent,
    marginLeft: 4
  },
  text_targetName: { ...Styles.defaultContent  }
});