import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings, TextInput, Dimensions } from 'react-native';
//import firebase from 'firebase';
import { firebase } from '../../firebase/config'
import { database } from 'firebase';
import Classes from './Data/Classes.json'
import data from './Data/data.json'
import DropDownPicker from 'react-native-dropdown-picker';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


function CreateGroup({ navigation, route }) {
    function makeGroup() {
        //TODO: double name error
if (classes.length>0 && groupName.length >0){
        var db = firebase.firestore();
        var hashString = (+new Date).toString(36);
        var dataBaseRef = db.collection("Groups").doc(hashString);
        var user = firebase.auth().currentUser;
        var memberList = [];
        memberList.push(user.uid);
        var data = {name : groupName, owner : user.displayName, members : memberList, label : hashTag};
        dataBaseRef.set(data);
        
        var userRef = db.collection("Users").doc(user.uid);
        userRef.update({
            //TODO: double name error

            "groupsList" : firebase.firestore.FieldValue.arrayUnion({"id" : hashString, "name" : groupName})


        })



        navigation.navigate('HomeScreen')
    }
    }
    function entered() {
        if (!itm4 == "") {
            setclasses([...classes, itm4])
            setliss3([...liss3, { label: itm4, value: itm2 }])
        }
    }
    function arrayRemove(arr, value) {
        return arr.filter(
            function (ele) { return ele != value; }
        );
    }
    function entered2() {
        if (!itm5 == "") {
            setliss3([...arrayRemove(liss3, itm6)])
            setclasses([...arrayRemove(classes, itm6)])
        }
    }
    const txt2 = ""
    const [text2, setText2] = React.useState(txt2)
    const [itm, setitm] = React.useState("")
    const [itm2, setitm2] = React.useState("")
    const [itm3, setitm3] = React.useState("")
    const [itm4, setitm4] = React.useState("")
    const [itm5, setitm5] = React.useState("")
    const [itm6, setitm6] = React.useState("")

    const [liss3, setliss3] = React.useState([])
    const [classes, setclasses] = React.useState([])
    var liss = []
    for (var i = 0; i < 190; i++) {
        liss.push({ label: Classes['SUBJECT CODE'][i], value: Classes['SUBJECT'][i] })
    }

    var liss2 = []

    if (!(itm5 == "")) {
        for (var i = 0; i < classes.length; i++) {
            liss3.push(classes[i])
        }
    }

    if (!(itm == "")) {
        var aa = Object.values(data[itm3 + '.json']['COURSE NUMBER'])
        var ab = Object.values(data[itm3 + '.json']['COURSE TITLE'])
        //  console.log(aa)
        //  console.log(ab)
        for (var i = 0; i < aa.length; i++) {
            liss2.push({ label: aa[i], value: ab[i] })
        }


    }


    var txt3 = ''
    const [groupName, setgroupname] = React.useState(txt3)
    const [hashTag, sethashtag] = React.useState(txt3)
    const [text3, setText3] = React.useState(txt3)
    return (
        <View>
            <Text style={styles.AnswerText}>Create New Group</Text>
            <TextInput
                paddingTop={10}
                style={{ height: 40 }}
                placeholder="Name"
                onChangeText={text => setgroupname(text)}
                defaultValue={groupName}
            />
            <Text style={styles.connectOptions2}>
                Classes = {classes}
            </Text>

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
                onChangeItem={item => {
                    setitm2(item.value)
                    setitm4(item.label)

                }}
            />

            <TouchableOpacity style={styles.connectOptions4} activeOpacity={0.8} onPress={() => entered()}>
                <Text style={styles.connectOptionsText}>Enter</Text>
            </TouchableOpacity>
            <Text style={styles.connectOptions2}>
                Remove classes
          </Text>

            <DropDownPicker
                items={liss3}
                defaultValue={itm5}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => {
                    setitm5(item.value)
                    setitm6(item.label)

                }}
            />
            <TouchableOpacity style={styles.connectOptions4} activeOpacity={0.8} onPress={() => entered2()}>
                <Text style={styles.connectOptionsText}>Enter</Text>
            </TouchableOpacity>

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
        marginTop: 20,
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

});

export default CreateGroup


