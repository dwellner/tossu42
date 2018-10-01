import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { TextField } from "react-native-material-textfield";
import Formatters from "../utils/Formatters";
import Styles from "../constants/Styles";
import DateTimePicker from "react-native-modal-datetime-picker";

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
      // TODO: remove this default, handle unnamed event
      eventName: "Helsinki City Maraton",
      eventDate: new Date().toISOString().substr(0,10), // TODO: this should be default everywhere
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

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _confirmDatePicked = date => {
    this.setState(() => ({
      eventDate: date.toISOString().substr(0, 10),
      isDateTimePickerVisible: false
    }));
  };
  render() {
    const {
      eventName,
      eventDate,
      targetTime,
      programId,
      heartRate
    } = this.state;

    console.log(eventDate);

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
            <Text style={{ fontSize: 16, color: "#777" }}>
              Juoksuohjelma räätelöidään sinua varten tapahtuman ajankohdasta
              taaksepäin.
            </Text>

            <TextField
              label="Tapahtuman nimi"
              maxLength={30}
              value={eventName}
              onChangeText={v => this.setState({ eventName: v })}
            />
            <TouchableOpacity onPress={() => this._showDateTimePicker()}>
              <TextField
                editable={false}
                label="Ajankohta"
                value={Formatters.dateToDateLabel(eventDate)}
                onBlur={() => this._showDateTimePicker()}
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={date => this._confirmDatePicked(date)}
              onCancel={this._hideDateTimePicker}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>
              Miten haluaisit valmistautua?
            </Text>
            <Text style={{ fontSize: 16, color: "#777" }}>
              Valitse ensin itselle sopiva tavoiteaika maratonille. Tossu42
              ehdottaa tavoitteellesi sopivimmat juoksuohjelmat.
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
            <Text style={{ fontSize: 16, color: "#777" }}>
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
