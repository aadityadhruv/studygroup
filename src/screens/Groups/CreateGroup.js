import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings,TextInput } from 'react-native';
//import firebase from 'firebase';
import { firebase } from '../../firebase/config'
import { database } from 'firebase';
function CreateGroup({ navigation, route }) {
    function makeGroup() {
        //TODO: double name error

        var db = firebase.firestore();
        
        var dataBaseRef = db.collection("Groups").doc(groupName);
        var user = firebase.auth().currentUser;
        var memberList = [];
        memberList.push(user.uid);
        var data = {owner : user.displayName, members : memberList, label : hashTag}

        dataBaseRef.set(data);
        var userRef = db.collection("Users").doc(user.uid);
        userRef.update({
            //TODO: double name error
            "groupIDs" : firebase.firestore.FieldValue.arrayUnion(groupName)
        })



        navigation.navigate('HomeScreen')
    }
    var txt2=''
    const [groupName, setText] = React.useState(txt2)
    const [hashTag, setText2] = React.useState(txt2)
    const [text3, setText3] = React.useState(txt2)
    return (
        <View>
            <Text style = {styles.AnswerText}>Create New Group</Text>
            <TextInput
            paddingTop={10}
            style={{ height: 40 }}
            placeholder="Name"
            onChangeText={text => setText(text)}
            defaultValue={groupName}
          />
        
         <TextInput
            paddingTop={10}
            style={{ height: 40 }}
            placeholder="HashTag"
            onChangeText={text2 => setText2(text2)}
            defaultValue={hashTag}
          />
            <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { makeGroup() }}>
        <Text style={styles.LoginText}>Enter</Text>
      </TouchableOpacity>      
        </View>
    )
}
CreateGroup.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    AnswerText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop:20
    },
    LoginText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop:20,
        color:'white'
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

export default CreateGroup


