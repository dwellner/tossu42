import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from "react-native";
import DayGoalComponent from "./DayGoalComponent";
import DayHeaderComponent from "./DayHeaderComponent";
import WeekSummaryComponent from "./WeekSummaryComponent";
import ProgramModel from "../../utils/ProgramModel";
import Formatters from "../../utils/Formatters";
import Texts from "../../constants/Texts";
import Styles from "../../constants/Styles";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const targetEvent = { name: "Helsinki City Maraton", date: "2018-10-30" };
    const maxHr = 189;
    const weekProgram = ProgramModel.getWeekProgram(targetEvent.date);
    const targetTime = weekProgram.targetTime;
    this.state = { maxHr, targetTime, targetEvent, weekProgram };
  }

  selectDate(date) {
    this.props.navigation.setParams({ date: date });
  }

  createDayProgramComponent(week, date) {
    const { maxHr, targetTime } = this.state;
    const day = week.days.find(day => day.date === date);

    return (
      <View>
        <DayGoalComponent day={day} maxHr={maxHr} targetTime={targetTime} />
        <WeekSummaryComponent
          week={week}
          date={date}
          changeDate={date => this.selectDate(date)}
        />
      </View>
    );
  }

  createNoProgramComponent() {
    const { weekProgram } = this.state;
    const firstDate = Formatters.dateToDateLabel(
      weekProgram.weeks[0].days[0].date
    );
    const lastDate = Formatters.dateToDateLabel(
      weekProgram.weeks.slice(-1)[0].days.slice(-1)[0].date
    );

    return (
      <View style={{ marginTop: 100, marginLeft: 16, marginRight: 16 }}>
        <Text style={{ ...Styles.defaultContent, textAlign: "center" }}>
          {Texts.labels.programSetFor} {firstDate} - {lastDate}
        </Text>
      </View>
    );
  }

  render() {
    const date = this.props.navigation.getParam(
      "date",
      new Date().toISOString().substr(0, 10)
    );
    const { targetEvent, weekProgram } = this.state;
    const week = weekProgram.weeks.find(
      week => week.days.findIndex(d => d.date === date) >= 0
    );

    const viewContent =
      week !== undefined
        ? this.createDayProgramComponent(week, date)
        : undefined;

    return (
      <ImageBackground
        source={require("../../assets/images/darkroad.png")}
        style={styles.container}
      >
        <View style={styles.header}>
          <DayHeaderComponent
            weekProgram={weekProgram}
            targetEvent={targetEvent}
            date={date}
            changeDate={date => this.selectDate(date)}
          />
        </View>
        <ScrollView>{viewContent}</ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },

  header: {
    height: 190
  }
});
