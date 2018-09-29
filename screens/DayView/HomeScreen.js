import React from "react";
import { ScrollView, StyleSheet, Text, View, ImageBackground } from "react-native";
import DayGoalComponent from "./DayGoalComponent";
import DayHeaderComponent from "./DayHeaderComponent";
import WeekSummaryComponent from "./WeekSummaryComponent";
import ProgramModel from "../../utils/ProgramModel";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    const date = new Date().toISOString().substr(0, 10);
    const targetEvent = { name: "Helsinki City Maraton", date: "2018-09-30" };
    const maxHr = 189;
    const targetTime = 210; 
    const weekProgram = ProgramModel.getWeekProgram(targetEvent.date);
    this.state = { maxHr, targetTime, date, targetEvent, weekProgram };
  }

  selectDate(date) {
    this.setState(() => ({ date: date }));
  }

  renderDayProgramComponent(week, date, maxHr, targetTime) {
    const day = week.find(day => day.date === date);

    return (
      <View>
        <View style={styles.contentComponent}>
          <DayGoalComponent day={day} maxHr={maxHr} targetTime={targetTime} />
        </View>
        <View style={styles.contentComponent}>
          <WeekSummaryComponent
            week={week}
            date={date}
            changeDate={date => this.selectDate(date)}
          />
        </View>
      </View>
    );
  }

  render() {
    const { date, maxHr, targetTime, targetEvent, weekProgram } = this.state;
    const week = weekProgram.find(
      week => week.findIndex(d => d.date === date) >= 0
    );
    const viewContent =
      week !== undefined ? (
        this.renderDayProgramComponent(week, date, maxHr, targetTime)
      ) : (
        <View style={{marginTop: 100, alignItems: "center"}}>
          <Text style={{ color: "#fff", fontSize: 24 }}>Juoksuohjelma on asetettu</Text>
          <Text style={{ color: "#fff", fontSize: 24 }}>jaksolle 1.5.18 - 2.4.18</Text>
        </View>
      
      );
    return (
      <ImageBackground source={require('../../assets/images/darkroad.png')} style={styles.container}>
        <View style={styles.header}>
          <DayHeaderComponent
            targetEvent={targetEvent}
            date={date}
            changeDate={date => this.selectDate(date)}
          />
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {viewContent}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%', height: '100%',
    paddingTop: 40,
    backgroundColor: "#000",
    flex: 1
  },

  header: {
    height: 150
  },

  scrollView: {},

  contentContainer: {
  },

  contentComponent: {
    marginBottom: 30,
    flex: 1
  }
});
