import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, Button, Settings, TextInput, Dimensions, FlatList, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Classes2 from './Data/Classes.json'
import data from './Data/data.json'
import { ScrollView } from 'react-native-gesture-handler';
import data2 from './Data/data2.json'
import { SearchBar } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import firebase from 'firebase'
let unsubscribe




function Profile({ navigation, route }) {
  const [name, setName] = React.useState("")
  const [classes, setclasses] = React.useState([])
  const [edit, setEdit] = React.useState(false);
  var user = firebase.auth().currentUser;
  var db = firebase.firestore();
  var userInfoRef = db.collection("Users").doc(user.uid);
  //console.log("New frame");
  if (!edit) {
    userInfoRef.onSnapshot(function (doc) {
      if (doc.exists) {
        var person = doc.data();
        setName(person.fullName);
        setclasses(person.classes)
      } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
      }
    })
  }
  function logout() {
    firebase.auth().signOut().then(function () {
      console.log('Signed Out');
    }, function (error) {
      console.error('Sign Out Error', error);
    });
    navigation.navigate('Login')
  }
  return (
    <View style={{
      height: screenHeight,
      width: screenWidth,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
    }}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <View style={styles.list2}>

          <TouchableOpacity style={styles.connectOptions13} activeOpacity={0.8} onPress={() => {
            logout()
          }}>
            <Text styles= {{textAlign : 'center'}}>LogOut</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.liss}>
          <TouchableOpacity style={styles.connectOptions2}>
            {edit ? <TextInput
              onChangeText={text => setName(text)}
              defaultValue={name}
            /> : <Text>Name: {name}</Text>}
          </TouchableOpacity>
          <MaterialIcons name="edit" size={40} onPress={() => {
            // console.log(name);
            setEdit(!edit);
            var user = firebase.auth().currentUser;
            user.updateProfile({
              displayName: name,
            }).then(function () {
              var db = firebase.firestore();
              var userRef = db.collection("Users").doc(user.uid);
              userRef.update({
                "fullName": name
              })
            }).catch(function (error) {
              // An error happened.
            });
          }}
            style={{ alignSelf: 'center', paddingLeft: 15, paddingTop: screenHeight / 8, marginBottom: screenHeight / 5 }} />


        </View>
        <View style={styles.liss}>
          <TouchableOpacity style={styles.connectOptions2}>
            <Text>Classes: {classes}</Text>
          </TouchableOpacity>
          <MaterialIcons name="edit" size={40} onPress={() => {
            navigation.navigate("AddClasses")
          }}
            style={{ alignSelf: 'center', paddingLeft: 20, paddingTop: screenHeight / 8, marginBottom: screenHeight / 5 }} />
        </View>
        <View style={styles.buttonContainer}>
          <Ionicon name="ios-chatbubbles" size={50} onPress={() => navigation.navigate('Groups')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, paddingTop: screenHeight / 5, marginBottom: screenHeight / 5 }} />
          <Ionicon name="ios-home" size={50} onPress={() => navigation.navigate('HomeScreen')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, paddingTop: screenHeight / 5, marginBottom: screenHeight / 5 }} />
          <Ionicon name="ios-person" size={50} onPress={() => navigation.navigate('Profile')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, paddingTop: screenHeight / 5, marginBottom: screenHeight / 5 }} />

        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
Profile.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  hello: {
    flex: 0,
    height: screenHeight * 0.6
  },
  liss: {
    flex: 1,
    flexDirection: 'row'
  },
  list2: {
    flex: 1,
    flexDirection: 'row',
    marginTop : screenHeight * 0.1
  },
  hi: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    flexDirection: 'row'
  },
  inputBox: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: screenWidth - 40,
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: screenHeight * 0.13,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 20,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
  },
  headerContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    height: 40,
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
  },
  connectOptions: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 60,
    marginTop: 1,
    alignContent: "center",
    padding: 15,
    backgroundColor: '#0099FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  connectOptionsText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  connectOptions2: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.06,
    marginTop: 30,
    alignContent: "center",
    padding: 15,
    backgroundColor: '#0099FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  connectOptions13: {
    width: screenWidth * 0.3,
    height: screenHeight * 0.05,
    position : "absolute", 
    right : 0,
    justifyContent: 'center',
    alignContent : 'center',
    //paddingRight: screenWidth * 0.8,
    
    marginBottom: screenHeight / 5,
    padding: 15,
    backgroundColor: '#0099FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },

  connectOptionsEdit: {
    width: screenWidth * 0.15,
    height: screenHeight * 0.07,
    alignContent: "center",
    marginTop: 30,
    padding: 15,
    backgroundColor: '#0099FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  connectOptions3: {
    marginTop: 10,
    height: 90,
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
  connectOptions4: {
    marginTop: 10,
    height: 50,
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