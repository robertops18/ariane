import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

function Logo(props) {

    let url;
    switch (props.group) {
        case 'COPESE':
            url = require("../../assets/images/logo-copese.png");
            break;
        case 'GRANJAS':
            url = require("../../assets/images/logo-granjas.jpg");
            break;
        case 'ERESMA':
            url = require("../../assets/images/logo-eresma.jpg");
            break;
        case 'PIENSOS':
            url = require("../../assets/images/logo-piensos.png");
            break;
    }

    return (
        <Image
            source={url}
            style={props.style}
        />
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 280,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 10,
    }
});

export default Logo