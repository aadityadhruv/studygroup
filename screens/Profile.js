import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button,TextInput } from 'react-native';
import { Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function Profile({ navigation, route }) {
    return (
        <View>
<View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Groups')}>
            <Text style={styles.connectOptionsText}>Our Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.connectOptionsText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.connectOptionsText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
            </View>
    )
}
Profile.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: screenHeight / 5,
      marginTop: screenHeight - 200,
    },
    connectOptions: {
      marginTop: 10,
      alignContent: "center",
      padding: 15,
      paddingBottom: 15,
      marginLeft: 0,
      marginRight: 0,
      backgroundColor: '#0099FF',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    connectOptionsText: {
      fontSize: 24,
      color: '#FFFFFF',
      textAlign: 'center'
    },
    container: {
      flex: 1,
      backgroundColor: '#f5fcfc',
    },
  });
  
export default Profile


