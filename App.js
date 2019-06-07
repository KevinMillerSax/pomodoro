import React from 'react';
import {vibrate} from './utils';
import Timer from './components/Timer';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Constants} from 'expo';
import StartButton from './components/StartButton';
import Header from './components/Header';
import ResetButton from './components/ResetButton';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = this.getInitialState();
    // this.state = {
    //   time: 0,
    //   paused: true,
    //   work: true,
    // }
  }
  
  

  getInitialState(){
    return {
      time: 0,
      paused: true,
      work: true,
      workTime: 15,
      breakTime: 15,
      started: false,
    }
  }

  startCountdown = () => {
    if(this.state.started === false) {
      this.setState(state => ({
        time: state.workTime,
        started: true,
        paused: false,
      }))
      this.interval = setInterval(this.inc, 1000);
    } else if(this.state.paused === true){
      this.interval = setInterval(this.inc, 1000);
      this.setState(prevState => ({
        paused: !prevState.paused,
      }))
    } else {
      this.interval = clearInterval(this.interval);
      this.setState(prevState => ({
        paused: !prevState.paused,
      }))
    }
  }

  resetCountdown = () => {
    this.setState(prevState => ({
      time: prevState.time
    }))
   }

  inc = () =>{
    if(this.state.work === true){
        if(this.state.time > 0){
          this.setState(prevState =>({
            time: prevState.time - 1,
          }))
        } else {
          this.setState(prevState =>({
            time: this.state.breakTime, work: !prevState.work
          }))
        }
    } else {
      if(this.state.time > 0){
        this.setState(prevState =>({
          time: prevState.time - 1,
        }))
      } else {
          this.setState(prevState =>({
            time: this.state.workTime, work: !prevState.work
          }))
        }

    }
  }


  render(){
    return (
      <View style={styles.container}>
        <Header work={this.state.work}/>
        <Timer time={this.state.time}/>
        <StartButton startCountdown={this.startCountdown} paused={this.state.paused}/>
        <ResetButton resetCountdown = {this.resetCountdown}/>
       <Text>Work Time: </Text>
        <TextInput 
          disabled={this.state.started}
          keyboardType='numeric'
          onChangeText={(text) => {this.setState(
                 (previousState) => {
                    return {
                      workTime: text
                    }
                  }
               );
              }
           }
           placeholder="10"
           maxLength={10}       
        />
       <Text>Break Time: </Text>
        <TextInput
          disabled={this.state.started}
          keyboardType='numeric'
          onChangeText={(text) => {
            this.setState(
                 (previousState) => {
                    return {
                      breakTime: text
                    }
                  }
               );
              }
           }
           placeholder="10"
           maxLength={10}       
        />
      </View>
    );
  }
}
