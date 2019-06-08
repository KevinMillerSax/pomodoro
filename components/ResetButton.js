import React from 'react';
import {Button} from 'react-native';

const ResetButton = props  => {  
    return (
        <Button color="red" title='Reset' onPress={props.resetCountdown}></Button>
    )
}

export default ResetButton;