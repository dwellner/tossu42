import React from "react";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import settingsReducer from "./reducers/SettingsReducer";
import AppNavigator from "./navigation/AppNavigator";

const persistanceConfig = {
  key: "root",
  storage
};
const rootReducer = persistCombineReducers(persistanceConfig, {
  settings: settingsReducer
});

const store = createStore(rootReducer);

export default class App extends React.Component {
  persistor = persistStore(store, {}, () =>
    this.setState({ isStoreHydrated: true })
  );
  state = {
    isStoreHydrated: false,
    isLoadingComplete: false
  };

  render() {
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
            <AppNavigator />
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
