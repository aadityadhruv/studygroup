import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import { SearchBar } from 'react-native-elements';

import firebase from 'firebase';
import Ionicon from 'react-native-vector-icons/Ionicons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function HomeScreen({ navigation, route }) {
    let unsubscribe;
    class FirebaseInfo extends React.Component {
        state = { groupIDs: [], loading: true, displayedList: [], search: "", classes: [] };
        componentDidMount() {
            var user = firebase.auth().currentUser;
            var db = firebase.firestore();

            var userInfoRef = db.collection("Users").doc(user.uid);
            userInfoRef.onSnapshot((doc) => {
                var a = doc.data().groupsList;
                var userGroupsArray = [];
                a.forEach(element => {
                    //         console.log(element.id);
                    userGroupsArray.push(element.id);
                });
                var b = doc.data().classes;
                if (b == undefined) {
                    b = []
                }
                this.setState({ classes: b });

                var user = firebase.auth().currentUser;
                var db = firebase.firestore();
                var groupsRef = db.collection("Groups");
                unsubscribe = groupsRef
                    .onSnapshot(function namae(querySnapshot) {
                        var cities = [];
                        querySnapshot.forEach(function (doc) {


                            if (doc.data().isGroup && !userGroupsArray.includes(doc.data().id)) {

                                cities.push({ id: doc.data().id, name: doc.data().name, label: doc.data().label, desc: doc.data().desc, members: doc.data().members });
                            }
                        });
                        var cities2 = [...cities]
                        if (this.state.classes && cities && (this.state.classes[0])) {
                            cities2 = cities2.filter(
                                (item) => {
                                    let va = false;
                                    item.label.forEach(function (clas) {
                                        this.state.classes.forEach(function (cla) {
                                            if (cla == clas) {
                                                va = true
                                            }
                                        })

                                    }.bind(this))
                                    if (va) { return va }
                                    return false
                                })
                        }
                        this.setState({ groupIDs: cities, loading: false, displayedList: cities2, displayedList2: cities2 });
                    }.bind(this));


            });

        }
        componentWillMount() {
            return unsubscribe;
        }
        render() {
            const renderItem = ({ item }) => (
                <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                    <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('JoinGroup', { id: item.id, name: item.name, label: item.label, desc: item.desc, members: item.members })}>
                        <Text style={styles.connectOptionsText}>{item.name}</Text>
                    </TouchableOpacity>

                </View>
            );
            const updateSearch = (event) => {

                var filteredList = []

                filteredList = this.state.groupIDs.filter(
                    (item) => {
                        let word = item.name.toLowerCase();
                        let lowerSearch = event.toLowerCase();
                        let upperSearch = event.toUpperCase();
                        let va = false;
                        item.label.forEach(function (clas) {
                            //     console.log(clas)
                            if (clas.startsWith(upperSearch)) {
                                va = true
                            }
                        })
                        if (va) { return va }
                        return (word.startsWith(lowerSearch));

                    }
                )
                if (event == "" || event == " ") {
                    filteredList = this.state.displayedList2
                }



                this.setState({ search: event, displayedList: filteredList })

            }
            return (

                <View style={{ flex: 1 }}>
                    <View style={styles.buttonContainer2}>
                        <SearchBar
                            placeholder="Search"
                            onChangeText={(value) => updateSearch(value)}
                            value={this.state.search.toString()}
                            lightTheme={true}
                            round={true}
                            containerStyle={{ backgroundColor: 'white', borderTopWidth: 0 }}
                            inputContainerStyle={{ backgroundColor: '#EBEBEB', height: screenHeight / 20, width: screenWidth*0.85, marginLeft: '0.1%', }} />
                        <Ionicon name="ios-add" size={50} onPress={() => navigation.navigate('CreateGroup')} style={{ alignSelf: 'center', paddingTop: screenHeight / 20, marginBottom: screenHeight / 20 }} />
                    </View>

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







    //load db once at first render

    return (
        <View style={{
            height: screenHeight,
            width: screenWidth,
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#fff',
        }}>
            <FirebaseInfo></FirebaseInfo>
            <View style={styles.buttonContainer}>
                <Ionicon name="ios-chatbubbles" size={50} onPress={() => navigation.navigate('Groups')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, paddingTop: screenHeight / 5, marginBottom: screenHeight / 20 }} />
                <Ionicon name="ios-home" size={50} onPress={() => navigation.navigate('HomeScreen')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, paddingTop: screenHeight / 5, marginBottom: screenHeight / 20 }} />
                <Ionicon name="ios-person" size={50} onPress={() => navigation.navigate('Profile')} style={{ alignSelf: 'center', paddingRight: screenWidth / 10, paddingLeft: screenWidth / 10, paddingTop: screenHeight / 5, paddingBottom: screenHeight / 20 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 50,
        marginBottom: 0,
        flex: 1,
        flexDirection: 'row',
    },
    buttonContainer2: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 5,
        paddingTop:0,
        marginTop: 0,
        paddingBottom:10,
        flex: 1,
        flexDirection: 'row',
    },

    connectOptions: {
        marginTop: 0,
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
    container: {
        flex: 1,
        backgroundColor: '#f5fcfc',
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
