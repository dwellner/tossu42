import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import settingsReducer from "./reducers/SettingsReducer";

const persistanceConfig = { key: "root", storage };
const rootReducer = persistCombineReducers(persistanceConfig, {
  settings: settingsReducer
});

export default (createAndHydrateStore = storeHydrated => {
  const store = createStore(rootReducer);
  const persistor = persistStore(store, {}, () => storeHydrated(store.getState()));
  //persistor.purge(); // uncomment only for test purposes to test initial state handling
  return store;
});
