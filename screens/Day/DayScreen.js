import React from "react";
import { connect } from "react-redux";
import DayComponent from "./DayComponent";
import Texts from "../../constants/Texts";
import { ScrollView, View } from "react-native";
import DayHeaderComponent from "./DayHeaderComponent";
import ProgramModel from "../../utils/ProgramModel";
import DateUtils from "../../utils/DateUtils";
import NoProgram from "../../components/NoProgram";
import BackgroundContainer from "../../components/BackgroundContainer";

class DayScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  selectDate(date) {
    this.props.navigation.setParams({ date: date });
  }

  render() {
    const date = this.props.navigation.getParam("date", DateUtils.currentDate);

    const { targetEvent, targetTime, maxHr, weekProgram } = this.props;
    if (weekProgram === null) return <NoProgram />;

    const week =
      weekProgram !== null
        ? weekProgram.weeks.find(
            week => week.days.findIndex(d => d.date === date) >= 0
          )
        : undefined;

    const viewContent =
      week !== undefined ? (
        <DayComponent
          date={date}
          week={week}
          maxHr={maxHr}
          targetTime={targetTime}
          changeDate={date => this.selectDate(date)}
        />
      ) : (
        undefined
      );

    return (
      <BackgroundContainer>
        <View style={{ height: 190 }}>
          <DayHeaderComponent
            weekProgram={weekProgram}
            targetEvent={targetEvent}
            date={date}
            changeDate={date => this.selectDate(date)}
          />
        </View>
        <ScrollView>{viewContent}</ScrollView>
      </BackgroundContainer>
    );
  }
}

const mapStateToProps = state => {
  const { maxHr, program } = state.settings;
  const { targetTime } = program;
  const targetEvent = {
    ...state.settings.targetEvent,
    name: state.settings.targetEvent.name || Texts.labels.nextMaraton
  };
  const weekProgram = ProgramModel.getWeekProgram(targetEvent.date, program);
  return { targetEvent, targetTime, weekProgram, maxHr };
};

export default connect(mapStateToProps)(DayScreen);
