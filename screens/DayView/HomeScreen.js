import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DayGoalComponent from "./DayGoalComponent";
import DayHeaderComponent from "./DayHeaderComponent";
import WeekSummaryComponent from "./WeekSummaryComponent";


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    
    // TODO: also move date formatting to formatters
    this.state = {
      date: "2018-09-27",
      week: [
        { date: "2018-09-24", distance: 6, type: "pa" },
        { date: "2018-09-25", distance: 0.8, type: "iv", repeat: 5},
        { date: "2018-09-26", distance: 7, type: "pe" },
        { date: "2018-09-27", distance: 7, type: "t" },
        { date: "2018-09-28", distance: 0, type: "lepo" },
        { date: "2018-09-29", distance: 10, type: "k" },
        { date: "2018-09-30", distance: 30, type: "pi" }
      ]
    }
  }

  selectDate(date) {
    console.log(date);
    this.setState(() => ({ date: date }));
  }

  render() {
    const {date, week} = this.state;
    const day = week.find(day => day.date === date);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.contentComponent}>
            <DayHeaderComponent date={date} changeDate={date => this.selectDate(date)}/>
          </View>
          <View style={styles.contentComponent}>
            <DayGoalComponent day={day}/>
          </View>
          <View style={styles.contentComponent}>
            <WeekSummaryComponent week={week} date={date} changeDate={date => this.selectDate(date)} />
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  contentContainer: {
    paddingTop: 30
  },
  contentComponent: {
    marginBottom: 30
  }
});
