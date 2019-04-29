import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, BackHandler} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';


export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      region : {
        latitude: 43.5314071,
        longitude: -5.7384944,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      isMapReady: false
    }
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack(); // works best when the goBack is async
            return true;
        });

        let area = this.props.navigation.state.params.item.area;
        console.log(area);

        Geocoder.geocodeAddress(area).then((res) => {
          console.log(res);
          let region = {
            latitude: res[0].position.lat,
            longitude: res[0].position.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
          this.setState({region: region});
        }).catch((err) => {
          console.log('Impossible to get latlng')
          console.log(err);
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return(
            <ScrollView style={{flex: 1}}>
              <MapView  pointerEvents="none"
                style={styles.map}
                provider='google'
                mapType='standard'
                showsScale
                showsCompass
                showsPointsOfInterest
                showsBuildings
                region= {this.state.region}
                onLayout={this.onMapLayout}
              >
              </MapView>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>
                    {this.props.navigation.state.params.item.field_title.toUpperCase()}
                </Text>
                <Text style={styles.text}>
                    {this.props.navigation.state.params.item.school.school_name}
                </Text>
              </View>
            </ScrollView>

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
        alignItems: 'flex-start',
        padding: 30
    },
    title: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#780047'
        },
    text: {
        color: '#070707',
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        lineHeight: 23,
        textAlign: 'justify',
        marginVertical: 14
    },
    map: {
        height: 375,
        width: Dimensions.get('window').width,
    }
});
