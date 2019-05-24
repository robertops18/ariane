import React, { Component } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View, Alert } from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { MAIN_COLOR } from "react-native-dotenv";
import API from "../providers/api";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.checkIfUserHasLoggedIn();
  }
  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
    this.notificationDisplayedListener;
  }

  async componentDidMount() {
    this.checkPermission();
    this.registerListenerForFirebase();
  }

  // Fetch the token from storage then navigate to our appropriate place
  checkIfUserHasLoggedIn = async () => {
    const userToken = this.props.state.token;
    if (userToken) {
      API.getFieldTrips(userToken).then((fieldTripsList) => {
        this.props.dispatch({
          type: 'SET_TRIPS_LIST',
          payload: {
            fieldTripsList
          }
        });
        this.props.navigation.navigate("App");
      });
    } else {
      this.props.navigation.navigate("Auth");
    }
  };

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      this.requestPermission();
    }
  }

  showNotificationAlert = (message, onPress) => {
    Alert.alert(
      "Template",
      message,
      [{ text: "Ir", onPress: onPress }, { text: "Cancelar", onPress: () => console.log("Cancel Pressed"), style: "cancel" }],
      { cancelable: true }
    );
  };

  async registerListenerForFirebase() {

    this.notificationListener = firebase.notifications().onNotification((notification) => {
        let text;
        let onPress;
        console.log("On Foreground")
        console.log(notification)
    });


    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const action = notificationOpen.action;
        const notification = notificationOpen.notification;
        let type = notificationOpen.notification.data.type;
        console.log("On Background");
        console.log(notification)

    });

    firebase.notifications().getInitialNotification()
        .then((notificationOpen) => {
            if (notificationOpen) {
                const action = notificationOpen.action;
                const notification = notificationOpen.notification;
                console.log("Closed");
                console.log(notification);
            }
        });

}

  // Render any loading content that you like here
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator animating={true} size={'large'}/>
        <StatusBar barStyle='default' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

function mapStateToProps(state) {
  return {
    state: state.user
  };
}

export default connect(mapStateToProps)(AuthLoadingScreen);
