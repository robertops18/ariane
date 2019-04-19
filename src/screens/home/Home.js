import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import translate from '../../utils/language.utils.js';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

           
  // LifeCycle
  render() {
    const { navigation, goToDetail } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
       <Text>Me siento como en casa</Text>
       <Text>{translate('HOME')}</Text>
      </View>
    );
  }
}

export default connect(null)(HomeScreen);
