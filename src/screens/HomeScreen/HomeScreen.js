import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'

import firebase from 'firebase'



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
                            
                            
                            if (!userGroupsArray.includes(doc.data().id) && doc.data().isGroup) {
                                
                                cities.push({ id: doc.data().id, name: doc.data().name, label: doc.data().label, desc: doc.data().desc });
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
                    <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('JoinGroup', { id: item.id, name: item.name, label: item.label, desc: item.desc })}>
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
    function logout() {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
        navigation.navigate('LoginScreen')
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#fff',
        }}>


            <View style={styles.head}>

                <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => logout()}>

                    <Text style={styles.connectOptionsText}>Log Out</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('CreateGroup')}>
                    <Text style={styles.connectOptionsText}>Add</Text>
                </TouchableOpacity>

            </View>
            <FirebaseInfo></FirebaseInfo>

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

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 10,
        marginBottom: 0,
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
