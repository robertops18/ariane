import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Dimensions, BackHandler, Alert} from 'react-native';
import StarRating from "react-native-star-rating";
import {Button, Image} from "react-native-elements";
import translate from "../../utils/language.utils";
import API from "../../providers/api";
import {connect} from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import Spinner from "react-native-loading-spinner-overlay";


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
      alertMessage: ''
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

  sendTask = () => {
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

  renderTask = () => {
    switch (this.state.item.type) {
      case 'VALORACIÓN':
        return (
          <View>
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
              onPress={this.sendTask}
              disabled={this.state.starCount === 0}
            />
            <Spinner
              visible={this.state.animating}
              textContent={'Enviando...'}
              textStyle={styles.spinnerTextStyle}
            />
            <DropdownAlert ref={ref => this.dropdown = ref} />
          </View>
        );

      case 'VIDEO':
        return (
          <View>
            <Button
              buttonStyle={styles.submitButton}
              title={translate('CAMERA')}
            />
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
    }
  }

  render() {
    let imageUrl = this.getImage();
    return(
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={imageUrl}
        />
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
  }
});

export default connect(mapStateToProps)(DetailsTasks);
