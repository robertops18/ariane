'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants, ViroVideo, Viro360Video,
} from 'react-viro';

export default class Video360SceneAR extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <ViroARScene>
        <Viro360Video
          source={{uri: this.props.task.question}}
          loop={true}
          paused={false}
        />
      </ViroARScene>
    );
  }

}

var styles = StyleSheet.create({

});

module.exports = Video360SceneAR;
