import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'



import firebase from 'firebase'



export default function Groups({ navigation, route }) {


    let unsubscribe;


    class FirebaseInfo extends React.Component {
        state = { groupIDs: [], loading: true, displayedList: [],search:"" };

        componentDidMount() {
            var user = firebase.auth().currentUser;
            var db = firebase.firestore();

            var userInfoRef = db.collection("Users").doc(user.uid);
            unsubscribe = userInfoRef.onSnapshot((doc) => {
                console.log(doc.data().groupsList)

                this.setState({ groupIDs: doc.data().groupsList, loading : false, displayedList: doc.data().groupsList});
      //          console.log(this.state.groupIDs);

            });

         //   console.log(this.state.groupIDs);
        }
        componentWillMount() {
            return unsubscribe;
          }
        render() {
            const renderItem = ({ item }) => (
                <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                    <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Chats', { id :item.id,name:item.name})}>
                        <Text style={styles.connectOptionsText}>{item.name}</Text>
                    </TouchableOpacity>
            
                </View>
            );
            const updateSearch = (event) => {
                const filteredList = this.state.groupIDs.filter(
                    (item) => {
                        
                        console.log(item)
                      let word = item.name.toLowerCase();
                        let lowerSearch = event.toLowerCase();
                        return word.indexOf(lowerSearch) > -1;
                    }
                )
                this.setState({search:event,displayedList:filteredList})
            }
        
        return (
        
        <View style={{ flex: 1 }}>
            <SearchBar 
            placeholder="Search" 
            onChangeText={(value) => updateSearch(value)} 
            value={this.state.search.toString()} 
            lightTheme={true} 
            round={true} 
            containerStyle={{backgroundColor:'white', borderTopWidth:0}}
            inputContainerStyle={{backgroundColor:'#EBEBEB', height: 40, width: '597%', marginLeft:'1%',}}/>
            
            
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
                                <Text style={{ fontSize: 15 }} >No Groups found. Join A Group</Text>
                            )
                        }
                    </View>
                )}
            />
        </View>);
        }

    }   

return (
    <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    }}>
    <FirebaseInfo>
    </FirebaseInfo>
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
        height: 50,
        marginTop: 20,
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
