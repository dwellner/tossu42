import React from "react";
import { connect } from "react-redux";
import DayComponent from "./DayComponent";

import { ScrollView, StyleSheet, View, ImageBackground } from "react-native";
import DayHeaderComponent from "./DayHeaderComponent";
import ProgramModel from "../../utils/ProgramModel";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  selectDate(date) {
    this.props.navigation.setParams({ date: date });
  }

  render() {
    const date = this.props.navigation.getParam(
      "date",
      new Date().toISOString().substr(0, 10)
    );

    const { targetEvent, targetTime, maxHr, weekProgram } = this.props;

    const week = weekProgram.weeks.find(
      week => week.days.findIndex(d => d.date === date) >= 0
    );

    const viewContent =
      week !== undefined ? (
        <DayComponent
          date={date}
          week={week}
          maxHr={maxHr}
          targetTime={targetTime}
          changeDate={date => this.selectDate(date)}
        />
      ) : (
        undefined
      );

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

const mapStateToProps = state => {
  const { targetEvent, targetTime, programId, maxHr } = state.settings;
  const weekProgram = ProgramModel.getWeekProgram(targetEvent.date, programId);
  return { targetEvent, targetTime, weekProgram, maxHr };
};

export default connect(mapStateToProps)(HomeScreen);
