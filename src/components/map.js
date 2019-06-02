import React from 'react';
import {View, StyleSheet, Text, Dimensions, Alert} from 'react-native';
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
          markers: []
        };
        //this.getLocation()
    }

    componentDidMount(): void {
      this.initMarkers();
    }

    initMarkers = () => {
      let markers = [];
      for (let i = 0; i < this.props.fieldTrips.length; i++) {
        let fieldTrip = this.props.fieldTrips[i];
        for (let j = 0; j < fieldTrip.tasks.length; j++) {
          let task = fieldTrip.tasks[j];
          markers[task.id] = {
            key: task.id,
            latlng: {
              latitude: task.latitude,
              longitude: task.longitude,
            },
            title: task.task_name,
            description: fieldTrip.field_title
          }
        }
      }

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
          }
          this.state.markers.push(currentMarker);
        },
        error => Alert.alert(error.message)
      );

      this.setState({markers: markers});
    }

  onMapLayout = () => {
        this.setState({ isMapReady: true });
    };
/*
    getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          let latlng = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.setState({currentLocation: latlng});
        },
        error => Alert.alert(error.message)
      );
    };
*/
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
