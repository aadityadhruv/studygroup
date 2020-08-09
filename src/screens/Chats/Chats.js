import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'


import firebase from 'firebase'


export default function Chats({ navigation, route }) {
  let unsubscribe;


  class FirebaseInfo extends React.Component {
      state = { chats: [], loading: true, displayedList: [],search:"",text2:"" };

      componentDidMount() {
          var user = firebase.auth().currentUser;
          var db = firebase.firestore();

          var userInfoRef = db.collection("Users").doc(user.uid);
          unsubscribe = userInfoRef.onSnapshot((doc) => {
              
              this.setState({ chats: doc.data().groupIDs, loading : false, displayedList: doc.data().groupIDs});
        //      console.log(this.state.groupIDs);
          });

       //   console.log(this.state.groupIDs);
      }
      render() {
        const entered = ()=>{
          this.setState({chats:[...this.state.chats,this.state.text2]})
          
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
                              <Text style={{ fontSize: 15 }} >No such word found... try something else</Text>
                          )
                      }
                  </View>
              )}
          />
          <TextInput
            style={{ height: 40, fontSize : 40}}
            placeholder="Type here!"
            onChangeText={text2 => this.setState({text2:text2})}
            defaultValue={this.state.text2}
          />
          <TouchableOpacity style={styles.connectOptions4} activeOpacity={0.8} onPress={() => entered()}>
                <Text style={styles.connectOptionsText}>Enter</Text>
            </TouchableOpacity>
            
        
      </View>);
      }

  }   

  return (
    <View style={styles.buttonContainer2}>
     <View styles = {styles.buttonContainer}>
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
