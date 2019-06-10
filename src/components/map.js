import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import API from "../providers/api";

class Map extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
          isMapReady: false,
          region: {
              latitude: 43.5314071,
              longitude: -5.7384944,
              latitudeDelta: 20,
              longitudeDelta: 20
          },
          currentLocation : null,
          markers: [],
        };
    }

    componentDidMount(): void {

    }

    initMarkers = async () => {
      let markers = await API.getFieldTripMarkers(this.props.token);
      this.setState({markers: markers});

      navigator.geolocation.getCurrentPosition(
        position => {
          let currentMarker = {
            key: Math.random() * 10,
            latlng: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            title: 'Tu ubicación',
            description: 'Ubicación actual'
          };
          this.setState(preState => (
              {markers: [...preState.markers, currentMarker]}
            )
          );
        },
        error => Alert.alert(error.message)
      );
    };

    onMapLayout = async () => {
      await this.initMarkers();
      this.setState({ isMapReady: true });
    };

    render(){
        return (
            <MapView
                style={styles.map}
                provider='google'
                mapType='standard'
                showsScale
                showsCompass
                showsPointsOfInterest
                showsBuildings
                region={this.state.region}
                onLayout={this.onMapLayout}
            >
                {this.state.isMapReady && this.state.markers.map(marker => (
                    <Marker
                        key = {marker.key}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        pinColor={marker.title === 'Tu ubicación' ? '#00ff00' : '#ff0000'}
                    />
                ))}
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Map
