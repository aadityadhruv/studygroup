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
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();
function App() {
  console.disableYellowBox = true;
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="HomeScreen">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App


/*

*/