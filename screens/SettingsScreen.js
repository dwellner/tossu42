import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { TextField } from "react-native-material-textfield";
import Formatters from "../utils/Formatters";
import Styles from "../constants/Styles";

import ProgramService from "../data/ProgramService";

const targetTimes = [180, 195, 210, 225, 240, 255, 270, 285, 300];
const heartRates = Array(81)
  .fill()
  .map((_, i) => 220 - i);

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: <View style={{ paddingBottom: 60 }} />
  };

  constructor(props) {
    super(props);
    this.state = {
      eventName: "Helsinki City Maraton",
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

  render() {
    const { eventName, targetTime, programId, heartRate } = this.state;

    const data = [
      { value: 44, label: "first" },
      { value: 55, label: "second" },
      { value: 33, label: "third" }
    ];

    return (
      <ScrollView>
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
            <Text style={{ fontSize: 16, color: "#777"}}>
              Juoksuohjelma räätelöidään sinua varten tapahtuman ajankohdasta taaksepäin.    
            </Text>

            <TextField
              label="Tapahtuman nimi"
              maxLength={30}
              value={eventName}
              onChangeText={v => this.setState({ eventName: v })}
            />
            <Dropdown label="Ajankohta" data={data} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>
              Miten haluaisit valmistautua?
            </Text>
            <Text style={{ fontSize: 16, color: "#777"}}>
              Valitse ensin itselle sopiva tavoiteaika maratonille. Tossu42 ehdottaa tavoitteellesi sopivimmat juoksuohjelmat.    
            </Text>

            <Dropdown
              label="Tavoiteaika"
              data={targetTimes.map(v => ({
                value: v,
                label: Formatters.minutesToTimeLabel(v)
              }))}
              value={targetTime}
              onChangeText={v => this.onChangeTargetTime(v)}
            />

            <Dropdown
              label="Juoksuohjelma"
              data={ProgramService.getProgramsByTargetTime(targetTime)}
              value={programId}
              labelExtractor={p => p.name}
              valueExtractor={p => p.id}
              onChangeText={p => this.setState({ program: p.programId })}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Raja-arvot</Text>
            <Text style={{ fontSize: 16, color: "#777"}}>
              Maksimisykeen avulla voidaan laskea harjoituksille sykealueet
            </Text>
            <Dropdown
              label="Maksimisyke"
              data={heartRates.map(r => ({ value: r }))}
              value={heartRate}
              onChangeText={v => this.setState({ heartRate: v })}
            />
          </View>
        </View>
      </ScrollView>
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
  }
});
