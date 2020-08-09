import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'


import firebase from 'firebase'



export default function HomeScreen({ navigation, route }) {


    class FirebaseInfo extends React.Component {
        
        state = { groupIDs: [], loading: true, displayedList: []};

        
        
        componentDidMount() {
            var user = firebase.auth().currentUser;
            var db = firebase.firestore();
            var groupsRef = db.collection("Groups");
            groupsRef
    .onSnapshot(function namae(querySnapshot) {
        
        var cities = [];
        querySnapshot.forEach(function(doc) {
            cities.push(doc.data().name);
        });
        console.log("Current cities in CA: ", cities.join(", "));
        console.log(this);
        this.setState({ groupIDs: cities, loading : false, displayedList: cities});
    }.bind(this));

       
         
        
            
        }
        render() {
            const renderItem = ({ item }) => (
                <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                    <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Chats', { 'word': item.groupName })}>
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
                </View>);
        }


    }







    //load db once at first render


    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#fff',
        }}>

            <FirebaseInfo></FirebaseInfo>

            <View style={styles.head}>


                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CreateGroup')}>
                    <Text>Add </Text>

                </TouchableOpacity>

            </View>
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
