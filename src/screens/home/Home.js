import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../../components/map";

function mapStateToProps(state) {
  return {
    user: state.user,
    list: state.data.fieldTripsList
  }
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
           
  // LifeCycle
  render() {
    return (
      <Map
        fieldTrips={this.props.list}
      />
    );
  }
}

export default connect(mapStateToProps)(HomeScreen);
