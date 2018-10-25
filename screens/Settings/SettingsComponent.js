import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo";
import StyledDropdown from "../../components/StyledDropDown";

import DateUtils from "../../utils/DateUtils";
import { minutesToTimeLabel, dateToDateLabel } from "../../utils/Formatters";
import EventDatePicker from "./EventDatePicker";
import ProgramService from "../../data/ProgramService";
import { Labels } from "../../constants/Texts";
import Styles from "../../constants/Styles";
import StyledTextField from "../../components/StyledTextField";
import Colors from "../../constants/Colors";
import Circle from "../../components/Circle";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

const SessionCircle = ({ content }) => (
  <View style={{ alignSelf: "stretch", alignItems: "center" }}>
    <Circle
      content={content}
      radius={40}
      color={Colors.tintColor}
      style={{
        marginTop: -20,
        marginBottom: -20,
        zIndex: 1
      }}
    />
  </View>
);

const TargetEventSection = ({ name, onNameChanged, date, onDateChanged }) => (
  <View style={styles.section}>
    <EventDatePicker value={date} onChange={onDateChanged} />
    <Text style={styles.sectionSubHeader}>{Labels.settingsGoalSubHeader}</Text>

    <StyledTextField
      label={Labels.eventName}
      value={name}
      onChange={onNameChanged}
    />
  </View>
);

const TargetTimeSection = ({ targetTime, onTargetTimeChanged }) => (
  <View style={styles.section}>
    <StyledDropdown
      label={Labels.targetTime}
      data={[180, 195, 210, 225, 240, 255, 270, 285, 300]}
      valueFormatter={minutesToTimeLabel}
      value={targetTime}
      onChange={onTargetTimeChanged}
    />
  </View>
);

const ProgramSection = ({
  eventDate,
  targetTime,
  programName,
  onProgramNameChanged,
  programLength,
  onProgramLengthChanged
}) => {
  const programNames = ProgramService.getProgramNames(targetTime);

  const toStartDate = len => DateUtils.nextDate(eventDate, len * -7);
  const toStartDateLabel = len => dateToDateLabel(toStartDate(len));
  const toLengthLabel = length => {
    const startAt =
      eventDate != null
        ? ` (${Labels.startingAt} ${toStartDateLabel(length)})`
        : "";
    return `${length} ${Labels.weeks}.${startAt}`;
  };

  const programLengths = ProgramService.getProgramLengths(
    targetTime,
    programName
  );
  return (
    <View style={styles.section}>
      <StyledDropdown
        label={Labels.program}
        data={programNames}
        value={programName}
        onChange={onProgramNameChanged}
      />

      <StyledDropdown
        label={Labels.programDuration}
        data={programLengths}
        value={programLength}
        valueFormatter={toLengthLabel}
        onChange={onProgramLengthChanged}
      />
    </View>
  );
};

const MetadataSection = ({ maxHr, onMaxHrChanged }) => {
  const heartRates = Array(81)
    .fill()
    .map((_, i) => 220 - i);

  return (
    <View style={[styles.section, { marginTop: 48 }]}>
      <StyledDropdown
        label={Labels.maxHeartRate}
        data={heartRates}
        value={maxHr || undefined}
        valueFormatter={v => `${v} bpm`}
        onChange={onMaxHrChanged}
      />

      <Text style={styles.sectionSubHeader}>
        {Labels.settingsMetaSubHeader}
      </Text>
    </View>
  );
};

export default class SettingsComponent extends React.Component {
  static propTypes = {
    eventName: PropTypes.string,
    onEventNameChanged: PropTypes.func.isRequired,

    eventDate: PropTypes.string,
    onEventDateChanged: PropTypes.func.isRequired,

    targetTime: PropTypes.number.isRequired,
    onTargetTimeChanged: PropTypes.func.isRequired,

    programName: PropTypes.string.isRequired,
    onProgramNameChanged: PropTypes.func.isRequired,

    programLength: PropTypes.number.isRequired,
    onProgramLengthChanged: PropTypes.func.isRequired,

    maxHr: PropTypes.number,
    onMaxHrChanged: PropTypes.func.isRequired,

    onGotoToday: PropTypes.func.isRequired
  };

  render() {

    return (
      <LinearGradient
        style={styles.component}
        colors={["#fff", "#eee", "#fff"]}
      >
        <View style={{ alignSelf: "stretch", alignItems: "flex-start" }}>
          <Logo onPress={this.props.onGotoToday}/>
        </View>

        <View style={styles.header}>
          <Text style={{ ...Styles.strongLargeContent }}>Harjoitusohjelma</Text>
          <Text style={{ ...Styles.lightContent }}>Aseta harjoitusohjelma</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <TargetEventSection
            name={this.props.eventName}
            onNameChanged={this.props.onEventNameChanged}
            date={this.props.eventDate}
            onDateChanged={this.props.onEventDateChanged}
          />

          <SessionCircle content={"+"} />

          <TargetTimeSection
            targetTime={this.props.targetTime}
            onTargetTimeChanged={this.props.onTargetTimeChanged}
          />

          <SessionCircle content={"v"} />

          <ProgramSection
            eventDate={this.props.eventDate}
            targetTime={this.props.targetTime}
            programName={this.props.programName}
            onProgramNameChanged={this.props.onProgramNameChanged}
            programLength={this.props.programLength}
            onProgramLengthChanged={this.props.onProgramLengthChanged}
          />
          <MetadataSection
            maxHr={this.props.maxHr}
            onMaxHrChanged={this.props.onMaxHrChanged}
          />

          <View
            style={[styles.section, { alignItems: "center", marginTop: 48 }]}
          >
            <Button
              label="Valmis"
              onPress={this.props.onGotoToday}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch"
  },

  header: { margin: 16 },

  section: {
    marginLeft: 24,
    marginRight: 24,
    padding: 48,
    backgroundColor: "#fff"
  },
  sectionSubHeader: {
    ...Styles.lightContent,
    textAlign: "center"
  }
});
