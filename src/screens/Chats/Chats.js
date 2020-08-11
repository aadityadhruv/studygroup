import React, { useState, useEffect, Fragment } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'
//import { PushController } from '../../services/LocalPushController'

import firebase from 'firebase'

import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';


export default function Chats({ navigation, route }) {

  let unsubscribe;
  let unsubscribe2;


  function createPersonalChat(userID) {
    var db = firebase.firestore();
                    var hashString = (+new Date).toString(36);
                    var dataBaseRef = db.collection("Groups").doc(hashString);
                    var user = firebase.auth().currentUser;
                    var memberList = [];
                    memberList.push(user.uid);
                    memberList.push(userID);
                    //var data = { name: this.state.groupname, id: hashString, owner: user.displayName, members: memberList, label: this.state.classes, desc: this.state.description, isGroup : true};


                    var data = { name: "Personal Chat between ", id: hashString, owner: user.displayName, members: memberList, label : [], desc : "", isGroup : false};
                    console.log(data);
                    
                    dataBaseRef.set(data);
                    
                    var userRef = db.collection("Users").doc(user.uid);
                    var otherUserRef = db.collection("Users").doc(userID);
                    var otherUserName = "";
                    otherUserRef.get().then(function(doc) {
                      if (doc.exists) {
                          otherUserName = doc.data().fullName;
                      } else {
                          // doc.data() will be undefined in this case
                          console.log("No such document!");
                      }
                  }).catch(function(error) {
                      console.log("Error getting document:", error);
                  });

                    
                   
                     
                    console.log("reached here");
                    userRef.update({
                        //TODO: double name error

                        "groupsList": firebase.firestore.FieldValue.arrayUnion({ "id": hashString, "name": otherUserName})


                    });
                    
                    
                    otherUserRef.update({
                      //TODO: double name error

                      "groupsList": firebase.firestore.FieldValue.arrayUnion({ "id": hashString, "name": user.displayName})


                  });
                  
                    navigation.navigate('Chats', { id : hashString, name: "Personal Chat"});
  }
  class FirebaseInfo extends React.Component {
    state = { chats: [], loading: false, text2: "", usersName: "", id : ""};
    componentDidMount() {
      var user = firebase.auth().currentUser;
      var db = firebase.firestore();

      const id = route.params.id;
      //const { itemId } = route.params.id;
      //console.log("id" + itemId);

      var msgRef = db.collection("Groups").doc(id).collection("messages");
      unsubscribe = msgRef
        .onSnapshot(function (querySnapshot) {
          var cities = [];
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              cities.unshift({ text: doc.data().text, from: doc.data().from, id : doc.data().id });
            }
          });

          this.setState({ chats: cities, loading: false });
        }.bind(this));


    }
    componentWillMount() {
      return unsubscribe;
    }
    render() {

      const entered = () => {

        var user = firebase.auth().currentUser;
        var db = firebase.firestore();

        var msgRef = db.collection("Groups").doc(route.params.id).collection("messages");

        var hashString = (+new Date).toString(36);
        if (!this.state.text2 == "") {
         // console.log(user)
          msgRef.doc(hashString).set(
            {
              from: user.displayName,
              text: this.state.text2,
              id : user.uid
            });


        }
        this.setState({ text2: "" })
      }

      const renderItem = ({ item }) => (
        <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
          <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => createPersonalChat(item.id)}>
            <Text style={styles.connectOptionsText}>{item.from}</Text>
            <Text style={styles.connectOptionsText}>{item.text}</Text>
          </TouchableOpacity>

        </View>
      );
      return (
        <View style={{ flex: 1 }}>
          {
            this.state.loading ? (
              <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
              </View>
            ) : null
          }
          <FlatList
            data={this.state.chats}
            renderItem={renderItem}
            inverted={true}

            keyExtractor={(item, index) => index.toString()}
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
          <View style={styles.second}>
            <TextInput
              style={styles.connectOptions2}
              placeholder="Type here!"
              onChangeText={text2 => this.setState({ text2: text2 })}
              defaultValue={this.state.text2}
            />
            <TouchableOpacity style={styles.connectOptions3} activeOpacity={0.8} onPress={() => entered()}>
              <Text style={styles.connectOptionsText}>Enter</Text>
            </TouchableOpacity>
          </View>
        </View >);
    }

  }
//  console.log(route.params.id)
  return (
    <View style={styles.buttonContainer2}>
      <View style={styles.second}>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Groups')}>
          <Text style={styles.connectOptionsText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('GroupInfo',{ id: route.params.id, name: route.params.name })}>
          <Text style={styles.connectOptionsText}>{route.params.name}</Text>
        </TouchableOpacity>

       
      </View>

      <FirebaseInfo></FirebaseInfo>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: { backgroundColor: Colors.lighter, },
  listHeader: { backgroundColor: '#eee', color: "#222", height: 44, padding: 12 },
  title: { fontSize: 18, fontWeight: 'bold', paddingTop: 10 },
  message: { fontSize: 14, paddingBottom: 15, borderBottomColor: "#ccc", borderBottomWidth: 1 },
  engine: { position: 'absolute', right: 0, },
  body: { backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 10, },
  sectionContainer: { marginTop: 32, paddingHorizontal: 24, },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: Colors.black },
  sectionDescription: { marginTop: 8, fontSize: 18, fontWeight: '400', color: Colors.dark, },
  highlight: { fontWeight: '700' },
  footer: { color: Colors.dark, fontSize: 12, fontWeight: '600', padding: 4, paddingRight: 12, textAlign: 'right', },

  second2: {
    flex: 1,
    flexDirection: 'row'
  },

  second: {
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',

  },
  buttonContainer2: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',

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
  connectOptions2: {
    width: 350,
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

  connectOptions3: {
    width: 50,
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
    color: 'black',
    textAlign: 'center'
  },
  connectOptionsText2: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: '#f5fcfc',
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 20,
    marginVertical: 10,
    justifyContent: 'center'
  },
  head: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    flexDirection: 'row'
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 1,
  },
  heading: {
    fontSize: 48,
    fontWeight: '700',
    paddingLeft: 15,
  },
})
