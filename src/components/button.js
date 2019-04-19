import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MAIN_COLOR } from 'react-native-dotenv'

function CustomButton(props) {
    let buttonColor = !props.light ? MAIN_COLOR : 'white';
    let fontColor = props.light ? MAIN_COLOR : 'white';

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[{...props.styles} ,styles.button, props.style, {backgroundColor: buttonColor, opacity: props.disabled ? 0.4 : 1}]}
            disabled={props.disabled}
        >
            <Text style={[styles.buttonLabel, {color: fontColor}]}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: MAIN_COLOR,
        borderRadius: 8,
    },
    buttonLabel: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center'
    },
});

export default CustomButton