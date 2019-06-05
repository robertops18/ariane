import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, Alert} from 'react-native';
import Video from "react-native-video";
import {Slider, Text} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import API from "../providers/api";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

class Player extends React.Component{

  state = {
    paused: true,
    totalDuration: 1,
    currentPosition: 0,
  };

  componentDidMount(): void {
    this.saveLog("Componente de audio iniciado");
  }

  componentWillUnmount(): void {
    this.saveLog("Reproducción de audio terminada. Tiempo escuchado: " +
      this.minutesAndSeconds(this.state.currentPosition)[0] + ':' + this.minutesAndSeconds(this.state.currentPosition)[1]
      + ' minutos');
  }

  saveLog(action) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let actionJSON = {
          action: action,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        API.saveLog(this.props.user.token, actionJSON, this.props.audio.id);
      },
      error => Alert.alert(error.message)
    );
  }

  playOrPause = () => {
    if (this.state.paused) {
      this.setState({paused: false});
      this.saveLog("Reproducción iniciada");
    } else {
      this.setState({paused: true});
      this.saveLog("Reproducción pausada");
    }
  };

  async setDuration(data) {
    await this.setState({totalDuration: Math.floor(data.duration)});
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

  pad(n, width, z=0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  minutesAndSeconds = (position) => ([
    this.pad(Math.floor(position / 60), 2),
    this.pad(position % 60, 2),
  ]);

  render(){
    const elapsed = this.minutesAndSeconds(this.state.currentPosition);
    const total = this.minutesAndSeconds(this.state.totalDuration);
    return (
      <View
        borderWidth={2}
        borderColor={'#000000'}
        borderRadius={10}
      >
        <Video
          ref="audioElement"
          source={{uri:this.props.audio.question}}
          onLoad={this.setDuration.bind(this)}
          onProgress={this.setTime.bind(this)}
          style={{width: 0, height: 0}}
          paused={this.state.paused}
          repeat={true}
        />
        <TouchableOpacity
          onPress={this.playOrPause}
          disabled={!this.props.taskCanBePerformed}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <Text style={styles.currentTime}>{elapsed[0] + ":" + elapsed[1]}</Text>
          <Slider
            onSeek={this.seek.bind(this)}
            maximumValue={Math.max(this.state.totalDuration, 1, this.state.currentPosition + 1)}
            value={this.state.currentPosition}
            onSlidingStart={() => this.setState({paused: true})}
            onSlidingComplete={this.seek.bind(this)}
            style={styles.slider}
            disabled={!this.props.taskCanBePerformed}
            thumbTintColor={'#10a4ec'}
          />
          <Text style={styles.totalTime}>{total[0] + ":" + total[1]}</Text>
        </View>

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
    width: Dimensions.get('window').width / 1.8,
    alignSelf: 'center',
    marginLeft: 10,
    paddingRight: 10
  },
  currentTime: {
    marginLeft: 10
  },
  totalTime: {
    paddingRight: 10
  }
});

export default connect(mapStateToProps)(Player);
