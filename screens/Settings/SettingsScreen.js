import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { TextField } from "react-native-material-textfield";

import {
  targetEventNameChanged,
  targetEventDateChanged,
  maxHrChanged,
  targetTimeChanged,
  programIdChanged
} from "../../Actions";
import Formatters from "../../utils/Formatters";
import EventDatePicker from "./EventDatePicker";
import ProgramService from "../../data/ProgramService";
import Texts from "../../constants/Texts";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  createTargetEventSection() {
    const { eventName, eventDate } = this.props;

    return (
      <View key="target" style={styles.section}>
        <Text style={styles.sectionHeader}>
          {Texts.labels.settingsGoalHeader}
        </Text>
        <Text style={styles.sectionSubHeader}>
          {Texts.labels.settingsGoalSubHeader}
        </Text>

        <TextField
          label={Texts.labels.eventName}
          maxLength={30}
          value={eventName}
          onChangeText={this.props.onEventNameChanged}
        />
        <EventDatePicker
          value={eventDate}
          onChange={this.props.onEventDateChanged}
        />
      </View>
    );
  }

  createProgramSection() {
    const targetTimes = [180, 195, 210, 225, 240, 255, 270, 285, 300].map(
      v => ({
        value: v,
        label: Formatters.minutesToTimeLabel(v)
      })
    );

    let {  } = this.props;

    const { targetTime, programId } = this.props;

    return (
      <View key="program" style={styles.section}>
        <Text style={styles.sectionHeader}>
          {Texts.labels.settingsProgramHeader}
        </Text>
        <Text style={styles.sectionSubHeader}>
          {Texts.labels.settingsProgramSubHeader}
        </Text>

        <Dropdown
          label={Texts.labels.targetTime}
          data={targetTimes}
          value={targetTime}
          onChangeText={this.props.onTargetTimeChanged}
        />

        <Dropdown
          label={Texts.labels.program}
          data={ProgramService.getProgramsByTargetTime(targetTime)}
          value={programId}
          labelExtractor={p => p.name}
          valueExtractor={p => p.id}
          onChangeText={this.props.onProgramIdChanged}
        />
      </View>
    );
  }

  createMetadataSection() {
    const heartRates = Array(81)
      .fill()
      .map((_, i) => ({ value: 220 - i }));

    const { maxHr } = this.props;

    return (
      <View key="meta" style={styles.section}>
        <Text style={styles.sectionHeader}>
          {Texts.labels.settingsMetaHeader}
        </Text>
        <Text style={styles.sectionSubHeader}>
          {Texts.labels.settingsMetaSubHeader}
        </Text>
        <Dropdown
          label={Texts.labels.maxHeartRate}
          data={heartRates}
          value={maxHr}
          onChangeText={this.props.onMaxHrChanged}
        />
      </View>
    );
  }

  createSections() {
    return [
      this.createTargetEventSection(),
      this.createProgramSection(),
      this.createMetadataSection()
    ];
  }

  render() {
    const sections = this.createSections();
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>{sections}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50
  },

  section: {
    paddingBottom: 48
  },
  sectionHeader: {
    fontSize: 20,
    marginBottom: 16
  },
  sectionSubHeader: {
    fontSize: 16,
    color: "#777"
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
