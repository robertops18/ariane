import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Alert,
  TextInput,
  ScrollView,
  Picker
} from 'react-native';
import StarRating from "react-native-star-rating";
import {Button, Image, Slider} from "react-native-elements";
import translate from "../../utils/language.utils";
import API from "../../providers/api";
import {connect} from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import Spinner from "react-native-loading-spinner-overlay";
import Player from "../../components/player";
import * as geolib from "geolib";


function mapStateToProps(state) {
  return {
    user: state.user
  }
}

class DetailsTasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item : this.props.navigation.state.params.item,
      starCount : 0,
      animating: false,
      alertMessage: '',
      opinion: '',
      selectedAnswer: this.props.navigation.state.params.item.options !== '' && this.props.navigation.state.params.item.options
        ? this.props.navigation.state.params.item.options.split(';')[0]
        : '',
      distanceToTask: 0,
      taskCanBePerformed: true
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });
    this.saveLog("Tarea visualizada");
    this.calculateDistance();
  }

  calculateDistance() {
    navigator.geolocation.getCurrentPosition(
      position => {
        let distance = geolib.getDistance(position.coords, {
          latitude: this.state.item.latitude,
          longitude: this.state.item.longitude
        });
        this.setState({distanceToTask: distance});
        //TODO: Uncomment in order to activate to minimum distance to task
        /*
        if (distance > 50) {
          this.setState({taskCanBePerformed: false});
          if (this.state.item.type !== 'DESCRIPCIÓN') {
            this.dropdown.alertWithType('warn', translate('WARN_DISTANCE_TITLE'),
              translate('WARN_DISTANCE_SUBTITLE'));
          }
        }
        */
      },
      error => Alert.alert(error.message)
    );
  }

  componentWillUnmount(): void {
    this.setState({animating: false});
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  sendRating = async () => {
    this.state.animating = true;
    API.submitAnswer(this.props.user.token, "Valoración: " + this.state.starCount, this.state.item.id).then((value) => {
      this.state.animating = false;
      this.dropdown.alertWithType('success', translate("TASK"), translate("ANSWER_SENDED"));
    }).catch((err) => {
      console.log(err);
      this.state.animating = false;
      this.dropdown.alertWithType('error', 'Error', translate("ANSWER_ERROR"));
    });

    this.saveLog("Ha valorado la salida");
  };

  saveLog(action) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let actionJSON = {
          action: action,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        API.saveLog(this.props.user.token, actionJSON, this.state.item.id);
      },
      error => Alert.alert(error.message)
    );
  }

  sendOpinion = () => {
    this.state.animating = true;
    API.submitAnswer(this.props.user.token, this.state.opinion, this.state.item.id).then((value) => {
      this.state.animating = false;
      this.dropdown.alertWithType('success', translate("TASK"), translate("ANSWER_SENDED"));
    }).catch((err) => {
      console.log(err);
      this.state.animating = false;
      this.dropdown.alertWithType('error', 'Error', translate("ANSWER_ERROR"));
    });

    this.saveLog("Ha opinado sobre la salida");
  };

  openYoutube = () => {
    this.saveLog("Ha visualizado el vídeo de Youtube");
    this.props.navigation.navigate('Video', {url: this.state.item.question});
  };

  openAR = () => {
    this.props.navigation.navigate('ARScreen', {task: this.state.item});
  }

  onChangeText = (opinion) => {
    this.setState({opinion: opinion});
  };

  checkAndSendAnswer = async () => {
    await API.submitAnswer(this.props.user.token, this.state.selectedAnswer, this.state.item.id)
    if (this.state.selectedAnswer === this.state.item.correct_answer) {
      this.dropdown.alertWithType('success', translate("ANSWER_OK_TITLE"), translate("ANSWER_OK_SUBTITLE"));
      this.saveLog("Pregunta de test contestada correctamente");
    } else {
      this.dropdown.alertWithType('error', translate("ANSWER_NOT_OK_TITLE"),
        translate("ANSWER_NOT_OK_SUBTITLE") + this.state.item.correct_answer);
      this.saveLog("Pregunta de test contestada incorrectamente");
    }
  };

  renderTask = () => {
    switch (this.state.item.type) {
      case 'VALORACIÓN':
        return (
          <View style={{flex:1}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              fullStarColor={'#780047'}
              containerStyle={{paddingBottom: 20}}
            />
            <Button
              buttonStyle={styles.submitButton}
              title={translate('SUBMIT_RATING')}
              onPress={this.sendRating}
              disabled={this.state.starCount === 0 || !this.state.taskCanBePerformed}
            />
          </View>
        );

      case 'YOUTUBE':
        return (
          <View>
            <Button
              buttonStyle={styles.submitButton}
              title={translate('VIDEO')}
              onPress={this.openYoutube}
              disabled={!this.state.taskCanBePerformed}
            />
          </View>
        )

      case 'VIDEO':
        return (
          <View>
            <Button
              buttonStyle={styles.submitButton}
              title={translate('VIDEO')}
              onPress={this.openAR}
              disabled={!this.state.taskCanBePerformed}
            />
          </View>
        )

      case 'OPINIÓN':
        return (
          <View style={styles.textAreaContainer} >
            <TextInput
              ref={textArea => this._textArea = textArea}
              onChangeText={(message) => this.onChangeText(message)}
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder={translate("PLACEHOLDER_OPINION")}
              placeholderTextColor="grey"
              multiline={true}
            />
            <View style={{paddingTop: 20, alignItems: 'center', justifyContent:'center'}}>
              <Button
                buttonStyle={styles.submitButton}
                title={translate('SEND')}
                onPress={this.sendOpinion}
                disabled={this.state.opinion === '' || !this.state.taskCanBePerformed}
              />
            </View>
          </View>
        )

      case 'AUDIO':
        return (
          <View>
            <Player
              audio={this.state.item}
              taskCanBePerformed={this.state.taskCanBePerformed}
            />
          </View>
        )

      case 'TEST':
        let options = this.state.item.options.split(';').map( (o, i) => {
          return <Picker.Item key={i} value={o} label={o} />
        });
        return (
          <View>
            <View
              borderWidth={2}
              borderColor={'#000000'}
              borderRadius={10}
              style={styles.picker}
            >
              <Picker
                selectedValue={this.state.selectedAnswer}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectedAnswer: itemValue})
                }
                style={{height: 50, width: 200, alignItems: 'center'}}
              >
                {options}
              </Picker>
            </View>
            <View style={{padding: 10}}>
              <Button
                title={translate("SEND")}
                buttonStyle={styles.submitButton}
                onPress={this.checkAndSendAnswer}
                disabled={!this.state.taskCanBePerformed}
              />
            </View>
          </View>
        )

      case 'AR':
        return (
          <Button
            title={'AR'}
            buttonStyle={styles.submitButton}
            onPress={this.openAR}
            disabled={!this.state.taskCanBePerformed}
          />
        )

      case 'VIDEO 360':
        return (
          <Button
            title={translate('VIDEO')}
            buttonStyle={styles.submitButton}
            onPress={this.openAR}
            disabled={!this.state.taskCanBePerformed}
          />
        )

      default: //Descripción
        this.saveLog("Descripción de la salida visualizada");
        return (
          <View></View>
        )
    }
  };


  getImage = () => {
    switch (this.state.item.type) {
      case 'VALORACIÓN':
        return require('../../../assets/tasks/rating.jpg');

      case 'VIDEO':
        return require('../../../assets/tasks/video.jpg');

      case 'OPINIÓN':
        return require('../../../assets/tasks/feedback.jpg');

      case 'DESCRIPCIÓN':
        return require('../../../assets/tasks/description.jpg');

      case 'AUDIO':
        return require('../../../assets/tasks/audio.jpg');

      case 'TEST':
        return require('../../../assets/tasks/question.jpg');

      case 'AR':
        return require('../../../assets/tasks/AR.jpg');

      case 'YOUTUBE':
        return require('../../../assets/tasks/youtube.jpg');

      case 'VIDEO 360':
        return require('../../../assets/tasks/360.jpg');

      default:
        return require('../../../assets/tasks/fieldtrip.jpg');
    }
  }

  render() {
    let imageUrl = this.getImage();
    return(
        <ScrollView style={{flex: 1}}>
          <Image
            style={styles.img}
            source={imageUrl}
          />
          <View style={styles.container}>
            <Text style={styles.title}>
              {this.state.item.task_name.toUpperCase()}
            </Text>
            {this.state.item.type !== 'VIDEO' && this.state.item.type !== 'AUDIO' &&
              this.state.item.type !== 'YOUTUBE' && this.state.item.type !== 'VIDEO 360' &&
            <Text style={styles.question}>
              {this.state.item.question}
            </Text>
            }
            <Text style={styles.description}>
              {this.state.item.description}
            </Text>
            {this.renderTask()}
          </View>
          <Spinner
            visible={this.state.animating}
            textContent={'Cargando...'}
            textStyle={styles.spinnerTextStyle}
          />
          <DropdownAlert ref={ref => this.dropdown = ref} successImageSrc={require('../../../assets/tick_success.png')}/>
        </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  img: {
    height: 200,
    width: Dimensions.get('window').width,
    resizeMode: 'cover'
  },
  title: {
    paddingTop: 20,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#780047',
    width: '80%',
    alignItems: 'center',
    textAlign: 'center',
  },
  question: {
    paddingTop: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    textAlign: 'center',
    width: '80%',
    alignItems: 'center',
  },
  description: {
    paddingTop: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    textAlign: 'center',
    width: '80%',
    alignItems: 'center',
    paddingBottom: 20
  },
  submitButton: {
    backgroundColor: '#0000ff',
    height: 50,
    width: 200
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  textAreaContainer: {
    width: '80%'
  },
  textArea: {
    justifyContent: 'flex-start',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
    height: 120,
    textAlignVertical: "top"
  },
  picker:{
    padding: 5
  }
});

export default connect(mapStateToProps)(DetailsTasks);
