import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../../components/map";



class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
           
  // LifeCycle
  render() {
    return (
      <Map/>
    );
  }
}

export default connect(null)(HomeScreen);
