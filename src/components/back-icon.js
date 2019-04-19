import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MAIN_COLOR } from 'react-native-dotenv'


function BackIcon(props) {
    return (
        <View style={styles.iconWrapper} >
            <Icon style={styles.iconStyle} size={29} name='ios-arrow-back' color={props.color || 'white'} onPress={props.onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    iconStyle: {
        paddingLeft: 20,
        paddingTop: 5,
        paddingRight: 30,
        paddingBottom: 0
    },
    iconWrapper: {
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').height * 0.05,
    }
});

export default BackIcon