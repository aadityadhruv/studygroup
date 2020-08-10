import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'


import firebase from 'firebase'


export default function Chats({ navigation, route }) {
  let unsubscribe;
  let unsubscribe2;



  class FirebaseInfo extends React.Component {
    state = { chats: [], loading: false, text2: "", usersName: "" };

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
              cities.push({ text: doc.data().text, from: doc.data().from });
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
          console.log(user)
          msgRef.doc(hashString).set(
            {
              from: user.displayName,
              text: this.state.text2
            });


        }
        this.setState({ text2: "" })
      }
      const renderItem = ({ item }) => (
        <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
          <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8}>
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

        </View>);
    }

  }
  console.log(route.params.id)
  function leave() {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();

    var userInfoRef = db.collection("Users").doc(user.uid);
    userInfoRef.update({
      "groupsList": firebase.firestore.FieldValue.arrayRemove({ id: route.params.id, name: route.params.name })
    })

    navigation.navigate("Groups")
  }
  return (
    <View style={styles.buttonContainer2}>
      <View style={styles.second}>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Groups')}>
          <Text style={styles.connectOptionsText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8}>
          <Text style={styles.connectOptionsText}>{route.params.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => { leave() }}>
          <Text style={styles.connectOptionsText}>Leave Group</Text>
        </TouchableOpacity>

      </View>

      <FirebaseInfo></FirebaseInfo>
    </View>
  )
}

const styles = StyleSheet.create({
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
