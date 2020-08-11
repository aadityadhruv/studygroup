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
import * as SQLite from 'expo-sqlite';
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
    (window).Expo = Object.freeze({ ...(window).Expo, SQLite });
class App extends React.Component {
  

  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
    };
  }

  componentDidMount() {
//https://gist.github.com/zwily/e9e97e0f9f523a72c24c7df01d889482
    window.openDatabase = SQLite.openDatabase;

    // Hack 2: indexeddbshim will try to examine navigator.userAgent
    // if navigator exists. In React Native, it does, but has no
    // userAgent set. Set one here to avoid a crash.
    navigator.userAgent = "React-Native";
    
    // Hack 3: Initialize indexeddbshim with origin checks disabled,
    // cause they'll fail on our platform (and don't quite make sense.)
    // (Do not change this to an import, cause that will get hoisted above
    // our userAgent hack above.)
    const setGlobalVars = require("./node_modules/indexeddbshim/dist/indexeddbshim-noninvasive");
    setGlobalVars(window, { checkOrigin: false });
    
    // Hack 4: Firestore persistence really wants to use localStorage
    // to communicate between tabs. We don't really care about
    // communicating between tabs - everything will be in the same
    // process. However, Firestore needs something. So we'll give it
    // a really weak, fake, in-memory localStorage. (Persisted storage
    // will go through IndexedDB and into SQLite, on disk.)
    window.__localStorageStore = {};
    window.localStorage = {
      getItem: function(key) {
        return window.__localStorageStore[key];
      },
      setItem: function(key, value) {
        window.__localStorageStore[key] = value;
      },
      removeItem: function(key) {
        delete window.__localStorageStore[key];
      },
      clear: function() {
        window.__localStorageStore = {};
      },
      key: function(i) {
        // Ever since ES6, the order of keys returned here is
        // stable 🤞
        Object.keys(window.__localStorageStore)[i];
      }
    };
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