'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from 'react-viro';

export default class TextSceneAR extends Component {

  constructor(props) {
    super(props);
    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : this.props.task.description
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText
          text={this.state.text}
          scale={[.5, .5, .5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = TextSceneAR;
