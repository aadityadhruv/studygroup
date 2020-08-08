import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { Dimensions } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import Classes from './Data/Classes.json'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import firebase from 'firebase'


function Profile({ navigation, route }) {
    const txt2 = ""
    const [text2, setText2] = React.useState(txt2)
    const [itm, setitm] = React.useState("")
    const [itm2, setitm2] = React.useState("")
    const [itm3, setitm3] = React.useState("")
    async function loadd(val) {
        var valu = './Data/' + val + '.json'
        console.log(valu)
        var file = await import('./Data/AAS.json');
        for (var i = 0; i < 10; i++) {
            liss2.push({ label: file['COURSE NUMBER'][i], value: file['COURSE TITLE'][i] })
        }
    }
    const classes = ["PHYS 212", "CS 125"]
    var liss = []
    for (var i = 0; i < 190; i++) {
        liss.push({ label: Classes['SUBJECT CODE'][i], value: Classes['SUBJECT'][i] })
    }
    var liss2 = []
    if (!(itm == "")) {

        loadd(itm3)

    }
    const [name, setName] = React.useState("")
    var user = firebase.auth().currentUser;
   


    var db = firebase.firestore();
    var userInfoRef = db.collection("Users").doc(user.uid);
    userInfoRef.get().then(function (doc) {
        if (doc.exists) {
            var person = doc.data();
            setName(person.fullName);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })



    return (
        <View>
            <Text style={styles.connectOptions2}>
                Add classes
          </Text>
            <DropDownPicker
                items={liss}
                defaultValue={itm}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => {
                    setitm(
                        item.value
                    )
                    setitm3(item.label)
                }
                }
            />
            <DropDownPicker
                items={liss2}
                defaultValue={itm2}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => setitm2(
                    item.value
                )}
            />

            <TouchableOpacity style={styles.connectOptions4} activeOpacity={0.8} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.connectOptionsText}>Enter</Text>
            </TouchableOpacity>

            <Text style={styles.connectOptions2}>
                Your user info:

          Name : {name}
            </Text>
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
Profile.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    inputBox: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: screenWidth - 40,
        borderWidth: 1,
    },
    buttonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 30,
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
    },
    connectOptions: {
        width: 150,
        marginTop: 200,
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
    connectOptions2: {
        marginTop: 50,
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
        backgroundColor: '#f5fcfc',
    },
});

export default Profile

