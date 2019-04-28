import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, BackHandler} from 'react-native';
import MapView from 'react-native-maps';
import {Image} from "react-native-elements";


export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      region : {
        latitude: 43.5314071,
        longitude: -5.7384944,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
      },
      isMapReady: false
    }
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

    static navigationOptions = ({ navigation }) => {
        return {

            defaultNavigationOptions: {
                gesturesEnabled: false,
            },

        };
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack(); // works best when the goBack is async
            return true;
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
        resizeMode: 'cover'
    }
});
