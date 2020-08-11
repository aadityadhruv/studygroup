import { NavigationContainer, Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { useEffect, useState } from 'react'
import { LoginScreen, HomeScreen, RegistrationScreen} from './src/screens'
import { decode, encode } from 'base-64'

import Groups from './src/screens/Groups/Groups.js';
import Profile from './src/screens/Profile/Profile';
import Chats from './src/screens/Chats/Chats';
import CreateGroup from './src/screens/Groups/CreateGroup.js';
import JoinGroup from './src/screens/Groups/JoinGroup.js';
import { YellowBox } from 'react-native';
import _ from 'lodash';

import firebase from 'firebase'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

YellowBox.ignoreWarnings(['Setting a timer']);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
    };
  }
  componentDidMount() {


    firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
        console.log(this.state.authenticated);
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }
  render() {
    if (this.state.loading) return null;
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.authenticated ? (
            <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Groups" component={Groups} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} />
            <Stack.Screen name="JoinGroup" component={JoinGroup} />
          </>
          ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Groups" component={Groups} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Chats" component={Chats} />
                <Stack.Screen name="CreateGroup" component={CreateGroup} />
                <Stack.Screen name="JoinGroup" component={JoinGroup} />
              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App


/*

*/