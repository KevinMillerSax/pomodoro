import React from 'react';
import {Button, StyleSheet} from 'react-native';



const StartButton = props  => {  
    if(props.paused === true){
        status = 'Start';
    } else {
         status = 'Pause'
    }
    return (
        <Button color="red" title={`${status}`} onPress={props.startCountdown}></Button>
    )
}

export default StartButton;