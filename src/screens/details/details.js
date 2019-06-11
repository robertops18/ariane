import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, BackHandler, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import List from "../../components/list";
import translate from "../../utils/language.utils";
import Moment from "moment";
import DropdownAlert from "react-native-dropdownalert";
import Orientation from "react-native-orientation";


export class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      region : {
        latitude: 43.5314071,
        longitude: -5.7384944,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      isMapReady: false,
      item : this.props.navigation.state.params.item,
      markers:[],
      firstLoad: true
    };
  }

  componentWillMount(): void {
    Orientation.lockToPortrait();
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack(); // works best when the goBack is async
            return true;
        });

      if (this.state.firstLoad) {
        this.setState({firstLoad: false});
        this.dropdown.alertWithType('info', translate("INFO_LOGS_TITLE"), translate("INFO_LOGS_SUBTITLE"));
      }

        let area = this.props.navigation.state.params.item.area;

        Geocoder.geocodeAddress(area).then((res) => {
          let region = {
            latitude: res[0].position.lat,
            longitude: res[0].position.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
          this.setState({region: region});

          this.initMarkers();
        }).catch((err) => {
          console.log('Impossible to get latlng')
          console.log(err);
        });
    }

    initMarkers = () => {
      let markers = [];
      for (var i = 0; i < this.state.item.tasks.length; i++) {
        let task = this.state.item.tasks[i];
        console.log(task);
        markers[i] = {
          key: i,
          latlng: {
            latitude: task.latitude,
            longitude: task.longitude,
          },
          title: task.task_name
        };
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
    };

    componentWillUnmount() {
        this.backHandler.remove();
    }

    showDates = () => {
      let init = Moment(this.state.item.init_date).format('D/M/YYYY')
      let finish = Moment(this.state.item.finish_date).format('D/M/YYYY')

      if (init === finish) {
        return Moment(this.state.item.init_date).format('D/M/YYYY');
      } else {
        return Moment(this.state.item.init_date).format('D/M/YYYY') + ' - ' + Moment(this.state.item.finish_date).format('D/M/YYYY');
      }
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
                {this.state.isMapReady && this.state.markers.map(marker => (
                  <Marker
                    key = {marker.key}
                    coordinate={marker.latlng}
                    title={marker.title}
                    pinColor={marker.title === 'Tu ubicación' ? '#00ff00' : '#ff0000'}
                  />
                ))}
              </MapView>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>
                    {this.state.item.field_title.toUpperCase()}
                </Text>
                <Text style={styles.subtitle}>
                    {this.state.item.students_group.group_name}
                </Text>
                <Text style={styles.text}>
                  {this.showDates()}
                </Text>
                <View style={styles.tasks}>
                  <Text style={styles.subtitle}>
                    {translate('ACTIVITIES')}
                  </Text>
                  <List
                    data={this.state.item.tasks}
                    name={'tasks'}>
                  </List>
                </View>
              </View>
              <DropdownAlert ref={ref => this.dropdown = ref} infoColor={'#10a4ec'}/>
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
      padding: 30
    },
    title: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 25,
      color: '#d25200',
      alignItems: 'center',
      textAlign: 'center',
      paddingBottom: 10
    },

    subtitle: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 20,
      color: '#d25200',
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

export default Details;
