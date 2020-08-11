import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings, TextInput } from 'react-native';
//import firebase from 'firebase';

import firebase from 'firebase'
function GroupInfo({ navigation, route }) {
    class FirebaseInfo extends React.Component {
        state = { members: [], description: "", classes: [] };
        componentDidMount() {
            var user = firebase.auth().currentUser;
            var db = firebase.firestore();
            var groupInfoRef = db.collection("Groups").doc(route.params.id);
            var userInfoRef = db.collection("Users")
           // console.log("hell"+user.uid)
            var mem = []
            groupInfoRef.onSnapshot((doc) => {
                doc.data().members.forEach(function(abc){
                    userInfoRef.doc(abc).onSnapshot((doc2) => {
                        var a = doc2.data().fullName
                        this.setState({members:[...this.state.members,a]})
           
                })
            }.bind(this))
           
                this.setState({ classes: doc.data().label, description: doc.data().desc });
            });
         //   console.log(mem)               
            mem.forEach(function (doc) {
                console.log("gg")
                console.log(doc)
            })
        }
        render() {
            return (
                <View>
                    <Text style={styles.AnswerText}>Class = {this.state.classes}</Text>
                    <Text style={styles.AnswerText}>Description = {this.state.description}</Text>
                    <Text style={styles.AnswerText}>Members = {this.state.members}</Text>

                </View>
            );
        }
    }



    function leave() {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();

        var userInfoRef = db.collection("Users").doc(user.uid);
        userInfoRef.update({
            "groupsList": firebase.firestore.FieldValue.arrayRemove({ id: route.params.id, name: route.params.name })
        })

        navigation.navigate("Groups")
    }

    var groupID = route.params.id;
    var groupName = route.params.name;
    // get name , classes , optional description , status of the group from database
    var txt2 = ''
    const [text, setText] = React.useState("Leave " + groupName)
    const [text2, setText2] = React.useState(txt2)
    const [text3, setText3] = React.useState(txt2)
    const [request, setRequest] = React.useState(true)
    return (
        <View>
            <Text style={styles.AnswerText}>{groupName}</Text>
            <FirebaseInfo></FirebaseInfo>
            <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { leave() }}>
                <Text style={styles.LoginText}>{text}</Text>
            </TouchableOpacity>


        </View>
    )
}
GroupInfo.navigationOptions = {
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

export default GroupInfo


