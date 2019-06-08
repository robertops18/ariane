import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { MAIN_COLOR } from 'react-native-dotenv'

class Input extends React.Component {

    state = {
        color: '#707070'
    };

    onFocus = () => {
      this.setState({color: MAIN_COLOR})
    };

    onBlur = () => {
        this.setState({color: '#707070'})
    };

    render(){
        const dynamicStyle = this.props.light ? {borderColor: 'white', borderWidth: 1.5, color: 'white'} : {borderWidth: 1, borderColor: this.state.color};
        return(
            <TextInput
                style={[{...this.props.styles}, styles.input, dynamicStyle]}
                placeholder={this.props.placeholder}
                autoCapitalize = 'none'
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                placeholderTextColor={this.props.light ? 'white' : this.state.color}
                secureTextEntry={this.props.secure}
                onChangeText={this.props.onChangeText}
            />
        );
    }
}


const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 5,
    },
});

export default Input
