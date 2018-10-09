import React from "react";
import { Provider } from "react-redux";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import createAndHydrateStore from "./Store";

export default class App extends React.Component {
  store = createAndHydrateStore(() => this.storeHydrated());
  state = {
    isStoreHydrated: false,
    isLoadingComplete: false,
    shouldNavigateToInitialRoute: true,
  };

  storeHydrated() {
    this.setState({ isStoreHydrated: true });
  }

  navigateToInitialRoute(navigator, storeState) {
    if (!this.state.shouldNavigateToInitialRoute) return;
    this.setState({ shouldNavigateToInitialRoute: false });

    if (storeState == null || storeState.settings.targetEvent.date == null) {
      console.log({navigator, storeState, localState: this.state});
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
      !this.state.isLoadingComplete &&
      !this.state.isStoreHydrated &&
      !this.props.skipLoadingScreen
    ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
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
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/darkroad.png")]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font
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
    backgroundColor: "#333"
  }
});
