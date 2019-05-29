import React, { Component } from "react";
import { connect } from "react-redux";
import {BackHandler, StyleSheet, View} from "react-native";
import YouTube from "react-native-youtube";
import Orientation from 'react-native-orientation';


class Video extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
      Orientation.unlockAllOrientations();
      return true;
    });
  }

  componentWillMount() {
    Orientation.lockToLandscape();
  }

  render() {
    return (
        <YouTube
          apiKey={"AIzaSyAvAte5AxaesDDFEULrtH4vfn4QGyGd60Y"}
          play={true}
          fullscreen={true}
          videoId={this.props.navigation.state.params.url.split("=")[1]}
          showFullscreenButton={false}

          onError={e => {
            this.setState({ error: e.error });
            this.props.navigation.goBack();
            console.log(e);
          }}

          onReady={e => {
            this.setState({ isReady: true })
            console.log('Youtube video ready')
          }}

          style={styles.video}
        />
    );
  }
}

const styles = StyleSheet.create({
  video: {
    alignSelf: "stretch",
    width: 300,
    height: 150
  },
});

export default connect(null)(Video);
