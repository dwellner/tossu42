import React from "react";
import propTypes from "prop-types";
import DayContentComponent from "./DayContentComponent";
import Dimensions from "Dimensions";
import Carousel from "react-native-snap-carousel";

export default class DayCarousel extends React.Component {
  static propTypes = {
    weeks: propTypes.array.isRequired,
    date: propTypes.string.isRequired,
    targetEvent: propTypes.object.isRequired,
    targetTime: propTypes.number.isRequired,
    maxHr: propTypes.number,
    changeDate: propTypes.func.isRequired
  };

  /** returns 7 days for current week + last day from previous week (if any) and first day of next week (if any) */
  getCarouselDays() {
    const { weeks, date } = this.props;
    const weekIndex = weeks.findIndex(
      week => week.days.findIndex(d => d.date === date) >= 0
    );

    let days = [];
    if (weekIndex > 0) {
      const prevWeekDays = weekIndex < weeks.length - 1 ? 1 : 2;
      days.push(...weeks[weekIndex - 1].days.slice(7 - prevWeekDays, 7));
    }
    days.push(...weeks[weekIndex].days);
    if (weekIndex < weeks.length - 1) {
      const nextWeekDays = weekIndex > 0 ? 1 : 2;
      days.push(...weeks[weekIndex + 1].days.slice(0, nextWeekDays));
    }
    return days;
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
    const { date, changeDate } = this.props;
    const days = this.getCarouselDays();
    let dayIndex = days.findIndex(day => day.date === date);

    return (
      <Carousel
        data={days}
        renderItem={({ item }) => this._renderDay(item)}
        sliderWidth={Dimensions.get("window").width}
        firstItem={dayIndex}
        initialNumToRender={days.length}
        itemWidth={300}
        onBeforeSnapToItem={index => changeDate(days[index].date)}
      />
    );
  }
}
