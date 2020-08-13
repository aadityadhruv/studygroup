import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, Button, Settings, TextInput, Dimensions, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Classes from './Data/Classes.json'
import data from './Data/data.json'
import { ScrollView } from 'react-native-gesture-handler';
import data2 from './Data/data2.json'
import { SearchBar } from 'react-native-elements'

import Ionicon from 'react-native-vector-icons/Ionicons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import firebase from 'firebase'
let unsubscribe
class FirebaseInfo extends React.Component {
  state = { groupIDs: data2, loading: false, displayedList: data2, search: "", classes: [], groupname: "" };

  componentDidMount() {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();

    var userInfoRef = db.collection("Users").doc(user.uid);
    userInfoRef.onSnapshot((doc) => {
      var a = doc.data().classes;
      if (a == undefined) {
        a = []
      }
      this.setState({ classes: a });
    });
  }
  componentWillMount() {
    return unsubscribe;
  }
  render() {
    //            console.log(this.state.groupIDs)
    const removeItemOnce = (arr, value) => {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }

    const renderItem = ({ item }) => (
      <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {
          if (!this.state.classes.includes(item)) {
            console.log("hi")
            this.setState({ classes: [...this.state.classes, item] })
            var db = firebase.firestore();
            var user = firebase.auth().currentUser;
            var userRef = db.collection("Users").doc(user.uid);
            userRef.update({
              "classes": [...this.state.classes, item]
            })
          }
        }}>
          <Text style={styles.connectOptionsText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
    const renderItem2 = ({ item }) => (
      <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {
          this.setState({ classes: removeItemOnce(this.state.classes, item) })
          var db = firebase.firestore();
          var user = firebase.auth().currentUser;
          var userRef = db.collection("Users").doc(user.uid);
          userRef.update({
            //TODO: double name error
            "classes": removeItemOnce(this.state.classes, item)
          })
        }}>
          <Text style={styles.connectOptionsText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
    const updateSearch = (event) => {
      const filteredList = this.state.groupIDs.filter(
        (item) => {
          //      console.log(item)
          let word = item.toLowerCase();
          let lowerSearch = event.toLowerCase();
          return word.startsWith(lowerSearch);
        }
      )
      this.setState({ search: event, displayedList: filteredList })
      //        console.log(this.state.displayedList[0])
    }
    return (

      <View style={styles.hello}>
        <View style={styles.hi4}>
          <FlatList
            data={this.state.classes}
            numColumns={4}
            renderItem={renderItem2}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <SearchBar
          placeholder="Search"
          onChangeText={(value) => updateSearch(value)}
          value={this.state.search.toString()}
          lightTheme={true}
          round={true}
          containerStyle={{ backgroundColor: 'white', borderTopWidth: 0 }}
          inputContainerStyle={{ backgroundColor: '#EBEBEB', height: 40, width: '597%', marginLeft: '1%', }} />

        {
          this.state.loading ? (
            <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }

        <FlatList
          data={this.state.displayedList}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
              {
                this.state.loading ? null : (
                  <Text style={{ fontSize: 15 }} >No such Group found... try something else</Text>
                )
              }
            </View>
          )}
        />
      </View>);
  }
}
function Profile({ navigation, route }) {
  const [name, setName] = React.useState("")
  var user = firebase.auth().currentUser;
  var db = firebase.firestore();
  var userInfoRef = db.collection("Users").doc(user.uid);
  console.log("New frame");
  userInfoRef.get().then(function (doc) {
    if (doc.exists) {
      var person = doc.data();
      setName(person.fullName);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
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
      height:screenHeight,
      width:screenWidth,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
    }}>
      <View style={styles.head}>
        <Text style={styles.connectOptions2}>
          Name : {name}
        </Text>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => logout()}>
                    <Text style={styles.connectOptionsText}>Log Out</Text>
                </TouchableOpacity>
              
      </View>
      <FirebaseInfo></FirebaseInfo>

      <View style={styles.buttonContainer}>
      <Ionicon name="ios-chatbubbles" size={50} onPress={() => navigation.navigate('Groups')} style={{ alignSelf: 'center',paddingRight:screenWidth/10,paddingLeft:screenWidth/10, paddingTop: screenHeight / 5, marginBottom: screenHeight / 5 }} />
                <Ionicon name="ios-home" size={50} onPress={() => navigation.navigate('HomeScreen')} style={{ alignSelf: 'center',paddingRight:screenWidth/10,paddingLeft:screenWidth/10, paddingTop: screenHeight / 5, marginBottom: screenHeight / 5 }} />
                <Ionicon name="ios-person" size={50} onPress={() => navigation.navigate('Profile')} style={{ alignSelf: 'center',paddingRight:screenWidth/10,paddingLeft:screenWidth/10, paddingTop: screenHeight / 5, marginBottom: screenHeight / 5 }} />

      </View>
    </View>
  )
}
Profile.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  hello: {
    flex: 0,
    height: 500
  },
  liss: {
    flex: 1
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
    marginTop:screenHeight*0.13,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 20,
    marginBottom: 0,
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
    marginTop: 20,
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