import React, { Component } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import AppNavigatorWithState from "./src/navigators/AppNavigator";
import { PersistGate } from "redux-persist/integration/react";
import { Linking } from "react-native";
import {NavigationActions} from 'react-navigation';
import { YellowBox } from 'react-native';



export default class App extends Component {
  
  
  componentDidMount() {
    Linking.addEventListener("url", event => this.handleOpenURL(event.url));
    Linking.getInitialURL().then(url => url && this.handleOpenURL(url));
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL(url) {
    const path = url.split(":/")[1];
    NavigationActions.navigate({
      routeName: "App"
    });
  }

  render() {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning: Each'];
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigatorWithState />
        </PersistGate>
      </Provider>
    );
  }
}
