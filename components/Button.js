import React from "react";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import Styles from "../constants/Styles";
import stylePropType from "react-style-proptype";
import { TouchableOpacity, Text } from "react-native";

export default class Button extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: stylePropType
  };

  render() {
    const { label, onPress, style = {} } = this.props;

    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: Colors.tintColor,
            paddingLeft: 48,
            paddingRight: 48,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 20
          },
          style
        ]}
        onPress={onPress}
      >
        <Text style={{ ...Styles.strongContent, textAlign: "center" }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}
