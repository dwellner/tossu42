import React from "react";
import PropTypes from "prop-types";
import { View, ImageBackground, Text, StyleSheet } from "react-native";
import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";
import Circle from "../../components/Circle";
import { Labels } from "../../constants/Texts";
import Button from "../../components/Button";

const BulletPoint = ({ nr, text }) => (
  <View style={{ flexDirection: "row", marginBottom: 12 }}>
    <Text style={{ ...Styles.defaultContent, width: 25 }}>{nr})</Text>
    <Text style={{ ...Styles.defaultContent }}>{text}</Text>
  </View>
);

const StartButton = ({ onPress }) => (
  <Button label={Labels.start} onPress={onPress} style={styles.startButton} />
);

const StartScreenContent = ({ onStart }) => (
  <View style={styles.content}>
    <Text style={styles.headerText}>{Labels.welcomeHeader}</Text>
    <Text style={styles.subHeaderText}>{Labels.welcomeSubHeader}</Text>

    <View>
      <BulletPoint nr={1} text={Labels.welcomeBullet1} />
      <BulletPoint nr={2} text={Labels.welcomeBullet2} />
      <BulletPoint nr={3} text={Labels.welcomeBullet3} />
    </View>

    <StartButton onPress={onStart} />
  </View>
);

export default class WelcomeScreen extends React.PureComponent {
  static propTypes = {
    onStart: PropTypes.func.isRequired
  };

  render() {
    const { onStart } = this.props;

    return (
      <ImageBackground
        style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}
        source={require("../../assets/images/splash.png")}
      >
        <View style={styles.contentContainer}>
          <StartScreenContent onStart={onStart} />

          <Circle radius={52} color={"#fff"} style={styles.logoBorder} />

          <Circle
            content={"T42"}
            radius={48}
            color={Colors.defaultText}
            style={{
              margin: -48,
              zIndex: 2,
              alignSelf: "center",
              position: "absolute"
            }}
            textStyle={{ color: "#fff" }}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  logoBorder: {
    margin: -52,
    zIndex: 1,
    alignSelf: "center",
    position: "absolute"
  },

  contentContainer: {
    margin: 48,
    alignItems: "center"
  },

  content: {
    backgroundColor: "#fff",
    padding: 36,
    paddingTop: 24 + 52,
    alignItems: "center"
  },

  headerText: {
    ...Styles.strongLargeContent,
    textAlign: "center",
    marginBottom: 24
  },

  subHeaderText: {
    ...Styles.defaultContent,
    textAlign: "center",
    marginBottom: 16
  },

  startButton: {
    marginTop: 24
  }
});
