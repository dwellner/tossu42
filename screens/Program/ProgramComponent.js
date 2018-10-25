import React from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { Labels } from "../../constants/Texts";
import ProgramWeekComponent from "./ProgramWeekComponent";
import { LinearGradient } from "expo";
import Logo from "../../components/Logo";

const Header = () => (
  <View
    style={{
      margin: 16,
      alignItems: "stretch"
    }}
  >
    <Text style={{ ...Styles.strongLargeContent, textAlign: "center" }}>
      {Labels.programHeader}
    </Text>
    <Text style={{ ...Styles.defaultContent, textAlign: "center" }}>
      {Labels.programGuide}
    </Text>
  </View>
);

export default class ProgramComponent extends React.Component {
  static propTypes = {
    weekProgram: PropTypes.object.isRequired,
    targetEvent: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    onWeekClicked: PropTypes.func.isRequired
  };

  render() {
    const { date, weekProgram, targetEvent, onWeekClicked } = this.props;

    const weeks = weekProgram.weeks.map((week, index) => {
      const isCurrent = week.days.findIndex(day => day.date === date) >= 0;
      const isPast = week.days[6].date < date;

      const itemStyles = isCurrent
        ? [styles.listItem, styles.currentItem]
        : styles.listItem;
      return (
        <TouchableOpacity
          key={week.days[0].date}
          onPress={() => onWeekClicked(week.days[0].date)}
          style={itemStyles}
        >
          <ProgramWeekComponent
            targetEvent={targetEvent}
            weekNumber={week.weekNumber}
            week={week}
            isPast={isPast}
          />
        </TouchableOpacity>
      );
    });

    return (
      <LinearGradient
        style={{ flex: 1, alignSelf: "stretch" }}
        colors={["#fff", "#eee", "#fff"]}
      >
        <Logo />
        <Header />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.listContainer}>{weeks}</View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 30
  },

  listItem: {
    flex: 1,
    marginTop: 16,
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: "#fff"
  },

  currentItem: {
    borderColor: Colors.tintColor,
    borderWidth: 2
  }
});
