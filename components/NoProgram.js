import React from "react";
import { Text } from "react-native";
import Styles from "../constants/Styles";
import { Labels } from "../constants/Texts";
import { LinearGradient } from "expo";

export default class NoProgram extends React.Component {
  render() {
    return (
      <LinearGradient
        style={{ flex: 1, alignSelf: "stretch" }}
        colors={["#fff", "#eee", "#fff"]}
      >
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
          {Labels.noProgram}
        </Text>
      </LinearGradient>
    );
  }
}
