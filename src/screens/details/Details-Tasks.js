import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import StarRating from "react-native-star-rating";
import {Button, Image} from "react-native-elements";
import translate from "../../utils/language.utils";
import API from "../../providers/api";
import {connect} from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import Spinner from "react-native-loading-spinner-overlay";
import DismissKeyboardWrapper from "../../components/dismiss-keyboard-wrapper";


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
      opinion: ''
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  sendRating = () => {
    this.state.animating = true;
    API.submitAnswer(this.props.user.token, "Valoración: " + this.state.starCount, this.state.item.id).then((value) => {
      this.state.animating = false;
      this.dropdown.alertWithType('success', translate("TASK"), translate("ANSWER_SENDED"));
    }).catch((err) => {
      console.log(err);
      this.state.animating = false;
      this.dropdown.alertWithType('error', 'Error', translate("ANSWER_ERROR"));
    });
  };

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
  };

  onChangeText = (opinion) => {
    this.setState({opinion: opinion});
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
              disabled={this.state.starCount === 0}
            />
            <Spinner
              visible={this.state.animating}
              textContent={'Enviando...'}
              textStyle={styles.spinnerTextStyle}
            />
          </View>
        );

      case 'VIDEO':
        return (
          <View style={{flex:1}}>
            <Button
              buttonStyle={styles.submitButton}
              title={translate('CAMERA')}
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
            <View style={{paddingTop: 20}}>
              <Button
                buttonStyle={styles.submitButton}
                title={translate('SEND')}
                onPress={this.sendOpinion}
                disabled={this.state.opinion === ''}
              />
            </View>
          </View>
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
            <Text style={styles.question}>
              {this.state.item.question}
            </Text>
            <Text style={styles.description}>
              {this.state.item.description}
            </Text>
            {this.renderTask()}
          </View>
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
});

export default connect(mapStateToProps)(DetailsTasks);
