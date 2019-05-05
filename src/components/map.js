import React from 'react';
import {View, StyleSheet, Text, Dimensions, Alert} from 'react-native';
import MapView, { Marker} from 'react-native-maps';

class Map extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
          isMapReady: false,
          region: {
              latitude: 43.5314071,
              longitude: -5.7384944,
              latitudeDelta: 1,
              longitudeDelta: 1
          },
          currentLocation : null
        };
        let markers = [];
        markers[0] = {
            key: 1,
            latlng: {
                latitude: 43.5314071,
                longitude: -5.7384944,
            },
            title: 'Gijón',
            description: 'Descripción de Gijón'
        };
        markers[1] = {
            key: 2,
            latlng: {
                latitude: 43.3694815,
                longitude: -5.8836773,
            },
            title: 'Oviedo',
            description: 'Descripción de Oviedo'
        };
        this.state.markers = markers;
        //this.getLocation()
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
