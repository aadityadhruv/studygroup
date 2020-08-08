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


if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();
function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              <Stack.Screen name="Groups" component={Groups} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Chats" component={Chats} />
              <Stack.Screen name="CreateGroup" component={CreateGroup} />

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