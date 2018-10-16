import React from "react";
import PropTypes from "prop-types";

import { Text, View } from "react-native";
import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";
import { dateToDateLabel } from "../../utils/Formatters";
import Texts from "../../constants/Texts";

const RaceInfo = ({ targetEvent }) => (
  <View
    style={{
      margin: 16,
      flex: 1,
      alignItems: "center"
    }}
  >
    <Text style={{ ...Styles.strongContent }}>{targetEvent.name}</Text>
    <Text style={{ ...Styles.defaultContent }}>
      {dateToDateLabel(targetEvent.date)}
    </Text>
  </View>
);

const LabeledValue = ({
  label,
  value,
  valueStyle = Styles.largeContent,
  isPast
}) => {
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

export default class ProgramWeekComponent extends React.Component {
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

    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <LabeledValue
            isPast={isPast}
            label={Texts.labels.weekShort}
            value={weekNumber}
            valueStyle={Styles.strongLargeContent}
          />
          <LabeledValue
            isPast={isPast}
            label={Texts.labels.eventDate}
            value={`${dateToDateLabel(week.days[0].date)} - ${dateToDateLabel(
              week.days[6].date
            )}`}
          />
          <LabeledValue
            isPast={isPast}
            label={"km"}
            value={week.distance.toFixed(0)}
            valueStyle={Styles.strongLargeContent}
          />
        </View>
        {race}
      </View>
    );
  }
}
