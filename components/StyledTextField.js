import React from "react";
import PropTypes from "prop-types";
import { TextField } from "react-native-material-textfield";
import Styles from "../constants/Styles";
import Colors from "../constants/Colors";

export default class StyledTextField extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    editable: PropTypes.bool,
    error: PropTypes.string,
    onChange: PropTypes.func
  };

  render() {
    const { label, value, editable = true, error, onChange } = this.props;
    return (
      <TextField
        label={label}
        value={value}
        editable={editable}
        error={error}
        onChangeText={onChange}
        FontSize={16}
        titleFontSize={16}
        labelFontSize={20}
        baseColor={Colors.defaultText}
        maxLength={30}
        labelTextStyle={{
          ...Styles.strongContent,
          textAlign: "center"
        }}
        inputContainerStyle={{
          flex: 1,
          alignItems: "center",
          height: 76
        }}
        style={{
          ...Styles.defaultContent,
          marginTop: 16,
          textAlign: "center"
        }}
        tintColor={Colors.tintColor}
      />
    );
  }
}
