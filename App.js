import React from 'react';
import {Vibration} from 'react-native'
import Timer from './components/Timer';
import { StyleSheet, Text, View, TextInput, } from 'react-native';
import {Constants} from 'expo';
import StartButton from './components/StartButton';
import Header from './components/Header';
import ResetButton from './components/ResetButton';
import DismissKeyboard from './components/DismissKeyboard';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button:{
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: "black",
    width: 70,
    marginLeft: 20,
  }
});

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = this.getInitialState();
  }

  getInitialState(){
    return {
      time: 0,
      paused: true,
      work: true,
      workTime: 0,
      breakTime: 0,
      started: false,
      workMins: 0,
      workSecs: 0,
      breakMins: 0,
      breakSecs: 0,
    }
  }

  initializeTime = () => {
    let working = (this.state.workMins * 60) + this.state.workSecs
    let breaking = (this.state.breakMins * 60) + this.state.breakSecs
    this.setState({workTime: working, breakTime: breaking })
  }

  startCountdown = () => {
     this.initializeTime()
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
    this.interval = clearInterval(this.interval);
    const initialState = this.getInitialState();
    this.setState(initialState);
   }

  inc = () =>{
    if(this.state.work === true){
        if(this.state.time > 0){
          this.setState(prevState =>({
            time: prevState.time - 1,
          }))
        } else {
          Vibration.vibrate();
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
        Vibration.vibrate();
          this.setState(prevState =>({
            time: this.state.workTime, work: !prevState.work
          }))
        }
    }
  }
  handleWorkMins=(event)=>{
    const {text} = event.nativeEvent;
    if (text) this.setState({workMins: parseInt(text)});
    else this.setState({workMins: 0});
  }

  handleWorkSecs=(event)=>{
    const {text} = event.nativeEvent;
    if (text) this.setState({workSecs: parseInt(text)});
    else this.setState({workSecs: 0});
  }
  handleBreakMins=(event)=>{
    const {text} = event.nativeEvent;
    if (text) this.setState({breakMins: parseInt(text)});
    else this.setState({breakMins: 0});
  }

  handleBreakSecs=(event)=>{
    const {text} = event.nativeEvent;
    if (text) this.setState({breakSecs: parseInt(text)});
    else this.setState({breakSecs: 0});
  }

  render(){
    const { started } = this.state;
    return (
      <DismissKeyboard>
      <View style={styles.container}>
        <Header work={this.state.work} />
        <Timer time={this.state.time} />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <StartButton  startCountdown={this.startCountdown} paused={this.state.paused} />
          </View>
          <View style={styles.button}>
            <ResetButton  resetCountdown = {this.resetCountdown} />
          </View>
        </View>
        <View style={styles.inputRow}>
          <Text>Work Time: </Text>
            <TextInput 
              style={styles.input}
              editable={!started}
              keyboardType='numeric'
              value={`${this.state.workMins}`}
              onChange={this.handleWorkMins}
              placeholder="minutes"
              maxLength={2}
              clearButtonMode="always"     
            />
            <TextInput 
              style={styles.input}
              editable={!started}
              keyboardType='numeric'
              value={`${this.state.workSecs}`}
              onChange={this.handleWorkSecs}
              placeholder="seconds"
              maxLength={2}
              clearButtonMode="always"
            />
        </View>
        <View style={styles.inputRow}>
          <Text>Break Time: </Text>
            <TextInput 
              style={styles.input}
              editable={!started}
              keyboardType='numeric'
              value={`${this.state.breakMins}`}
              onChange={this.handleBreakMins}
              placeholder="minutes"
              maxLength={2}
              clearButtonMode="always"
            />
            <TextInput
              style={styles.input}
              editable={!started}
              keyboardType='numeric'
              value={`${this.state.breakSecs}`}
              onChange={this.handleBreakSecs}
              placeholder="seconds"
              maxLength={2} 
              clearButtonMode="always"      
            />
            </View>
      </View>
      </DismissKeyboard>
    );
  }
}
