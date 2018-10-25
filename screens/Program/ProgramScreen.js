import React from "react";
import { connect } from "react-redux";
import { Labels } from "../../constants/Texts";
import ProgramComponent from "./ProgramComponent";
import ProgramModel from "../../utils/ProgramModel";
import DateUtils from "../../utils/DateUtils";
import NoProgram from "../../components/NoProgram";

class ProgramScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { targetEvent, weekProgram } = this.props;
    const { navigate } = this.props.navigation;

    if (weekProgram === null) return <NoProgram />;

    return (
      <ProgramComponent
        targetEvent={targetEvent}
        weekProgram={weekProgram}
        date={DateUtils.currentDate()}
        onWeekClicked={date => navigate("Day", { date })}
        onGotoToday={() => {
          navigate("Day", { date: DateUtils.currentDate() });
        }}

      />
    );
  }
}

const mapStateToProps = state => {
  const { program } = state.settings;
  const targetEvent = {
    ...state.settings.targetEvent,
    name: state.settings.targetEvent.name || Labels.nextMaraton
  };
  const weekProgram = ProgramModel.getWeekProgram(targetEvent.date, program);
  return { targetEvent, weekProgram };
};

export default connect(mapStateToProps)(ProgramScreen);
