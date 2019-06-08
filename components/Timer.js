import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    styleTimer: {
      fontSize:65,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const Timer = props  => {
  const {time} = props;
    let minutes = Math.floor(props.time / 60)
    let seconds = props.time % 60
    return (
         <Text style={styles.styleTimer}> {`${minutes}: ${String(seconds).padStart(2, '0')}`} </Text>
    )
}

export default Timer;