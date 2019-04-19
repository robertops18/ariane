import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation'

function ProfileIcon(props) {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
            <Icon
                name='ios-contact'
                size={30}
                color='white'
                style={{height:30,width:30}}
            />
        </TouchableOpacity>
    )
}

export default withNavigation(ProfileIcon)