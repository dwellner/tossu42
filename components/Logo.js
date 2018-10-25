import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Circle from "./Circle";
import Colors from "../constants/Colors";

export default class Logo extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Circle
          content={"T42"}
          radius={30}
          color={Colors.defaultText}
          style={{ marginLeft: 8 }}
          textStyle={{ color: "#fff" }}
        />
      </TouchableOpacity>
    );
  }
}
