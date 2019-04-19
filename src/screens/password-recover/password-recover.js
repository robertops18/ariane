import React from 'react';
import { SafeAreaView, StyleSheet, View, ActivityIndicator, Image, Alert } from 'react-native';
import Input from '../../components/text-input';
import Button from '../../components/button';
import API from "../../providers/api";
import BackIcon from '../../components/back-icon';
import KeyboardSpacer from "react-native-keyboard-spacer";
import DismissKeyboardWrapper from "../../components/dismiss-keyboard-wrapper";
import { MAIN_COLOR } from "react-native-dotenv";



class PasswordRecover extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
            headerLeft: <BackIcon color='white' onPress={() => navigation.goBack() } /> };
    };

    state = {
        animating: false,
        email: ''
    };

    handlePassRecover = async () => {
        this.setState({animating: true});
        API.passwordRecover(this.state.email).then((response) => {
            console.log(response);
            this.showAlert(response.message);
            this.setState({animating: false});
        });
    };

    showAlert = (message) => {
        Alert.alert('Recuperar contraseña',
            message,
            [
                {text: 'OK', onPress: () => console.log('pressed')},
            ],
            {cancelable: false},
            )
    };

    render(){
        return(
            <DismissKeyboardWrapper style={{ flex: 1}}>
                <SafeAreaView style={styles.container}>
                    <View>
                        <Image
                            source={require('../../../assets/uniovi.png')}
                            style={styles.logo}
                        />
                        <ActivityIndicator
                            size="large"
                            style={{opacity: this.state.animating ? 1.0 : 0.0}}
                            color='white'
                        />
                        <Input
                            placeholder="Introduce tu correo"
                            secure={false}
                            light={true}
                            onChangeText={(email) => this.setState({email})}
                        />
                        <Button
                            onPress={this.handlePassRecover}
                            light={true}
                            label="Enviar"
                        />
                        <KeyboardSpacer topSpacing={45}/>
                    </View>
                </SafeAreaView>
            </DismissKeyboardWrapper>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: MAIN_COLOR,
    },
    logo: {
        width: 280,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 100,
    }
});

export default PasswordRecover
