import React from 'react';
import {StyleSheet, Dimensions, Alert} from 'react-native';
import {ViroARSceneNavigator} from "react-viro";
import API from "../../providers/api";
import {connect} from "react-redux";

let TextARScene = require('./scenes/TextSceneAR');
let VideoARScene = require('./scenes/VideoSceneAR');
let Video360ARScene = require('./scenes/Video360SceneAR');

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

class ARScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sharedProps :{
        apiKey:"4B297AD2-2DC8-4EA9-A89E-9BE6C1047B48",
      }
    };
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  infoContainer: {
    padding: 30
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#780047',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 10
  },

  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: '#780047',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    color: '#070707',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 23,
    marginVertical: 14,
    alignItems: 'center',
    textAlign: 'center',
  },
  map: {
    height: 300,
    width: Dimensions.get('window').width,
  },
  tasks: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  }
});

export default connect(mapStateToProps)(ARScreen);
