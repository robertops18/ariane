import React from 'react';
import {StyleSheet, Dimensions, Alert} from 'react-native';
import {ViroARSceneNavigator} from "react-viro";
import API from "../../providers/api";
import {connect} from "react-redux";
import Orientation from "react-native-orientation";

let TextARScene = require('./scenes/TextSceneAR');
let VideoARScene = require('./scenes/VideoSceneAR');
let Video360ARScene = require('./scenes/Video360SceneAR');

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export class ARScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sharedProps :{
        apiKey:"4B297AD2-2DC8-4EA9-A89E-9BE6C1047B48",
      }
    };
  }

  componentWillMount(): void {
    Orientation.lockToPortrait();
  }

  componentWillUnmount(): void {
    if (this.props.navigation.state.params.task.type === 'AR') {
      this.saveLog("Experiencia de AR con texto finalizada");
    } else if (this.props.navigation.state.params.task.type === 'VIDEO') {
      this.saveLog("Experiencia de video en AR finalizada");
    } else if (this.props.navigation.state.params.task.type === 'VIDEO 360') {
      this.saveLog("Experiencia VR con vídeo 360º finalizada");
    }
  }

  saveLog(action) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let actionJSON = {
          action: action,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        API.saveLog(this.props.user.token, actionJSON, this.props.navigation.state.params.task.id);
      },
      error => Alert.alert(error.message)
    );
  }

  renderInitialScene() {
    let scene;
    if (this.props.navigation.state.params.task.type === 'AR') {
      this.saveLog("Experiencia de AR con texto iniciada");
      scene = TextARScene;
    } else if (this.props.navigation.state.params.task.type === 'VIDEO') {
      this.saveLog("Experiencia de video en AR iniciada");
      scene = VideoARScene;
    } else if (this.props.navigation.state.params.task.type === 'VIDEO 360') {
      this.saveLog("Experiencia VR con vídeo 360º iniciada");
      scene = Video360ARScene
    }
    return scene;
  }

  render() {
    let scene = this.renderInitialScene();
    return(
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{scene: scene, passProps: {task: this.props.navigation.state.params.task}}}
      />
    )
  }

}

const styles = StyleSheet.create({

});

export default connect(mapStateToProps)(ARScreen);
