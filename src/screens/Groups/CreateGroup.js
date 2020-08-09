import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, Button, Settings, TextInput, Dimensions, FlatList } from 'react-native';
//import firebase from 'firebase';
import { firebase } from '../../firebase/config'
import { database } from 'firebase';
import Classes from './Data/Classes.json'
import data from './Data/data.json'
import DropDownPicker from 'react-native-dropdown-picker';
import data2 from './Data/data2.json'
import { SearchBar } from 'react-native-elements'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


function CreateGroup({ navigation, route }) {
    class FirebaseInfo extends React.Component {

        state = { groupIDs: data2, loading: false, displayedList: data2, search: "", classes: [], groupname: "" };
        render() {
            //            console.log(this.state.groupIDs)
            const makeGroup = () => {
                //TODO: double name error
                if (this.state.classes.length > 0 && this.state.groupname.length > 0) {
                    var db = firebase.firestore();
                    var hashString = (+new Date).toString(36);
                    var dataBaseRef = db.collection("Groups").doc(hashString);
                    var user = firebase.auth().currentUser;
                    var memberList = [];
                    memberList.push(user.uid);
                    var data = { name: this.state.groupname, owner: user.displayName, members: memberList, label: this.state.classes };
                    dataBaseRef.set(data);

                    var userRef = db.collection("Users").doc(user.uid);
                    userRef.update({
                        //TODO: double name error

                        "groupsList": firebase.firestore.FieldValue.arrayUnion({ "id": hashString, "name": this.state.groupname })


                    })
                    navigation.navigate('HomeScreen')
                }
            }

            const renderItem = ({ item }) => (
                <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                    <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {

                        this.setState({ classes: [...this.state.classes, item] })

                    }}>
                        <Text style={styles.connectOptionsText}>{item}</Text>
                    </TouchableOpacity>
                </View>
            );
            const updateSearch = (event) => {
                const filteredList = this.state.groupIDs.filter(
                    (item) => {

                        //      console.log(item)
                        let word = item.toLowerCase();
                        let lowerSearch = event.toLowerCase();
                        return word.startsWith(lowerSearch);
                    }
                )
                this.setState({ search: event, displayedList: filteredList })
                //        console.log(this.state.displayedList[0])
            }
            return (

                <View>
                    <Text style={styles.AnswerText}>Create New Group</Text>
                    <TextInput
                        paddingTop={10}
                        style={{ height: 40 }}
                        placeholder="Name"
                        onChangeText={text => this.setState({ groupname: text })}
                        defaultValue={this.state.groupname}
                    />
                    <Text style={styles.connectOptions2}>
                        Classes = {this.state.classes}
                    </Text>
                    <View style={styles.liss}>
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
                    </View>
                    <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { makeGroup() }}>
                        <Text style={styles.LoginText}>Enter</Text>
                    </TouchableOpacity>
                </View>);
        }


    }


    /*
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
    */

    const [loading, setloading] = React.useState(false)
    const [memory, setmemory] = React.useState([...data2])
    const [search, setsearch] = React.useState("")
    const [displayedlist, setdisplayedlist] = React.useState([...data2])
    const [classes, setclasses] = React.useState([])
    const [groupname, setgroupname] = React.useState('')
    console.log(displayedlist)
    return (
        <View>
            <FirebaseInfo></FirebaseInfo>



        </View >
    )
}
CreateGroup.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    liss: {
        flex:0,
        marginBottom: 20
    },
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
        marginTop: 5,
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
        width: 200,
        height: 50,
        marginTop: 1,
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


