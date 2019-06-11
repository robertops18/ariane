import React, { Component } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View, Alert } from "react-native";
import { connect } from "react-redux";
import { MAIN_COLOR } from "react-native-dotenv";
import API from "../providers/api";
import Orientation from "react-native-orientation";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.checkIfUserHasLoggedIn();
  }

  componentWillMount(): void {
    Orientation.lockToPortrait();
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
