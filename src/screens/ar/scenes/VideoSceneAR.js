'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroVideo,
} from 'react-viro';

export default class VideoSceneAR extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ViroARScene>
        <ViroVideo
          source={{uri: this.props.task.question}}
          loop={true}
          position={[0,2,-5]}
          scale={[7, 4, 0]}
        />
      </ViroARScene>
    );
  }

}

var styles = StyleSheet.create({

});

module.exports = VideoSceneAR;
