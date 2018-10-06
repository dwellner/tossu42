import React from "react";
import { connect } from "react-redux";
import SettingsComponent from "./SettingsComponent";
import { StyleSheet, ScrollView } from "react-native";

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
    return (
      <ScrollView style={styles.container}>
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
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50
  }
});

const mapStateToProps = state => {
  const { maxHr, targetEvent, program } = state.settings;
  return {
    eventName: targetEvent.name,
    eventDate: targetEvent.date,
    targetTime: program.targetTime,
    programName: program.name,
    programLength: program.length,
    maxHr
  };
};

const mapDispatchToProps = dispatch => ({
  onEventNameChanged: name => dispatch(targetEventNameChanged(name)),
  onEventDateChanged: date => dispatch(targetEventDateChanged(date)),
  onMaxHrChanged: hr => dispatch(maxHrChanged(hr)),
  onTargetTimeChanged: time => dispatch(targetTimeChanged(time)),
  onProgramNameChanged: id => dispatch(programNameChanged(id)),
  onProgramLengthChanged: id => dispatch(programLengthChanged(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
