import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component, KeyboardAvoidingView } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'firebase'

import Ionicon from 'react-native-vector-icons/Ionicons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default function Groups({ navigation, route }) {


    let unsubscribe;


    class FirebaseInfo extends React.Component {
        state = { groupIDs: [], loading: true, displayedList: [], search: "" };

        componentDidMount() {
            var user = firebase.auth().currentUser;
            var db = firebase.firestore();

            var userInfoRef = db.collection("Users").doc(user.uid);
            unsubscribe = userInfoRef.onSnapshot((doc) => {
                console.log(doc.data().groupsList);
                var arr = doc.data().groupsList;
                arr.forEach(element => {
                    if (!element.isGroup) {
                        var otherUserRef = db.collection("Users").doc(element.pcGroupRefHash);
                        otherUserRef.onSnapshot(function(doc2) {
                            console.log(doc2.data().fullName);
                            element.name = doc2.data().fullName;

                        })
                        
                    }
                });

                this.setState({ groupIDs: arr, loading: false, displayedList: arr });
                //          console.log(this.state.groupIDs);

            });



            //   console.log(this.state.groupIDs);
        }
        componentWillMount() {
            return unsubscribe;
        }
        render() {
            const renderItem = ({ item }) => (
                <View style={{ minHeight: 70, padding: 1 }}>
                    <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {
                        navigation.navigate('Chats', { id: item.id, name: item.name })
                    }}>
                        <Text style={styles.connectOptionsText}>{item.name}</Text>
                    </TouchableOpacity>

                </View>
            );
            const updateSearch = (event) => {
                const filteredList = this.state.groupIDs.filter(
                    (item) => {
                        let word = item.name.toLowerCase();
                        let lowerSearch = event.toLowerCase();
                        return word.indexOf(lowerSearch) > -1;
                    }
                )
                this.setState({ search: event, displayedList: filteredList })
            }

            return (

                <View style={{ height: screenHeight * 0.75 }}>
                    <View style={{ height: 30 }}></View>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={(value) => updateSearch(value)}
                        value={this.state.search.toString()}
                        lightTheme={true}
                        round={true}
                        containerStyle={{ backgroundColor: '#F0F8FF', borderTopWidth: 0,borderBottomWidth: 0 }}
                        inputContainerStyle={{ backgroundColor: '#EBEBEB', height: 40, width: '597%', marginLeft: '1%', }} />
                    {this.state.loading ? (
                        <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : null}
                    <FlatList

                        data={this.state.displayedList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                                {
                                    this.state.loading ? null : (
                                        <Text style={{ fontSize: 15 }} >No Groups found. Join A Group</Text>
                                    )
                                }
                            </View>
                        )}
                    />
                </View>);
        }

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
            flex: 1,
            flexDirection: 'column',
            backgroundColor:'#F0F8FF',
        }}>
                  <KeyboardAwareScrollView
        style={{ backgroundColor: '#F0F8FF' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >

            <FirebaseInfo>
            </FirebaseInfo>
            <View style={styles.buttonContainer}>
                <Ionicon name="ios-chatbubbles" size={50} onPress={() => navigation.navigate('Groups')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, 
                      marginBottom: screenHeight / 20,
        borderRadius: 10,
        borderWidth: 1,}} />
                <Ionicon name="ios-home" size={50} onPress={() => navigation.navigate('HomeScreen')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, marginBottom: screenHeight / 20 }} />
                <Ionicon name="ios-person" size={50} onPress={() => navigation.navigate('Profile')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, marginBottom: screenHeight / 20 }} />

            </View>
            </KeyboardAwareScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 50,

        marginTop: screenHeight*0.1,

        flex: 1,
        flexDirection: 'row',

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
        backgroundColor: '#F0F8FF',
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
