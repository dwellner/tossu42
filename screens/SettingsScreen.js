import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import ProgramService from "../data/ProgramService";

const programs = ProgramService.getAll();

const targetTimes = [180, 195, 210, 225, 240, 255, 270, 285, 300];

const toTimeLabel = mins => {
  const h = Math.trunc(mins / 60).toFixed(0);
  const m = `${mins % 60}`.padStart(2, "0");
  return `${h}:${m}`;
};

const getFilteredPrograms = targetTime =>
  programs.filter(
    p => p.targetTime >= targetTime - 30 && p.targetTime <= targetTime + 30
  );

const getBestMatchedProgram = targetTime => {
  return programs
    .map(p => ({ id: p.id, diff: Math.abs(p.targetTime - targetTime) }))
    .reduce((a, b) => (a.diff < b.diff ? a : b)).id;
};

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: <View style={{ paddingBottom: 60 }} />
  };

  constructor(props) {
    super(props);
    this.state = { targetTime: 240, programId: "tossu_2018_24_400" };
  }

  onChangeTargetTime(newTargetTime) {
    const { programId } = this.state;
    const validPrograms = getFilteredPrograms(newTargetTime).map(p => p.id);
    const newProgramId =
      validPrograms.indexOf(programId) >= 0
        ? programId
        : getBestMatchedProgram(newTargetTime);
    this.setState(() => ({
      targetTime: newTargetTime,
      programId: newProgramId
    }));
  }

  render() {
    const { targetTime, programId } = this.state;

    const data = [
      { value: 44, label: "first" },
      { value: 55, label: "second" },
      { value: 33, label: "third" }
    ];

    return (
      <View
        style={{
          flex: 1,
          padding: 8
        }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Mitä maraton aiot juosta seuraavaksi?
          </Text>
          <Dropdown label="Tapahtuman nimi" data={data} />
          <Dropdown label="Ajankohta" data={data} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Miten haluaisit valmistautua?
          </Text>

          <Dropdown
            label="Tavoiteaika"
            data={targetTimes.map(v => ({ value: v, label: toTimeLabel(v) }))}
            value={targetTime}
            onChangeText={v => this.onChangeTargetTime(v)}
          />

          <Dropdown
            label="Juoksuohjelma"
            data={getFilteredPrograms(targetTime)}
            value={programId}
            labelExtractor={p => p.name}
            valueExtractor={p => p.id}
            onChangeText={p => this.setState({ program: p.programId })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Raja-arvot
          </Text>

          <Dropdown label="Maksimisyke" data={data} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: 48
  },
  sectionHeader: {
    fontSize: 20
  }
});
