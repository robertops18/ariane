import React, { Component } from "react";
import { connect } from "react-redux";
import {StyleSheet, ScrollView, RefreshControl} from "react-native";
import API from "../../providers/api";
import List from "../../components/list";

function mapStateToProps(state) {
  return {
    user: state.user,
    list: state.data.fieldTripsList
  }
}

export class ListScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    refreshing: false
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    API.getFieldTrips(this.props.user.token).then((fieldTripsList) => {

      this.props.dispatch({
        type: 'SET_TRIPS_LIST',
        payload: {
          fieldTripsList
        }
      });
      this.setState({refreshing: false});

    }).catch((err) => {
      this.setState({refreshing: false});
    });
  };

  render() {
    const {refreshing} = this.state;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <List
          data={this.props.list}
          name={'field trips'}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textName: {
    fontWeight: "bold",
    fontSize: 30
  },
  textUser: {
    flex: 1,
    color: "tomato"
  }
});

export default connect(mapStateToProps)(ListScreen);
