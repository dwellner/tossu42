import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import ProgramModel from "../../utils/ProgramModel";
import Styles from "../../constants/Styles";
import Formatters from "../../utils/Formatters";
import ProgressBar from "react-native-progress/Bar";
import Colors from "../../constants/Colors";
import Texts from "../../constants/Texts";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    const date = new Date().toISOString().substr(0, 10);
    const targetEvent = { name: "Helsinki City Maraton", date: "2018-10-30" };
    const weekProgram = ProgramModel.getWeekProgram(targetEvent.date);
    const targetTime = weekProgram.targetTime;
    this.state = { targetTime, date, targetEvent, weekProgram };
  }

  createLevelBar(key, value, filled, empty) {
    return (
      <ProgressBar
        key={key}
        progress={value}
        height={8}
        width={null}
        color={filled}
        unfilledColor={empty}
        borderColor={Colors.barBorder}
        borderWidth={1}
      />
    );
  }

  createLevelBars(week) {
    const bars = [
      this.createLevelBar(
        "intensity",
        week.intensityLevel,
        Colors.intensityFilled,
        Colors.intensityEmpty
      ),
      this.createLevelBar(
        "distance",
        week.distanceLevel,
        Colors.distanceFilled,
        Colors.distanceEmpty
      )
    ];

    return <View style={styles.levelBarContainer}>{bars}</View>;
  }

  createRaceInfo() {
    const { targetEvent } = this.state;

    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={{ flex: 1 }} />
        <Text style={styles.raceDate}>
          {Formatters.dateToDateLabel(targetEvent.date)}
        </Text>
        <Text style={styles.raceEventName}>{targetEvent.name}</Text>
      </View>
    );
  }

  createWeekComponent(week, index) {
    const { weekProgram } = this.state;
    const weekNumber = weekProgram.weeks.length - index;
    const { navigate } = this.props.navigation;

    const levelBars = this.createLevelBars(week);

    const race = weekNumber == 1 ? this.createRaceInfo() : undefined;

    return (
      <TouchableOpacity
        key={week.days[0].date}
        onPress={() => navigate("Day", { date: week.days[0].date })}
        style={styles.listItem}
      >
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
          {levelBars}
        </View>
        {race}
      </TouchableOpacity>
    );
  }

  createListHeader() {
    return (
      <View style={styles.listHeader}>
        <Text style={{ ...Styles.label, flex: 1 }}>
          {Texts.labels.weekShort}
        </Text>
        <Text style={{ ...Styles.label, flex: 2 }}>
          {Texts.labels.eventDate}
        </Text>
        <Text style={{ ...Styles.label, flex: 5, textAlign: "center" }}>
          {Texts.labels.weekProgram}
        </Text>
      </View>
    );
  }

  render() {
    const { weekProgram } = this.state;

    const weeks = weekProgram.weeks.map((week, index) =>
      this.createWeekComponent(week, index)
    );

    const listHeader = this.createListHeader();
    return (
      <ImageBackground
        source={require("../../assets/images/darkroad.png")}
        style={styles.container}
      >
        <View style={styles.backgroundOverlay}>
          {listHeader}
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.listContainer}>{weeks}</View>
          </ScrollView>
        </View>
      </ImageBackground>
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
