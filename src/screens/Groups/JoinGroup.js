import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings,TextInput } from 'react-native';
//import firebase from 'firebase';

function JoinGroup({ navigation, route }) {
    function login_new() {
        //groupID.status = "Requested"
        setText(" ")
   //     navigation.navigate('HomeScreen')
    }
    var groupID = route.params.id;
    var groupName = route.params.name;
    console.log("ID: " + groupID);
    // get name , classes , optional description , status of the group from database
    var txt2=''
    const [text, setText] = React.useState(txt2)
    const [text2, setText2] = React.useState(txt2)
    const [text3, setText3] = React.useState(txt2)
    console.log(groupID)
    return (
        <View>
            <Text style = {styles.AnswerText}>{groupName}</Text>
            <Text style = {styles.AnswerText}>Class = {route.params.label}</Text>
            <Text style = {styles.AnswerText}>Description = {route.params.desc}</Text>

            <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { login_new() }}>
        <Text style={styles.LoginText}>{"Join " + groupName}</Text>
      </TouchableOpacity>     
      <Text style={styles.LoginText}>{text}</Text>
       
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

export default JoinGroup


