import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'


import firebase from 'firebase'


export default function Chats({ navigation, route }) {
  let unsubscribe;


  class FirebaseInfo extends React.Component {
    state = { chats: [], loading: false ,text2:"" };
  
    componentDidMount() {
      var user = firebase.auth().currentUser;
      var db = firebase.firestore();

      
      
      const id = route.params.id;
      //const { itemId } = route.params.id;
      //console.log("id" + itemId);
      
      var msgRef = db.collection("Groups").doc(id).collection("messages");
      unsubscribe =msgRef
      .onSnapshot(function(querySnapshot) {
          var cities = [];
          querySnapshot.forEach(function(doc) {
            if (doc.exists) {
              cities.push(doc.data().text);
            }
              
          });
          console.log(cities);
          this.setState({ chats: cities, loading: false});
      }.bind(this));
      

      //   console.log(this.state.groupIDs);
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
        if (!this.state.text2 == ""){
         
          msgRef.doc(hashString).set(
            {
            from : user.uid,
            text : this.state.text2
          });
          
        
      }
      this.setState({text2:""})
    }
      const renderItem = ({ item }) => (
        <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
          <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8}>
      <Text style={styles.connectOptionsText}>{item}</Text>
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
          <TextInput
            style={{ height: 40, fontSize: 40 }}
            placeholder="Type here!"
            onChangeText={text2 => this.setState({ text2: text2 })}
            defaultValue={this.state.text2}
          />
          <TouchableOpacity style={styles.connectOptions4} activeOpacity={0.8} onPress={() => entered()}>
            <Text style={styles.connectOptionsText}>Enter</Text>
          </TouchableOpacity>


        </View>);
    }

  }
console.log(route.params.word)
  return (
    <View style={styles.buttonContainer2}>
      <View styles={styles.buttonContainer}>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Groups')}>
          <Text style={styles.connectOptionsText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.connectOptionsText2}>{route.params.word}</Text>

      </View>
      <FirebaseInfo></FirebaseInfo>
    </View>
  )
}

const styles = StyleSheet.create({
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
  connectOptionsText: {
    fontSize: 24,
    color: '#FFFFFF',
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
