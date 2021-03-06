import React from "react";
import { connect } from "react-redux";
import SettingsComponent from "./SettingsComponent";
import DateUtils from "../../utils/DateUtils";

import {
  targetEventNameChanged,
  targetEventDateChanged,
  maxHrChanged,
  targetTimeChanged,
  programNameChanged,
  programLengthChanged
} from "../../Actions";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <SettingsComponent
        eventName={this.props.eventName}
        onEventNameChanged={this.props.onEventNameChanged}
        eventDate={this.props.eventDate}
        onEventDateChanged={this.props.onEventDateChanged}
        targetTime={this.props.targetTime}
        onTargetTimeChanged={this.props.onTargetTimeChanged}
        programName={this.props.programName}
        onProgramNameChanged={this.props.onProgramNameChanged}
        programLength={this.props.programLength}
        onProgramLengthChanged={this.props.onProgramLengthChanged}
        maxHr={this.props.maxHr}
        onMaxHrChanged={this.props.onMaxHrChanged}
        onGotoToday={() => {
          navigate("Day", { date: DateUtils.currentDate() });
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  const { maxHr, targetEvent, program } = state.settings;
  return {
    eventName: targetEvent.name || undefined,
    eventDate: targetEvent.date || undefined,
    targetTime: program.targetTime,
    programName: program.name,
    programLength: program.length,
    maxHr: maxHr || undefined
  };
};

const mapDispatchToProps = dispatch => ({
  onEventNameChanged: name => dispatch(targetEventNameChanged(name)),
  onEventDateChanged: date => dispatch(targetEventDateChanged(date)),
  onMaxHrChanged: hr => dispatch(maxHrChanged(hr)),
  onTargetTimeChanged: time => dispatch(targetTimeChanged(time)),
  onProgramNameChanged: name => dispatch(programNameChanged(name)),
  onProgramLengthChanged: length => dispatch(programLengthChanged(length))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
