import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { TextField } from "react-native-material-textfield";
import DateTimePicker from "react-native-modal-datetime-picker";
import Formatters from "../../utils/Formatters";
import Texts from "../../constants/Texts"

export default class EventDatePicker extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { isPickerVisible: false };
  }

  confirmDatePicked = (newValue, onChange) => {
    this.setState(() => ({ isPickerVisible: false }));
    onChange(newValue.toISOString().substr(0, 10));
  };

  render() {
    const { value, onChange } = this.props;
    const { isPickerVisible } = this.state;

    const showPicker = () => this.setState({ isPickerVisible: true });
    const hidePicker = () => this.setState({ isPickerVisible: false });

    return (
      <View>
        <TouchableOpacity onPress={showPicker}>
          <TextField
            editable={false}
            label={Texts.labels.eventDate}
            value={Formatters.dateToDateLabel(value)}
            error={value == null ? "Pakollinen" : undefined}
          />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isPickerVisible}
          onConfirm={date => this.confirmDatePicked(date, onChange)}
          onCancel={hidePicker}
        />
      </View>
    );
  }
}
