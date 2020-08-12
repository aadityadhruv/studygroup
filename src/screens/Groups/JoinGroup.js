import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings, TextInput } from 'react-native';
//import firebase from 'firebase';

import firebase from 'firebase'
function JoinGroup({ navigation, route }) {
    function addGroup() {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();

        var userInfoRef = db.collection("Users").doc(user.uid);
        var groupInfoRef = db.collection("Groups").doc(route.params.id);

        userInfoRef.update({
            "groupsList": firebase.firestore.FieldValue.arrayUnion({ id: route.params.id, name: route.params.name })
        })
console.log("1")
console.log(route.params.members)
var memb = [...route.params.members,user.uid]
console.log(memb)
        groupInfoRef.update({
            "members":memb
        })
        console.log("2")

    }
    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    function removeGroup() {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();

        var userInfoRef = db.collection("Users").doc(user.uid);
        var groupInfoRef = db.collection("Groups").doc(route.params.id);

        userInfoRef.update({
            "groupsList": firebase.firestore.FieldValue.arrayRemove({ id: route.params.id, name: route.params.name })
        })
        groupInfoRef.update({
            "members": removeItemOnce(route.params.members, user.uid)
        })
    }

    function login_new() {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();
        setRequest(false);
        var userInfoRef = db.collection("Users").doc(user.uid);
        userInfoRef.get().then(function (doc) {
            if (doc.exists) {
                doc.data().groupsList.forEach(element => {
                    if (element.id == route.params.id) {
                        setRequest(true);
                    }
                });

            }
        })

        !request ? setText("Leave") : setText("Join " + groupName);
        !request ? addGroup() : removeGroup();
    }
    var groupID = route.params.id;
    var groupName = route.params.name;
    // get name , classes , optional description , status of the group from database
    var txt2 = ''
    const [text, setText] = React.useState("Join " + groupName)
    const [text2, setText2] = React.useState(txt2)
    const [text3, setText3] = React.useState(txt2)
    const [request, setRequest] = React.useState(false)
    console.log("Hi");
    return (
        <View>
            <Text style={styles.AnswerText}>{groupName}</Text>
            <Text style={styles.AnswerText}>Class = {route.params.label}</Text>
            <Text style={styles.AnswerText}>Description = {route.params.desc}</Text>


            <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { login_new() }}>
                <Text style={styles.LoginText}>{text}</Text>
            </TouchableOpacity>


        </View>
    )
}
JoinGroup.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    AnswerText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop: 20
    },
    LoginText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop: 20,
        color: 'white'
    }
    ,
    pick: {
        paddingTop: 100,
        paddingBottom: 50,
        width: 400
    },
    result: {
        paddingTop: 100,
        fontWeight: 'bold',
        fontSize: 40,
        backgroundColor: 'white',

    },
    AnswerButtonBlue: {
        width: 250,
        height: 55,
        backgroundColor: '#4455BB',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        borderRadius: 30,
    },
    AnswerButtonBlack: {
        width: 250,
        height: 55,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 30,
    },
    settings: {
        fontSize: 48,
        fontWeight: '700',
        paddingLeft: 15,
    },
    head: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        flexDirection: 'row'
    },
    subHeads: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        fontSize: 28,
        fontWeight: '700',
        paddingLeft: 18,
        marginVertical: 15,
    },
    goalMenu: {
        //flex: 1,
        marginVertical: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default JoinGroup


