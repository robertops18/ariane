import React from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, Image, StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import Input from '../../components/text-input';
import Button from '../../components/button';
import TextLink from '../../components/text-link';
import { connect } from 'react-redux';
import API from "../../providers/api";
import DismissKeyboardWrapper from '../../components/dismiss-keyboard-wrapper';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { MAIN_COLOR } from 'react-native-dotenv'
import Orientation from "react-native-orientation";

export class Login extends React.Component {

    componentDidMount() {
        this.mounted = true;

    }

    componentWillUnmount(){
        this.mounted = false;
    }

  componentWillMount(): void {
    Orientation.lockToPortrait();
  }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };

    state = {
        animating: false,
        username: '',
        password: ''
    };

    handleLogin = async () => {


        if(this.mounted) {

            this.setState({animating: true});
            API.login(this.state.username, this.state.password).then((user) => {

                console.log(user);

                if(!user.hasOwnProperty('error')){
                 
                    this.props.dispatch({
                        type: 'SET_USER',
                        payload: {
                            userId: user.userId,
                            token: user.token,
                            }
                        });

                   
                    API.getProfile(user.token).then((profile) => {
                        this.props.dispatch({
                            type: 'SET_PROFILE',
                            payload: {
                                profile
                            }
                        });
                    });

                    API.getFieldTrips(user.token).then((fieldTripsList) => {
                      this.props.dispatch({
                        type: 'SET_TRIPS_LIST',
                        payload: {
                          fieldTripsList
                        }
                      });
                    });

                    this.props.navigation.navigate("App");

                } else {
                    this.showAlert(user.error);
                    this.setState({animating: false});
                }
            }).catch((err) => {
                console.log(err);
                this.setState({animating: false});
                this.showAlert('Hubo un error en la conexión');
            });
        }


    };

    showAlert = (message) => {
        Alert.alert('Login',
            message,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},)
    };

    render(){
        return(
            <DismissKeyboardWrapper style={{ flex: 1}}>
                <View style={styles.container}>
                <Image
                        source={require('../../../assets/logo.png')}
                        style={styles.logo}/>
                    <ActivityIndicator
                        size="large"
                        animating={this.state.animating}
                        color='white'
                    />
                    <Input
                        placeholder="Nombre de usuario"
                        styles={styles.inputSize}
                        secure={false}
                        light={true}
                        onChangeText={(username) => this.setState({username})}
                    />
                    <Input
                        placeholder="Contraseña"
                        styles={styles.inputSize}
                        secure={true}
                        light={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <Button
                        onPress={this.handleLogin}
                        styles={{ width: '70%' }}
                        light={true}
                        label="Iniciar sesión"
                    />
                    <TextLink
                        onPress={() => this.props.navigation.navigate('PasswordRecover')}
                        light={true}
                        label="Recuperar contraseña"
                    />
                    <KeyboardSpacer topSpacing={10}/>
                </View>
            </DismissKeyboardWrapper>

        );
    }
}

export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    inputSize: {
        width: '70%' ,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: MAIN_COLOR,
    }, logo: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 30,
    },
});

function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Login)
