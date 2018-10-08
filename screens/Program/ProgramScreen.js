import React from "react";
import { connect } from "react-redux";
import Texts from "../../constants/Texts";

import ProgramComponent from "./ProgramComponent";
import { ImageBackground, Text } from "react-native";
import ProgramModel from "../../utils/ProgramModel";

class ProgramScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { targetEvent, weekProgram } = this.props;
    const { navigate } = this.props.navigation;

    if (weekProgram === null) return <Text>Piru</Text>;

    return (
      <ImageBackground
        source={require("../../assets/images/darkroad.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <ProgramComponent
          targetEvent={targetEvent}
          weekProgram={weekProgram}
          onWeekClicked={date => navigate("Day", { date })}
        />
      </ImageBackground>
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
