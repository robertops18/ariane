import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { ActivityIndicator } from "react-native";
import ImagePicker from "react-native-image-picker";
import TextLink from "../../components/text-link";
import API from "../../providers/api";
import ImageDataForm from "../../providers/image-data-form";
import { MAIN_COLOR } from "react-native-dotenv";
import {Image} from "react-native-elements";
import translate from '../../utils/language.utils.js';


function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile
  };
}

class SettingsScreen extends React.Component {
  state = {
    photo: {
      uri: this.props.profile.profile.avatar
    }
  };

  handleLogout = () => {
    this.props.dispatch({
      type: "REMOVE_PROFILE"
    });
    this.props.dispatch({
      type: "REMOVE_USER"
    });
    this.props.navigation.navigate("AuthLoading");
  };

  handleChoosePhoto = () => {
    const options = {
      noData: false,
      title: "Selecciona una imagen",
      cancelButtonTitle: "Cancelar",
      takePhotoButtonTitle: "Cámara",
      chooseFromLibraryButtonTitle: "Galería",
      mediaType: "photo"
    };
    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel) {
        this.setState({ photo: response });
        this.handleUploadPhoto();
      }
    });
  };

  async handleUploadPhoto() {
    let data = JSON.stringify({image:this.state.photo.data});
    await API.uploadAvatar(this.props.user.token, data).then((res)=>console.log(res)).catch(err=>console.log(err));

    await API.getProfile(this.props.user.token).then(profile => {
      console.log(profile)
      this.props.dispatch({
        type: "SET_PROFILE",
        payload: {
          profile
        }
      });
    }).catch((err)=>console.log(err));
  }

  render() {
    const photo = this.state.photo;
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
          <Image
            source={require('../../../assets/logo.png')}
          />
        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.textName}>{this.props.profile.profile.username.toUpperCase()}</Text>
            <Text style={styles.textSurname}>{`${this.props.profile.profile.name} ${this.props.profile.profile.surname}`} </Text>

            <Text style={styles.textEmail}>{this.props.profile.profile.email}</Text>
          </View>
         
          <TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate("ChangePassword")}>
            <View style={styles.itemContent}>
              <Text style={styles.title}>{translate('CHANGE_PASSWD')}</Text>
            </View>
            <View style={styles.arrowIcon}>
              <Icon name='ios-arrow-forward' size={18} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TextLink onPress={this.handleLogout} label={translate('LOGOUT')} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%"
  },
  menuContainer: {
    width: "100%",
    padding: 10
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 20
  },
  logo: {
    width: 130,
    height: 50,
    marginTop: 50,
    marginBottom: 10,
    resizeMode: "contain"
  },
  infoContainer: {
    width: 300,
    padding: 10
  },
  textName: {
    fontWeight: "bold",
    fontSize: 20
  },
  textEmail: {
    color: MAIN_COLOR,
    fontSize: 18
  },
  textGroup: {
    fontWeight: "bold"
  },

  itemContainer: {
    flexDirection: "row"
  },
  img: {
    height: 60,
    width: 60,
    resizeMode: "contain"
  },
  itemContent: {
    padding: 9,
    justifyContent: "space-between"
  },
  title: {
    fontSize: 15,
    color: "black",
  },
  arrowIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20
  },
  bottom: {
    marginBottom: 10
  }
});

export default connect(mapStateToProps)(SettingsScreen);
