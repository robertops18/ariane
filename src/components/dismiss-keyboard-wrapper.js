import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const DismissKeyboardWrapper = (props) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} {...props}/>
    );

};

export default DismissKeyboardWrapper;