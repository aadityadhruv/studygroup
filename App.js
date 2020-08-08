import { NavigationContainer, Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen.js';
import Groups from './src/screens/Groups/Groups.js';
import Profile from './src/screens/Profile/Profile';
import Chats from './src/screens/Chats/Chats';
import CreateGroup from './src/screens/Groups/CreateGroup.js';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

const Stack = createStackNavigator();
function App (){
  return (
  <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />

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