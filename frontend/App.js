import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'

import firebase from 'firebase/app'
import 'firebase/auth'
import { doc, setDoc, getDoc, collection, addDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove, increment } from 'firebase/firestore'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnJ8WmWCt22N15O-zwv0H1sW80uGmBkPs",
  authDomain: "instagram-dev-b0971.firebaseapp.com",
  projectId: "instagram-dev-b0971",
  storageBucket: "instagram-dev-b0971.appspot.com",
  messagingSenderId: "615330215745",
  appId: "1:615330215745:web:4170958c30bd20ce57d3c0",
  measurementId: "G-89DCSB66JB"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn:false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn:true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
      </NavigationContainer>
      );
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
                <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
                <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    )
  }
}

export default App
