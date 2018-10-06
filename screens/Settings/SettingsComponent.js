import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { TextField } from "react-native-material-textfield";

import Formatters from "../../utils/Formatters";
import EventDatePicker from "./EventDatePicker";
import ProgramService from "../../data/ProgramService";
import Texts from "../../constants/Texts";

const TargetEventSection = ({ name, onNameChanged, date, onDateChanged }) => (
  <View key="target" style={styles.section}>
    <Text style={styles.sectionHeader}>{Texts.labels.settingsGoalHeader}</Text>
    <Text style={styles.sectionSubHeader}>
      {Texts.labels.settingsGoalSubHeader}
    </Text>

    <TextField
      label={Texts.labels.eventName}
      maxLength={30}
      value={name}
      onChangeText={onNameChanged}
    />
    <EventDatePicker value={date} onChange={onDateChanged} />
  </View>
);

const targetTimes = [180, 195, 210, 225, 240, 255, 270, 285, 300].map(v => ({
  value: v,
  label: Formatters.minutesToTimeLabel(v)
}));

const ProgramSection = ({
  targetTime,
  onTargetTimeChanged,
  programName,
  onProgramNameChanged,
  programLength,
  onProgramLengthChanged
}) => {
  const unique = arr => [...new Set(arr)];

  const range = (min, max) =>
    Array(max - min)
      .fill()
      .map((_, i) => i + min);

  const programNames = unique(
    ProgramService.getPrograms(targetTime).map(p => p.name)
  ).map(name => ({
    value: name
  }));

  const getValidProgramLengths = p =>
    p.stretchRules !== undefined
      ? range(p.stretchRules.minWeeks, p.stretchRules.maxWeeks + 1)
      : [p.weeks.length];

  const programLengths = unique(
    ProgramService.getPrograms(targetTime, programName).map(
      getValidProgramLengths
    )
  )
    .reduce((a, b) => a.concat(b), [])
    .map(length => ({
      value: length,
      label: `${length} viikkoa`
    }));
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
        onChangeText={onTargetTimeChanged}
      />

      <Dropdown
        label={Texts.labels.program}
        data={programNames}
        value={programName}
        onChangeText={onProgramNameChanged}
      />

      <Dropdown
        label={"Ohjelman kesto"}
        data={programLengths}
        value={programLength}
        onChangeText={onProgramLengthChanged}
      />
    </View>
  );
};

const heartRates = Array(81)
  .fill()
  .map((_, i) => ({ value: 220 - i }));

const MetadataSection = ({ maxHr, onMaxHrChanged }) => (
  <View key="meta" style={styles.section}>
    <Text style={styles.sectionHeader}>{Texts.labels.settingsMetaHeader}</Text>
    <Text style={styles.sectionSubHeader}>
      {Texts.labels.settingsMetaSubHeader}
    </Text>
    <Dropdown
      label={Texts.labels.maxHeartRate}
      data={heartRates}
      value={maxHr}
      onChangeText={onMaxHrChanged}
    />
  </View>
);

export default class SettingsScreen extends React.Component {
  static propTypes = {
    eventName: PropTypes.string.isRequired,
    onEventNameChanged: PropTypes.func.isRequired,

    eventDate: PropTypes.string.isRequired,
    onEventDateChanged: PropTypes.func.isRequired,

    targetTime: PropTypes.number.isRequired,
    onTargetTimeChanged: PropTypes.func.isRequired,

    programName: PropTypes.string.isRequired,
    onProgramNameChanged: PropTypes.func.isRequired,

    programLength: PropTypes.number.isRequired,
    onProgramLengthChanged: PropTypes.func.isRequired,

    maxHr: PropTypes.number.isRequired,
    onMaxHrChanged: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TargetEventSection
          name={this.props.eventName}
          onNameChanged={this.props.onEventNameChanged}
          date={this.props.eventDate}
          onDateChanged={this.props.onEventDateChanged}
        />
        <ProgramSection
          targetTime={this.props.targetTime}
          onTargetTimeChanged={this.props.onTargetTimeChanged}
          programName={this.props.programName}
          onProgramNameChanged={this.props.onProgramNameChanged}
          programLength={this.props.programLength}
          onProgramLengthChanged={this.props.onProgramLengthChanged}
        />
        <MetadataSection
          maxHr={this.props.maxHr}
          onMaxHrChanged={this.props.onMaxHrChanged}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
