import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Video from "react-native-video";
import {Slider} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default class Player extends React.Component{

  state = {
    paused: true,
    totalDuration: 1,
    currentPosition: 0,
  };

  componentDidMount(): void {

  }

  playOrPause = () => {
    if (this.state.paused) {
      this.setState({paused: false});
    } else {
      this.setState({paused: true});
    }
    console.log(this.state);
  };

  async setDuration(data) {
    console.log(data);
    await this.setState({totalDuration: Math.floor(data.duration)});
    console.log(this.state);
  }

  async setTime(data) {
    await this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  render(){
    return (
      <View>
        <Video
          ref="audioElement"
          source={{uri:this.props.audio}}
          onLoad={this.setDuration.bind(this)}
          onProgress={this.setTime.bind(this)}
          style={{width: 0, height: 0}}
          paused={this.state.paused}
          repeat={true}
        />
        <TouchableOpacity
          onPress={this.playOrPause}
        >
          {this.state.paused &&
          <Icon
            name='ios-play'
            style={styles.playBtn}
            size={65}
          />}
          {!this.state.paused &&
          <Icon
            name='ios-pause'
            style={styles.playBtn}
            size={65}
          />}
        </TouchableOpacity>
        <Slider
          onSeek={this.seek.bind(this)}
          maximumValue={Math.max(this.state.totalDuration, 1, this.state.currentPosition + 1)}
          value={this.state.currentPosition}
          onSlidingStart={() => this.setState({paused: true})}
          onSlidingComplete={this.seek.bind(this)}
          style={styles.slider}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  playBtn : {
    color: '#000000',
    alignSelf: 'center'
  },
  slider: {
    width: Dimensions.get('window').width / 1.5,
    alignSelf: 'center'
  }
});

