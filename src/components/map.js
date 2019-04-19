import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import MapView, { Marker} from 'react-native-maps';


class Map extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
            isMapReady: false,
            region: {
                latitude: 43.5314071,
                longitude: -5.7384944,
                latitudeDelta: 1,
                longitudeDelta: 1
            },
        }
        let markers = [];
        markers[0] = {
            key: 1,
            latlng: {
                latitude: 43.5314071,
                longitude: -5.7384944,
            },
            title: 'Gijón',
            description: 'Descripción de Gijón'
        }
        markers[1] = {
            key: 2,
            latlng: {
                latitude: 43.3694815,
                longitude: -5.8836773,
            },
            title: 'Oviedo',
            description: 'Descripción de Oviedo'
        }
        this.state.markers = markers;
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

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