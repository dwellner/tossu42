import React from "react";
import { connect } from "react-redux";

import ProgramComponent from "./ProgramComponent";
import { ImageBackground } from "react-native";
import ProgramModel from "../../utils/ProgramModel";

class ProgramScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { targetEvent, weekProgram } = this.props;
    const { navigate } = this.props.navigation;

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
  const { targetEvent, program } = state.settings;
  const weekProgram = ProgramModel.getWeekProgram(targetEvent.date, program);
  return { targetEvent, weekProgram };
};

export default connect(mapStateToProps)(ProgramScreen);
