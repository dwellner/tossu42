import React from "react";
import { Provider } from "react-redux";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { AppLoading, Font, Icon, Asset } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import createAndHydrateStore from "./Store";
import WelcomeScreen from "./screens/Welcome/WelcomeScreen";

export default class App extends React.Component {
  store = createAndHydrateStore(() => this.storeHydrated());
  state = {
    isStoreHydrated: false,
    isLoadingComplete: false,
    shouldNavigateToInitialRoute: true,
    initialSetupStarted: false
  };

  storeHydrated() {
    this.setState({ isStoreHydrated: true });
  }

  navigateToInitialRoute(navigator, storeState) {
    if (!this.state.shouldNavigateToInitialRoute) return;
    this.setState({ shouldNavigateToInitialRoute: false });

    if (storeState == null || storeState.settings.targetEvent.date == null) {
      navigator.dispatch(
        NavigationActions.navigate({
          routeName: "Settings"
        })
      );
    }
  }

  render() {
    const store = this.store;
    if (
      !this.state.isLoadingComplete ||
      !this.state.isStoreHydrated ||
      this.props.skipLoadingScreen
    ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    if (
      store.getState().settings.targetEvent.date == null &&
      !this.state.initialSetupStarted
    ) {
      return (
        <WelcomeScreen
          onStart={() =>
            this.setState(() => ({
              initialSetupStarted: true
            }))
          }
        />
      );
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator
            ref={navigator =>
              this.navigateToInitialRoute(navigator, store.getState())
            }
          />
        </View>
      </Provider>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/splash.png")]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
        "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 30
  }
});
