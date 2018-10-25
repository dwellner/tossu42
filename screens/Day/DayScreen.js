import React from "react";
import { connect } from "react-redux";
import DayComponent from "./DayComponent";
import { Labels } from "../../constants/Texts";
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
    const requestedDate = this.props.navigation.getParam(
      "date",
      DateUtils.currentDate()
    );
    const { targetEvent, targetTime, maxHr, weekProgram } = this.props;
    const date = DateUtils.getValidDate(weekProgram, requestedDate);

    return (
      <DayComponent
        date={date}
        weekProgram={weekProgram}
        targetEvent={targetEvent}
        targetTime={targetTime}
        maxHr={maxHr}
        changeDate={date => this.selectDate(date)}
      />
    );
  }
}

const mapStateToProps = state => {
  const { maxHr, program } = state.settings;
  const { targetTime } = program;
  const targetEvent = {
    ...state.settings.targetEvent,
    name: state.settings.targetEvent.name || Labels.nextMaraton
  };
  const weekProgram = ProgramModel.getWeekProgram(targetEvent.date, program);
  return { targetEvent, targetTime, weekProgram, maxHr };
};

export default connect(mapStateToProps)(DayScreen);
