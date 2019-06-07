import React from 'react';
import {Text} from 'react-native';

const Header = props  => {
    if(props.work === true){
        status = 'Work'
    } else {
         status = 'Break'
    }
    return (   
        <Text> {`${status} Timer`} </Text>
    )
}

export default Header;