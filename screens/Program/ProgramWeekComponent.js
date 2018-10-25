import React from "react";
import PropTypes from "prop-types";

import { Text, View, StyleSheet } from "react-native";
import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";
import { dateToDate, dateRangetoLabel } from "../../utils/Formatters";
import { Labels } from "../../constants/Texts";

const RaceInfo = ({ targetEvent }) => (
  <View style={styles.raceInfo}>
    <Text style={{ ...Styles.strongContent }}>{targetEvent.name}</Text>
    <Text style={{ ...Styles.defaultContent }}>
      {dateToDate(targetEvent.date)}
    </Text>
  </View>
);

const LabeledValue = ({ label, value, valueStyle, isPast }) => {
  const color = isPast ? Colors.inactiveText : Colors.defaultText;
  return (
    <View style={{ margin: 16 }}>
      <Text style={{ ...Styles.lightContent, fontSize: 12, color }}>
        {label}
      </Text>
      <Text style={{ ...valueStyle, color }}>{value}</Text>
    </View>
  );
};

export default class ProgramWeekComponent extends React.PureComponent {
  static propTypes = {
    weekNumber: PropTypes.number.isRequired,
    targetEvent: PropTypes.object.isRequired,
    week: PropTypes.object.isRequired,
    isPast: PropTypes.bool.isRequired
  };

  render() {
    const { weekNumber, targetEvent, week, isPast } = this.props;
    const race =
      weekNumber == 1 ? <RaceInfo targetEvent={targetEvent} /> : undefined;
    const weekDates = dateRangetoLabel([week.days[0].date, week.days[6].date]);
    const distance = week.distance.toFixed(0);

    return (
      <View>
        <View style={styles.weekInfoRow}>
          <LabeledValue
            isPast={isPast}
            label={Labels.weekShort}
            value={weekNumber}
            valueStyle={Styles.strongLargeContent}
          />
          <LabeledValue
            isPast={isPast}
            label={Labels.eventDate}
            value={weekDates}
            valueStyle={Styles.largeContent}
          />
          <LabeledValue
            isPast={isPast}
            label={"km"}
            value={distance}
            valueStyle={Styles.strongLargeContent}
          />
        </View>
        {race}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  raceInfo: {
    margin: 16,
    flex: 1,
    alignItems: "center"
  },

  weekInfoRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
