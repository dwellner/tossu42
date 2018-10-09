import React from "react";
import { ImageBackground } from "react-native";

export default class BackgroundContainer extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../assets/images/darkroad.png")}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}
