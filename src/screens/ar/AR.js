import React from 'react';
import {StyleSheet, Dimensions, Alert, View, BackHandler} from 'react-native';
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
        apiKey:"C014DEED-22F8-4FF1-A11B-72936F40A4E4",
      },
    };
  }

  componentWillMount(): void {
    Orientation.lockToPortrait();
  }

  componentDidMount(): void {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });
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
        debug={true}
        initialScene={{scene: scene, passProps: {task: this.props.navigation.state.params.task}}}
      />
    )
  }

}

const styles = StyleSheet.create({

});

export default connect(mapStateToProps)(ARScreen);
