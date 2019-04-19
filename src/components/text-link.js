import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MAIN_COLOR } from 'react-native-dotenv'

function TextLink(props) {
    let fontColor = props.light ? 'white' : MAIN_COLOR;

    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <Text style={[styles.linkLabel, {color: fontColor}]}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    linkLabel: {
        fontSize: 15,
        color: MAIN_COLOR,
        marginTop: 10,
        textAlign: 'center'
    }
});

export default TextLink