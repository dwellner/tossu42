import React from "react";
import propTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import WeekSummaryComponent from "./WeekSummaryComponent";
import NoProgram from "../../components/NoProgram";
import { LinearGradient } from "expo";
import Logo from "../../components/Logo";
import Styles from "../../constants/Styles";
import { dateToDateLabel } from "../../utils/Formatters";
import DateUtils from "../../utils/DateUtils";
import DayCarousel from "./DayCarouselComponent";

export default class DayComponent extends React.Component {
  static propTypes = {
    weekProgram: propTypes.object,
    date: propTypes.string.isRequired,
    targetEvent: propTypes.object.isRequired,
    targetTime: propTypes.number.isRequired,
    maxHr: propTypes.number,
    changeDate: propTypes.func.isRequired
  };

  /** returns current date if within program, otherwise programs first or last date depending on whichever is closest */
  getActiveDate() {
    const { weekProgram } = this.props;
    const currentDate = DateUtils.currentDate();
    const firstDate = weekProgram.weeks[0].days[0].date;
    const lastDate = weekProgram.weeks.slice(-1)[0].days[6].date;
    if (currentDate < firstDate) return firstDate;
    if (currentDate > lastDate) return lastDate;
    return currentDate;
  }

  render() {
    const {
      targetEvent,
      targetTime,
      weekProgram,
      date,
      changeDate,
      maxHr
    } = this.props;

    if (weekProgram == null) return <NoProgram />;
    const weekIndex = weekProgram.weeks.findIndex(
      week => week.days.findIndex(d => d.date === date) >= 0
    );
    if (weekIndex < 0) return <NoProgram />;

    const week = weekProgram.weeks[weekIndex];
    const targetEventDate = dateToDateLabel(targetEvent.date);

    return (
      <View style={styles.component}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => changeDate(this.getActiveDate())}>
            <Logo />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={{ ...Styles.largeContent }}>{targetEvent.name}</Text>
            <Text style={{ ...Styles.lightContent }}>{targetEventDate}</Text>
          </View>
        </View>
        <Text style={styles.subheader}>Harjoitusviikko {week.weekNumber}</Text>
        <LinearGradient colors={["#fff", "#eee", "#fff"]}>
          <WeekSummaryComponent
            week={week}
            date={date}
            changeDate={changeDate}
          />
          <DayCarousel
            weeks={weekProgram.weeks}
            date={date}
            targetEvent={targetEvent}
            targetTime={targetTime}
            maxHr={maxHr}
            changeDate={changeDate}
          />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "stretch",
    backgroundColor: "#fff"
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "stretch"
  },

  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    marginLeft: -68
  },

  subheader: {
    ...Styles.largeContent,
    marginTop: 0,
    textAlign: "center",
    borderColor: "#eaeaea",
    borderBottomWidth: 1
  }
});
