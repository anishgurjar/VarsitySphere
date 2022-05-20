import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
  
import * as firebase from 'firebase'

import {  Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUVvUIFPlkAZ2RkeH-8E7EABWGZiKjZl0",
  authDomain: "varsitysphere.firebaseapp.com",
  projectId: "varsitysphere",
  storageBucket: "varsitysphere.appspot.com",
  messagingSenderId: "1071450990657",
  appId: "1:1071450990657:web:246aab8b66fc4f9f0f7ec0",
  measurementId: "G-5LDZN59P7Z"
};


if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen, { Main } from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'


import { render } from 'react-dom';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

const Stack = createStackNavigator();


export class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }

      else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }


  render() {

    const { loggedIn, loaded } = this.state;

    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name ="Landing" component={LandingScreen} options = {{ headerShown: false}}/>
            <Stack.Screen name ="Register" component={RegisterScreen}/>
            <Stack.Screen name ="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (

      <Provider store = {store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name ="Main" component={MainScreen} options = {{ headerShown: false}}/>
            <Stack.Screen name ="Add" component={AddScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name ="Save" component={SaveScreen}/>
          </Stack.Navigator>
        </NavigationContainer>

      </Provider>
      
    )
  }
};

export default App;