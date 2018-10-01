import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import ProgramModel from "../../utils/ProgramModel";
import Styles from "../../constants/Styles";
import Formatters from "../../utils/Formatters";
import ProgressBar from "react-native-progress/Bar";
import Colors from "../../constants/Colors";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    const date = new Date().toISOString().substr(0, 10);
    const targetEvent = { name: "Helsinki City Maraton", date: "2018-10-30" };
    const weekProgram = ProgramModel.getWeekProgram(targetEvent.date);
    const targetTime = weekProgram.targetTime;
    this.state = { targetTime, date, targetEvent, weekProgram };
  }

  createWeekComponent(week, index) {
    const { weekProgram,targetEvent } = this.state;
    const weekNumber = weekProgram.weeks.length - index;
    const { navigate } = this.props.navigation;

    const race = weekNumber == 1 ? (<View style={{flex: 1, flexDirection: "row"}}>
      <Text style={{flex: 1}}></Text> 
      <Text style={{...Styles.defaultContent, color: Colors.tintColor, flex: 2}}>{Formatters.dateToDateLabel(targetEvent.date)}</Text>
      <Text style={{...Styles.defaultContent, color: Colors.tintColor, flex: 5, textAlign: "right"}}>{targetEvent.name}</Text>
    </View>): undefined

    return (
      <TouchableOpacity
        key={week.days[0].date}
        onPress={() => navigate('Day', { date: week.days[0].date })}
        style={{
          flex: 1,
          paddingTop: 8,
          paddingBottom: 8,
          borderWidth: 1,
          borderBottomColor: "#777"
        }}
      >
        <View style={{flex: 1, flexDirection: "row",}}>

        <View style={{ flex: 1 }}>
          <Text style={{ ...Styles.defaultContent }}>
            {weekNumber}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ ...Styles.defaultContent }}>
            {Formatters.dateToDateLabel(
              week.days[0].date
            )}
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "flex-end", marginRight: 4 }}>
          <Text style={{ ...Styles.defaultContent }}>
            {week.distance.toFixed(0)} km
          </Text>
        </View>
        <View
          style={{ flex: 3, alignItems: "stretch", justifyContent: "center" }}
        >
          <ProgressBar
            progress={week.intensityLevel}
            height={8}
            width={null}
            color={Colors.intensityFilled}
            unfilledColor={Colors.intensityEmpty}
            borderColor={Colors.barBorder}
            borderWidth={1}
          />
          <ProgressBar
            progress={week.distanceLevel}
            width={null}
            height={8}
            color={Colors.distanceFilled}
            unfilledColor={Colors.distanceEmpty}
            borderColor={Colors.barBorder}
            borderWidth={1}
          />
        </View>
        </View>
        {race}
      </TouchableOpacity>
    );
  }

  render() {
    const { weekProgram } = this.state;

    const weeks = weekProgram.weeks.map((week, index) =>
          this.createWeekComponent(week, index)
    );

    return (
      <ImageBackground
        source={require("../../assets/images/darkroad.png")}
        style={styles.container}
      >
        <View style={{ backgroundColor: "#0009", flex: 1}}>
          <View style={{flex: 1, flexDirection: "row", flex: 0, padding: 8, paddingTop: 30}}>
            <Text style={{ ...Styles.label, flex: 1}}>Vk</Text>
            <Text style={{ ...Styles.label, flex: 2}}>Ajankohta</Text>
            <Text style={{ ...Styles.label, flex: 5, textAlign: "center"}}>Viikon ohjelma</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={{ padding: 8, paddingTop: 0, paddingBottom: 30 }}>{weeks}</View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  }
});
