import React from 'react';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    header: {
      fontSize:35,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const Header = props  => {
    if(props.work === true){
        status = 'Work'
    } else {
         status = 'Break'
    }
    return (   
        <Text style={styles.header}> {`${status} Timer`} </Text>
    )
}

export default Header;