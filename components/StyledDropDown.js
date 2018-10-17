import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import Styles from "../constants/Styles";
import Colors from "../constants/Colors";

export default class StyledDropDown extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueFormatter: PropTypes.func,
    editable: PropTypes.bool,
    error: PropTypes.string,
    onChange: PropTypes.func
  };

  render() {
    const { label, data, value, valueFormatter = v => v } = this.props;
    const items = data.map(value => ({ value, label: valueFormatter(value) }));
    const { editable = true, error, onChange } = this.props;

    return (
      <Dropdown
        label={label}
        data={items}
        value={value}
        editable={editable}
        error={error}
        onChangeText={onChange}
        FontSize={16}
        titleFontSize={16}
        labelFontSize={20}
        baseColor={Colors.defaultText}
        maxLength={30}
        renderAccessory={() => (
          <Text style={{ ...Styles.strongContent, paddingTop: 18 }}>...</Text>
        )}
        labelTextStyle={{
          ...Styles.strongContent,
          alignSelf: "stretch",
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
          textAlign: "center",
        }}
        itemTextStyle={{
          ...Styles.defaultContent,
          textAlign: "center",

        }}
        tintColor={Colors.tintColor}
      />
    );
  }
}
