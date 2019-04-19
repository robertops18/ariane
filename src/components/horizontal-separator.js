import React from 'react';
import {View, StyleSheet} from 'react-native';

function HorizontalSeparator(props) {
    return (
        <View
            style={styles.separator}
        />
    )
}

const styles = StyleSheet.create({
    separator: {
        borderWidth: 0.5,
        borderColor:'#070707',
        margin: 3,
    },
});

export default HorizontalSeparator