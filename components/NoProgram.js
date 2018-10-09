import React from "react";
import { Text } from "react-native";
import  Styles  from "../constants/Styles";
import  Texts  from "../constants/Texts";
import BackgroundContainer from "./BackgroundContainer";

export default class NoProgram extends React.Component {
  render() {
    return (
      <BackgroundContainer>
        <Text style={{ ...Styles.defaultContent, fontSize: 30, marginTop: 200, textAlign: "center" }}>
          ¯\_(ツ)_/¯
        </Text>
        <Text style={{ ...Styles.defaultContent, marginTop: 20, textAlign: "center" }}>
          {Texts.labels.NoProgram}
        </Text>
      </BackgroundContainer>
    );
  }
}
