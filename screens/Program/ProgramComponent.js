import React from "react";
import PropTypes from "prop-types";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import Styles from "../../constants/Styles";
import Formatters from "../../utils/Formatters";
import ProgressBar from "react-native-progress/Bar";
import Colors from "../../constants/Colors";
import Texts from "../../constants/Texts";

const LevelBar = ({ value, filled, empty }) => (
  <ProgressBar
    progress={value}
    height={8}
    width={null}
    color={filled}
    unfilledColor={empty}
    borderColor={Colors.barBorder}
    borderWidth={1}
  />
);

const RaceInfo = ({ targetEvent }) => (
  <View style={{ flex: 1, flexDirection: "row" }}>
    <Text style={{ flex: 1 }} />
    <Text style={styles.raceDate}>
      {Formatters.dateToDateLabel(targetEvent.date)}
    </Text>
    <Text style={styles.raceEventName}>{targetEvent.name}</Text>
  </View>
);

const LevelBarContainer = ({ week }) => (
  <View style={styles.levelBarContainer}>
    <LevelBar
      value={week.intensityLevel}
      filled={Colors.intensityFilled}
      empty={Colors.intensityEmpty}
    />
    <LevelBar
      value={week.distanceLevel}
      filled={Colors.distanceFilled}
      empty={Colors.distanceEmpty}
    />
  </View>
);

const Header = () => (
  <View style={styles.listHeader}>
    <Text style={{ ...Styles.label, flex: 1 }}>{Texts.labels.weekShort}</Text>
    <Text style={{ ...Styles.label, flex: 2 }}>{Texts.labels.eventDate}</Text>
    <Text style={{ ...Styles.label, flex: 5, textAlign: "center" }}>
      {Texts.labels.weekProgram}
    </Text>
  </View>
);

const Week = ({ weekNumber, week }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ ...Styles.defaultContent }}>{weekNumber}</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={{ ...Styles.defaultContent }}>
          {Formatters.dateToDateLabel(week.days[0].date)}
        </Text>
      </View>
      <View style={{ flex: 2, alignItems: "flex-end", marginRight: 4 }}>
        <Text style={{ ...Styles.defaultContent }}>
          {week.distance.toFixed(0)} km
        </Text>
      </View>
      <LevelBarContainer week={week} />
    </View>
  );
};

export default class ProgramComponent extends React.Component {
  static propTypes = {
    weekProgram: PropTypes.object.isRequired,
    targetEvent: PropTypes.object.isRequired,
    onWeekClicked: PropTypes.func.isRequired
  };

  render() {
    const { weekProgram, targetEvent, onWeekClicked } = this.props;

    const weeks = weekProgram.weeks.map((week, index) => {
      const weekNumber = weekProgram.weeks.length - index;
      const race =
        weekNumber == 1 ? <RaceInfo targetEvent={targetEvent} /> : undefined;

      return (
        <TouchableOpacity
          key={week.days[0].date}
          onPress={() => onWeekClicked(week.days[0].date)}
          style={styles.listItem}
        >
          <Week weekNumber={weekNumber} week={week} />
          {race}
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.backgroundOverlay}>
        <Header />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.listContainer}>{weeks}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },

  backgroundOverlay: {
    backgroundColor: "#0009",
    flex: 1
  },

  listHeader: {
    flex: 1,
    flexDirection: "row",
    flex: 0,
    padding: 8,
    paddingTop: 30
  },

  listContainer: {
    padding: 8,
    paddingTop: 0,
    paddingBottom: 30
  },

  listItem: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderBottomColor: "#777"
  },

  levelBarContainer: {
    flex: 3,
    alignItems: "stretch",
    justifyContent: "center"
  },

  raceDate: {
    ...Styles.defaultContent,
    color: Colors.tintColor,
    flex: 2
  },

  raceEventName: {
    ...Styles.defaultContent,
    color: Colors.tintColor,
    flex: 5,
    textAlign: "right"
  }
});
