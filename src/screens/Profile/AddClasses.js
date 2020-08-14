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

function AddClasses({ navigation, route }) {

  class FirebaseInfo extends React.Component {
    state = { groupIDs: data2, loading: false, displayedList: data2, search: "", classes: [], groupname: "", choosingClass: true };

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
      //     console.log(Classes2["SUBJECT CODE"].values())
      this.setState({ displayedList: Object.values(Classes2['SUBJECT CODE']) })
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
        <View style={{ minHeight: 70, padding: 3 }}>
          <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {
            if (Object.values(Classes2['SUBJECT CODE']).includes(item)) {
              //  console.log("hi")
              this.setState({ "choosingClass": false })
              console.log(Object.values(data[item + '.json']["COURSE NUMBER"]))
              console.log("hiiiii")
              if (item) {
                this.setState({ "displayedList": Object.values(data[item + '.json']["COURSE NUMBER"]) })
              }
              console.log("byeee")

            }
            else if (!this.state.classes.includes(item)) {
              //   console.log("hi")
              this.setState({ "choosingClass": true })
              this.setState({ classes: [...this.state.classes, item] })
              var db = firebase.firestore();
              var user = firebase.auth().currentUser;
              var userRef = db.collection("Users").doc(user.uid);
              userRef.update({
                "classes": [...this.state.classes, item]
              })
              this.setState({ "displayedList": Object.values(Classes2['SUBJECT CODE']) })

            }
            else {
              var k = 0
            }
          }}>
            <Text style={styles.connectOptionsText}>{item}</Text>
          </TouchableOpacity>
        </View>
      );
      const renderItem2 = ({ item }) => (
        <View style={{ minHeight: 70, padding: 3 }}>
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
        //   console.log(this.state.displayedList)
      }
      return (

        <View style={styles.hello}>
          <Ionicon name="ios-arrow-back" size={50} onPress={() => navigation.goBack()} style={{ paddingTop: screenHeight * 0.05 }} />

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
            containerStyle={{ backgroundColor: '#F0F8FF', borderTopWidth: 0 , borderBottomWidth: 0 }}
            inputContainerStyle={{ backgroundColor: '#EBEBEB', height: 40, width: '597%', marginLeft: '1%', }} />
          {
            this.state.loading ? (
              <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
              </View>
            ) : null
          }

          {this.state.choosingClass ? <Text></Text>
            : <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {
              this.setState({ displayedList: Object.values(Classes2['SUBJECT CODE']), "choosingClass": true })
            }}>
              <Text style={styles.connectOptionsText}>Back</Text>
            </TouchableOpacity>

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
  return (

    <FirebaseInfo></FirebaseInfo>
  )
}
const styles = StyleSheet.create({
  hello: {
    flex: 1,
    height: screenHeight * 0.9,
    backgroundColor:'#F0F8FF'
  },
  liss: {
    flex: 1,
    flexDirection: 'row'
  },
  hi: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    flexDirection: 'row'
  },
  hi4: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0,
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
    backgroundColor: '#F0F8FF',
  },
});

export default AddClasses
