import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo";
import StyledDropdown from "../../components/StyledDropDown";

import DateUtils from "../../utils/DateUtils";
import { minutesToTimeLabel, dateToDateLabel } from "../../utils/Formatters";
import EventDatePicker from "./EventDatePicker";
import ProgramService from "../../data/ProgramService";
import Texts from "../../constants/Texts";
import Styles from "../../constants/Styles";
import StyledTextField from "../../components/StyledTextField";
import Colors from "../../constants/Colors";

const SessionCircle = ({ content, radius = 40 }) => (
  <View style={{ alignSelf: "stretch", alignItems: "center" }}>
    <View
      style={{
        height: 2 * radius,
        width: 2 * radius,
        backgroundColor: Colors.tintColor,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -0.5 * radius,
        marginBottom: -0.5 * radius,
        zIndex: 1
      }}
    >
      <Text style={{ ...Styles.largeContent }}>{content}</Text>
    </View>
  </View>
);

const TargetEventSection = ({ name, onNameChanged, date, onDateChanged }) => (
  <View style={styles.section}>
    <EventDatePicker value={date} onChange={onDateChanged} />
    <Text style={styles.sectionSubHeader}>
      {Texts.labels.settingsGoalSubHeader}
    </Text>

    <StyledTextField
      label={Texts.labels.eventName}
      value={name}
      onChange={onNameChanged}
    />
  </View>
);

const TargetTimeSection = ({ targetTime, onTargetTimeChanged }) => (
  <View style={styles.section}>
    <StyledDropdown
      label={Texts.labels.targetTime}
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
        ? ` (${Texts.labels.startingAt} ${toStartDateLabel(length)})`
        : "";
    return `${length} ${Texts.labels.weeks}.${startAt}`;
  };

  const programLengths = ProgramService.getProgramLengths(
    targetTime,
    programName
  );
  return (
    <View style={styles.section}>
      <StyledDropdown
        label={Texts.labels.program}
        data={programNames}
        value={programName}
        onChangeText={onProgramNameChanged}
      />

      <StyledDropdown
        label={Texts.labels.programDuration}
        data={programLengths}
        value={programLength}
        valueFormatter={toLengthLabel}
        onChangeText={onProgramLengthChanged}
      />
    </View>
  );
};

const MetadataSection = ({ maxHr, onMaxHrChanged }) => {
  const heartRates = Array(81)
    .fill()
    .map((_, i) => 220 - i);

  return (
    <View style={{ marginTop: 48 }}>
      <View style={styles.section}>
        <StyledDropdown
          label={Texts.labels.maxHeartRate}
          data={heartRates}
          value={maxHr || undefined}
          valueFormatter={v => `${v} bpm`}
          onChange={onMaxHrChanged}
        />

        <Text style={styles.sectionSubHeader}>
          {Texts.labels.settingsMetaSubHeader}
        </Text>
      </View>
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
    onMaxHrChanged: PropTypes.func.isRequired
  };

  render() {
    return (
      <LinearGradient
        style={styles.component}
        colors={["#fff", "#eee", "#fff"]}
      >
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
