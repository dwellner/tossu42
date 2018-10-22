import React from "react";
import propTypes from "prop-types";
import { View, ScrollView, Text } from "react-native";
import DayContentComponent from "./DayContentComponent";
import WeekSummaryComponent from "./WeekSummaryComponent";
import Dimensions from "Dimensions";
import Carousel from "react-native-snap-carousel";
import NoProgram from "../../components/NoProgram";
import { LinearGradient } from "expo";
import Logo from "../../components/Logo";
import Styles from "../../constants/Styles";
import { dateToDateLabel } from "../../utils/Formatters";

export default class DayComponent extends React.Component {
  static propTypes = {
    weekProgram: propTypes.object,
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

    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          alignItems: "stretch",
          backgroundColor: "#fff"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "stretch"
          }}
        >
          <Logo />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginLeft: -68
            }}
          >
            <Text style={{ ...Styles.largeContent }}>{targetEvent.name}</Text>
            <Text style={{ ...Styles.lightContent }}>{targetEventDate}</Text>
          </View>
        </View>
        <Text
          style={{
            ...Styles.largeContent,
            marginTop: 0,
            textAlign: "center",
            borderColor: "#eaeaea",
            borderBottomWidth: 1
          }}
        >
          Harjoitusviikko {week.weekNumber}
        </Text>
        <LinearGradient
          style={{ flex: 1, alignSelf: "stretch", alignItems: "stretch" }}
          colors={["#fff", "#eee", "#fff"]}
        >
          <ScrollView>
            <WeekSummaryComponent
              week={week}
              date={date}
              changeDate={changeDate}
            />
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
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
