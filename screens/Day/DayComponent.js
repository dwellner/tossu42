import React from "react";
import propTypes from "prop-types";
import { View, TouchableOpacity, Text } from "react-native";
import DayContentComponent from "./DayContentComponent";
import WeekSummaryComponent from "./WeekSummaryComponent";
import Dimensions from "Dimensions";
import Carousel from "react-native-snap-carousel";
import NoProgram from "../../components/NoProgram";

export default class DayComponent extends React.Component {
  static propTypes = {
    weekProgram: propTypes.object.isRequired,
    date: propTypes.string.isRequired,
    targetEvent: propTypes.object.isRequired,
    targetTime: propTypes.number.isRequired,
    maxHr: propTypes.number,
    changeDate: propTypes.func.isRequired
  };

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
    const { weekProgram, date, changeDate } = this.props;
    if (weekProgram == null) return <NoProgram />;

    const week = weekProgram.weeks.find(
      week => week.days.findIndex(d => d.date === date) >= 0
    );
    if (week == null) return <NoProgram />;
    let days = weekProgram.weeks
      .map(w => w.days)
      .reduce((a, b) => a.concat(b), []);

    let dayIndex = days.findIndex(day => day.date === date);

    return (
      <View style={{ flex: 1, alignItems: "stretch" }}>
        <WeekSummaryComponent week={week} date={date} changeDate={changeDate} />
        <View style={{ flex: 1 }}>
          <Carousel
            data={days}
            renderItem={({ item }) => this._renderDay(item)}
            sliderWidth={Dimensions.get("window").width}
            firstItem={dayIndex}
            initialNumToRender={Math.max(dayIndex, 25)}
            itemWidth={300}
            enableMomentum={true}
            onBeforeSnapToItem={index => changeDate(days[index].date)}
          />
        </View>
      </View>
    );
  }
}
