import React from 'react';
import {Button} from 'react-native';

const StartButton = props  => {  
    if(props.paused === true){
        status = 'Start';
    } else {
         status = 'Pause'
    }
    return (
        <Button title={`${status}`} onPress={props.startCountdown}></Button>
    )
}

export default StartButton;