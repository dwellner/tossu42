import React from "react";
import { connect } from "react-redux";
import DayComponent from "./DayComponent";
import Texts from "../../constants/Texts";
import { ScrollView } from "react-native";
import ProgramModel from "../../utils/ProgramModel";
import DateUtils from "../../utils/DateUtils";

const getValidDate = (weekProgram, date) => {
  if (weekProgram != null) {
    const weeks = weekProgram.weeks;
    const firstDate = weeks[0].days[0].date;
    if (firstDate > date) return firstDate;

    const lastDate = weeks[weeks.length - 1].days[6].date;
    if (lastDate < date) return lastDate;
  }
  return date;
};

class DayScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  selectDate(date) {
    this.props.navigation.setParams({ date: date });
  }

  render() {
    const requestedDate = this.props.navigation.getParam(
      "date",
      DateUtils.currentDate
    );
    const { targetEvent, targetTime, maxHr, weekProgram } = this.props;
    const date = getValidDate(weekProgram, requestedDate);

    return (
      <ScrollView style={{ backgroundColor: "#F9F9F9" }}>
        <DayComponent
          date={date}
          weekProgram={weekProgram}
          targetEvent={targetEvent}
          targetTime={targetTime}
          maxHr={maxHr}
          changeDate={date => this.selectDate(date)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
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
