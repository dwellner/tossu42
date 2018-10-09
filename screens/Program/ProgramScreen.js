import React from "react";
import { connect } from "react-redux";
import Texts from "../../constants/Texts";
import ProgramComponent from "./ProgramComponent";
import ProgramModel from "../../utils/ProgramModel";
import NoProgram from "../../components/NoProgram";
import BackgroundContainer from "../../components/BackgroundContainer";

class ProgramScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { targetEvent, weekProgram } = this.props;
    const { navigate } = this.props.navigation;

    if (weekProgram === null) return <NoProgram />;

    return (
      <BackgroundContainer>
        <ProgramComponent
          targetEvent={targetEvent}
          weekProgram={weekProgram}
          onWeekClicked={date => navigate("Day", { date })}
        />
      </BackgroundContainer>
    );
  }
}

const mapStateToProps = state => {
  const { program } = state.settings;
  const targetEvent = {
    ...state.settings.targetEvent,
    name: state.settings.targetEvent.name || Texts.labels.nextMaraton
  };
  const weekProgram = ProgramModel.getWeekProgram(targetEvent.date, program);
  return { targetEvent, weekProgram };
};

export default connect(mapStateToProps)(ProgramScreen);
