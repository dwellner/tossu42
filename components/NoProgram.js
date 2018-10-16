import React from "react";
import { Text, View } from "react-native";
import Styles from "../constants/Styles";
import Texts from "../constants/Texts";

export default class NoProgram extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={{
            ...Styles.largeContent,
            fontSize: 30,
            marginTop: 200,
            textAlign: "center"
          }}
        >
          ¯\_(ツ)_/¯
        </Text>
        <Text
          style={{
            ...Styles.largeContent,
            marginTop: 20,
            textAlign: "center"
          }}
        >
          {Texts.labels.noProgram}
        </Text>
      </View>
    );
  }
}
