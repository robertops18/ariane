import React from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    View,
    ActivityIndicator,
    Alert,
    Image,
    BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import Input from '../../components/text-input';
import Button from '../../components/button';
import Icon from '../../components/back-icon';
import API from "../../providers/api";
import DismissKeyboardWrapper from "../../components/dismiss-keyboard-wrapper";
import KeyboardSpacer from "react-native-keyboard-spacer";

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

class ChangePassword extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Cambiar contraseña',
            headerTitleStyle: {
                color: 'white'
            },
            headerLeft: <Icon onPress={() => navigation.goBack() } />

        };
    };

    state = {
        animating: false,
        oldPass: '',
        newPass: '',
        newPassRep: ''
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

    handleChangePassword = async () => {
        this.setState({animating: true});
        if(this.state.oldPass !== '' && this.state.newPassRep !== '' && this.state.newPass !== '') {
            API.changePassword(this.state, this.props.user.token).then((response) => {
                this.showAlert(response.message);
                this.setState({animating: false});
                this.props.navigation.goBack();
            });
        } else {
            this.showAlert('¡Rellena todos los campos!');
            this.setState({animating: false});
        }

    };

    showAlert = (response) => {
        Alert.alert('Cambiar contraseña',
            response,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},)
    };

    render(){
        return(
            <DismissKeyboardWrapper style={{ flex: 1}}>
                <SafeAreaView style={styles.container}>
                    <View>
                        <Image
                            source={require('../../../assets/icon.png')}
                            style={styles.logo}
                        />
                        <ActivityIndicator
                            size="large"
                            style={{opacity: this.state.animating ? 1.0 : 0.0}}
                            color='#780047'
                        />
                        <Input
                            placeholder="Contraseña antigua"
                            secure={true}
                            onChangeText={(oldPass) => this.setState({oldPass})}
                        />
                        <Input
                            placeholder="Nueva contraseña"
                            secure={true}
                            onChangeText={(newPass) => this.setState({newPass})}
                        />
                        <Input
                            placeholder="Repite la nueva"
                            secure={true}
                            onChangeText={(newPassRep) => this.setState({newPassRep})}
                        />
                        <Button
                            onPress={this.handleChangePassword}
                            label="Guardar"
                        />
                        <KeyboardSpacer topSpacing={30}/>
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
        backgroundColor: 'white',
    },
    inputLayout: {
        width: 300
    },
    logo: {
        width: 280,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 100,
    }
});

export default connect(mapStateToProps)(ChangePassword)
