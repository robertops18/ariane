import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../../components/map";
import Orientation from "react-native-orientation";

function mapStateToProps(state) {
  return {
    user: state.user,
    list: state.data.fieldTripsList
  }
}

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(): void {
    Orientation.lockToPortrait();
  }

  // LifeCycle
  render() {
    return (
      <Map
        fieldTrips={this.props.list}
        token={this.props.user.token}
      />
    );
  }
}

export default connect(mapStateToProps)(HomeScreen);
