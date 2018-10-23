import React from "react";
import propTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text
} from "react-native";
import DayContentComponent from "./DayContentComponent";
import WeekSummaryComponent from "./WeekSummaryComponent";
import Dimensions from "Dimensions";
import Carousel from "react-native-snap-carousel";
import NoProgram from "../../components/NoProgram";
import { LinearGradient } from "expo";
import Logo from "../../components/Logo";
import Styles from "../../constants/Styles";
import { dateToDateLabel } from "../../utils/Formatters";
import DateUtils from "../../utils/DateUtils";
import { InteractionManager } from "react-native";

export default class DayComponent extends React.Component {
  static propTypes = {
    weekProgram: propTypes.object,
    date: propTypes.string.isRequired,
    targetEvent: propTypes.object.isRequired,
    targetTime: propTypes.number.isRequired,
    maxHr: propTypes.number,
    changeDate: propTypes.func.isRequired
  };

  getActiveDate() {
    const { weekProgram } = this.props;
    const currentDate = DateUtils.currentDate();
    const firstDate = weekProgram.weeks[0].days[0].date;
    const lastDate = weekProgram.weeks.slice(-1)[0].days[6].date;
    if (currentDate < firstDate) return firstDate;
    if (currentDate > lastDate) return lastDate;
    return currentDate;
  }

  _renderDay(day) {
    const { maxHr, targetEvent, targetTime } = this.props;

    return (
      <DayContentComponent
        day={day}
        maxHr={maxHr}
        targetEvent={targetEvent}
        targetTime={targetTime}
      />
    );
  }

  render() {
    const { targetEvent, weekProgram, date, changeDate } = this.props;

    if (weekProgram == null) return <NoProgram />;

    const week = weekProgram.weeks.find(
      week => week.days.findIndex(d => d.date === date) >= 0
    );
    if (week == null) return <NoProgram />;
    let days = weekProgram.weeks
      .map(w => w.days)
      .reduce((a, b) => a.concat(b), []);

    let dayIndex = days.findIndex(day => day.date === date);
    const targetEventDate = dateToDateLabel(targetEvent.date);

    snapToDate = date => {
      if (this._carousel == null) return;
      this._carousel.snapToItem(days.findIndex(day => day.date === date));
    };

    InteractionManager.runAfterInteractions(() => snapToDate(date));

    return (
      <View style={styles.component}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => snapToDate(this.getActiveDate())}>
            <Logo />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={{ ...Styles.largeContent }}>{targetEvent.name}</Text>
            <Text style={{ ...Styles.lightContent }}>{targetEventDate}</Text>
          </View>
        </View>
        <Text style={styles.subheader}>Harjoitusviikko {week.weekNumber}</Text>
        <LinearGradient
          style={{ flex: 1, alignSelf: "stretch", alignItems: "stretch" }}
          colors={["#fff", "#eee", "#fff"]}
        >
          <ScrollView>
            <WeekSummaryComponent
              week={week}
              date={date}
              changeDate={snapToDate}
            />
            <View style={{ flex: 1 }}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={days}
                renderItem={({ item }) => this._renderDay(item)}
                sliderWidth={Dimensions.get("window").width}
                firstItem={dayIndex}
                initialNumToRender={days.length}
                itemWidth={300}
                enableMomentum={true}
                onBeforeSnapToItem={index => changeDate(days[index].date)}
              />
            </View>
          </ScrollView>
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
