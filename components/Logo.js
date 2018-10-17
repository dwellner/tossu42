import React from "react";
import Circle from "./Circle";
import Colors from "../constants/Colors";

export default class Logo extends React.PureComponent {
  render() {
    return (
      <Circle
        content={"T42"}
        radius={30}
        color={Colors.defaultText}
        style={{ marginLeft: 8 }}
        textStyle={{ color: "#fff" }}
      />
    );
  }
}
