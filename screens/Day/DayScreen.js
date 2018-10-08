import React from "react";
import { connect } from "react-redux";
import DayComponent from "./DayComponent";
import Texts from "../../constants/Texts";


import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Text
} from "react-native";
import DayHeaderComponent from "./DayHeaderComponent";
import ProgramModel from "../../utils/ProgramModel";
import DateUtils from "../../utils/DateUtils";

class DayScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  selectDate(date) {
    this.props.navigation.setParams({ date: date });
  }

  render() {
    const date = this.props.navigation.getParam("date", DateUtils.currentDate);

    const { targetEvent, targetTime, maxHr, weekProgram } = this.props;
    if (weekProgram === null) return <Text>Piru</Text>;

    const week =
      weekProgram !== null
        ? weekProgram.weeks.find(
            week => week.days.findIndex(d => d.date === date) >= 0
          )
        : undefined;

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
  console.log("here");
  const { maxHr, program } = state.settings;
  const { targetTime } = program;
  const targetEvent = {
    ...state.settings.targetEvent,
    name: state.settings.targetEvent.name || Texts.labels.nextMaraton
  };
  const weekProgram = ProgramModel.getWeekProgram(targetEvent.date, program);
  return { targetEvent, targetTime, weekProgram, maxHr };
};

export default connect(mapStateToProps)(DayScreen);
