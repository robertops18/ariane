import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "./reducers/index";
import storage from "redux-persist/lib/storage";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import { composeWithDevTools } from 'remote-redux-devtools';

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["navigationReducer"]
};

const persistedReducer = persistReducer(persistConfig, reducer);
const navigationMiddleware = createReactNavigationReduxMiddleware("root", state => state.navigationReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(navigationMiddleware)));
const persistor = persistStore(store);
export { store, persistor };
