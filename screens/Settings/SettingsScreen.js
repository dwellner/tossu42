import React from "react";
import { connect } from "react-redux";
import SettingsComponent from "./SettingsComponent";
import { StyleSheet, ScrollView } from "react-native";

import {
  targetEventNameChanged,
  targetEventDateChanged,
  maxHrChanged,
  targetTimeChanged,
  programIdChanged
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
          programId={this.props.programId}
          onProgramIdChanged={this.props.onProgramIdChanged}
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
  const { name, date } = state.settings.targetEvent;
  const { maxHr, targetTime, programId } = state.settings;
  return { eventName: name, eventDate: date, targetTime, programId, maxHr };
};

const mapDispatchToProps = dispatch => ({
  onEventNameChanged: name => dispatch(targetEventNameChanged(name)),
  onEventDateChanged: date => dispatch(targetEventDateChanged(date)),
  onMaxHrChanged: hr => dispatch(maxHrChanged(hr)),
  onTargetTimeChanged: time => dispatch(targetTimeChanged(time)),
  onProgramIdChanged: id => dispatch(programIdChanged(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
