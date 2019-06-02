import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, BackHandler} from 'react-native';
import {ViroARSceneNavigator} from "react-viro";

let InitialARScene = require('./SceneAR');

export default class ARScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sharedProps :{
        apiKey:"4B297AD2-2DC8-4EA9-A89E-9BE6C1047B48",
      }
    };
  }

  componentDidMount() {
  }


  render() {
    console.log(this.props.navigation.state.params.task);
    return(
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{scene: InitialARScene, passProps: {task: this.props.navigation.state.params.task}}}
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
