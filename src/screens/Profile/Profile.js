import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, Button, Settings, TextInput, Dimensions, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Classes from './Data/Classes.json'
import data from './Data/data.json'

import data2 from './Data/data2.json'
import { SearchBar } from 'react-native-elements'
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
    this.setState({classes:a});
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

            this.setState({ classes: [...this.state.classes, item] })
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

      <View>
        <View style={styles.liss}>
          <FlatList
            data={this.state.classes}
            renderItem={renderItem2}

            ListEmptyComponent={() => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                {
                  this.state.loading ? null : (
                    <Text style={{ fontSize: 15 }} ></Text>
                  )
                }
              </View>
            )}
          />
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
            renderItem={renderItem}

            ListEmptyComponent={() => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                {
                  this.state.loading ? null : (
                    <Text style={{ fontSize: 15 }} >No such word found... try something else</Text>
                  )
                }
              </View>
            )}
          />
        </View>
      </View>);
  }
}
function Profile({ navigation, route }) {
  const [name, setName] = React.useState("")
  var user = firebase.auth().currentUser;
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
  return (
    <View styles = {styles.hi}>
      <FirebaseInfo></FirebaseInfo>
      <Text style={styles.connectOptions2}>
        Your user info:
          Name : {name}
      </Text>
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
  hi:{
flex:1
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
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 30,
    marginTop: 50,
    flex: 1,
    flexDirection: 'row',
  },
  connectOptions: {
    width: 150,
    marginTop: 2,
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