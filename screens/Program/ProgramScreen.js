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
    const targetEvent = { name: "Helsinki City Maraton", date: "2018-09-30" };
    const weekProgram = ProgramModel.getWeekProgram(targetEvent.date);
    const targetTime = weekProgram.targetTime;
    this.state = { targetTime, date, targetEvent, weekProgram };
  }

  createWeekComponent(week, index) {
    const { weekProgram } = this.state;

    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        key={week.days[0].date}
        onPress={() => navigate('Day', { date: week.days[0].date })}
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 8,
          paddingBottom: 8,
          borderWidth: 1,
          borderBottomColor: "#777"
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...Styles.defaultContent, fontSize: 20 }}>
            {weekProgram.weeks.length - index}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ ...Styles.defaultContent, fontSize: 20 }}>
            {Formatters.dateRangetoLabel(
              week.days[0].date,
              week.days.slice(-1)[0].date
            )}
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <Text style={{ ...Styles.defaultContent, fontSize: 20 }}>
            {week.distance.toFixed(0)} km
          </Text>
        </View>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <ProgressBar
            progress={week.intensityLevel}
            width={80}
            height={8}
            color={Colors.intensityFilled}
            unfilledColor={Colors.intensityEmpty}
            borderColor={Colors.barBorder}
            borderWidth={1}
          />
          <ProgressBar
            progress={week.distanceLevel}
            width={80}
            height={8}
            color={Colors.distanceFilled}
            unfilledColor={Colors.distanceEmpty}
            borderColor={Colors.barBorder}
            borderWidth={1}
          />
        </View>
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
        <View style={{ backgroundColor: "#0009" }}>
          <ScrollView>
            <View style={{ padding: 8, paddingTop: 30 }}>{weeks}</View>
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
