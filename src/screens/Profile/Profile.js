import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { Dimensions } from "react-native";
import { firebase } from '../../firebase/config'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);



function Profile({ navigation, route }) {
  const txt2 = ""
  const [text2, setText2] = React.useState(txt2)
  const [name, setName] = React.useState("")
  var user = firebase.auth().currentUser;
  
  var databaseRef = firebase.database().ref("Users/" + user.uid + "/data/fullName");
  
  databaseRef.once('value').then(snapshot => {
    if (snapshot.val() != undefined) {
      setName(snapshot.val());
    }    
  });
  



  return (
    <View>
      <Text style={styles.connectOptions2}>
        Enter your classes
          </Text>
      <View style={styles.inputBox}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here!"
          onChangeText={text2 => setText2(text2)}
          defaultValue={text2}
        />


      </View>
      <View>
        <Text style={styles.connectOptions2}>
          Your user info:

          Name : {name}
        </Text>
      </View>



      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Groups')}>
          <Text style={styles.connectOptionsText}>Our Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.connectOptionsText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.connectOptionsText}>Profile</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}
Profile.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  inputBox: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: screenWidth - 40,
    borderWidth: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 30,
    marginTop: 500,
    flex: 1,
    flexDirection: 'row',
  },
  connectOptions: {
    width: 150,
    marginTop: 200,
    alignContent: "center",
    padding: 15,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#0099FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  connectOptionsText: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  connectOptions2: {
    marginTop: 50,
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

  container: {
    flex: 1,
    backgroundColor: '#f5fcfc',
  },
});

export default Profile


