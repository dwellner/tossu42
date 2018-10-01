import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { TextField } from "react-native-material-textfield";
import Formatters from "../../utils/Formatters";
import EventDatePicker from "./EventDatePicker";
import ProgramService from "../../data/ProgramService";
import Texts from "../../constants/Texts";

const targetTimes = [180, 195, 210, 225, 240, 255, 270, 285, 300];
const heartRates = Array(81)
  .fill()
  .map((_, i) => 220 - i);

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      // TODO: remove this default, handle unnamed event
      eventName: "Helsinki City Maraton",
      eventDate: new Date().toISOString().substr(0, 10), // TODO: remove default, handle undefined
      targetTime: 240,
      programId: "tossu_2018_24_400",
      heartRate: undefined
    };
  }

  onChangeTargetTime(newTargetTime) {
    const { programId } = this.state;
    const validPrograms = ProgramService.getProgramsByTargetTime(
      newTargetTime
    ).map(p => p.id);
    const newProgramId =
      validPrograms.indexOf(programId) >= 0
        ? programId
        : ProgramService.getBestMatch(newTargetTime).id;
    this.setState(() => ({
      targetTime: newTargetTime,
      programId: newProgramId
    }));
  }

  createTargetEventSection() {
    const { eventName, eventDate } = this.state;

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
          onChangeText={v => this.setState({ eventName: v })}
        />
        <EventDatePicker
          value={eventDate}
          onChange={date => this.setState({ eventDate: date })}
        />
      </View>
    );
  }

  createProgramSection() {
    const { targetTime, programId } = this.state;
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
          data={targetTimes.map(v => ({
            value: v,
            label: Formatters.minutesToTimeLabel(v)
          }))}
          value={targetTime}
          onChangeText={v => this.onChangeTargetTime(v)}
        />

        <Dropdown
          label={Texts.labels.program}
          data={ProgramService.getProgramsByTargetTime(targetTime)}
          value={programId}
          labelExtractor={p => p.name}
          valueExtractor={p => p.id}
          onChangeText={p => this.setState({ program: p.programId })}
        />
      </View>
    );
  }

  createMetadataSection() {
    const { heartRate } = this.state;

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
          data={heartRates.map(r => ({ value: r }))}
          value={heartRate}
          onChangeText={v => this.setState({ heartRate: v })}
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
        <View style={{flex: 1}}>{sections}</View>
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
