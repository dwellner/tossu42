import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Styles from "../constants/Styles";

export default class Circle extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    radius: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    style: PropTypes.object,
    textStyle: PropTypes.object
  };

  render() {
    const { content, radius, color, style, textStyle } = this.props;
    return (
      <View
        style={{
          height: 2 * radius,
          width: 2 * radius,
          backgroundColor: color,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          ...style
        }}
      >
        <Text style={{ ...Styles.largeContent, ...textStyle }}>{content}</Text>
      </View>
    );
  }
}
