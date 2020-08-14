import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, Button, Settings, TextInput, Dimensions, FlatList } from 'react-native';
//import firebase from 'firebase';
import { firebase } from '../../firebase/config'
import { database } from 'firebase';
import Classes2 from './Data/Classes.json'
import data from './Data/data.json'
import DropDownPicker from 'react-native-dropdown-picker';
import data2 from './Data/data2.json'
import { SearchBar } from 'react-native-elements'


import Ionicon from 'react-native-vector-icons/Ionicons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var val = 0
function CreateGroup({ navigation, route }) {
    let unsubscribe
    class FirebaseInfo extends React.Component {
        state = { groupIDs: data2, loading: false, displayedList: data2, search: "", classes: [], groupname: "", description: "", choosingClass: true };

        componentDidMount() {
            val = parseInt(this.state.classes.length / 4) + 1
            this.setState({ displayedList: Object.values(Classes2['SUBJECT CODE']) })
        }
        componentWillMount() {
            return unsubscribe;
        }
        render() {
            const makeGroup = () => {
                //TODO: double name error
                if (this.state.classes.length > 0 && this.state.groupname.length > 0) {
                    var db = firebase.firestore();
                    var hashString = (+new Date).toString(36);
                    var dataBaseRef = db.collection("Groups").doc(hashString);
                    var user = firebase.auth().currentUser;
                    var memberList = [user.uid];
                    var data = { name: this.state.groupname, id: hashString, owner: user.displayName, members: memberList, label: this.state.classes, desc: this.state.description, isGroup: true, pcGroupRefHash: "" };
                    dataBaseRef.set(data);
                    var userRef = db.collection("Users").doc(user.uid);
                    userRef.update({
                        //TODO: double name error

                        "groupsList": firebase.firestore.FieldValue.arrayUnion({ "id": hashString, "name": this.state.groupname, isGroup: true })


                    })


                    navigation.navigate('HomeScreen')
                }
            }

            //            console.log(this.state.groupIDs)
            const removeItemOnce = (arr, value) => {
                var index = arr.indexOf(value);
                if (index > -1) {
                    arr.splice(index, 1);
                }
                return arr;
            }

            const renderItem = ({ item }) => (
                <View style={{ minHeight: 70, padding: 3 }}>
                    <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {
                        console.log("Classes are " + this.state.classes)
                        console.log("Item is " + item)
                        if (this.state.classes.length < 8) {
                            if (Object.values(Classes2['SUBJECT CODE']).includes(item)) {
                                console.log("hi")
                                this.setState({ "choosingClass": false })
                                //console.log(Object.values(data[item + '.json']["COURSE NUMBER"]))
                                if (item) {
                                    this.setState({ "displayedList": Object.values(data[item + '.json']["COURSE NUMBER"]) })
                                }
                            }
                            else if (!this.state.classes.includes(item)) {
                                //   console.log("hi")
                                this.setState({ "choosingClass": true })
                                this.setState({ classes: [...this.state.classes, item] })
                                var db = firebase.firestore();
                                var user = firebase.auth().currentUser;
                                var userRef = db.collection("Users").doc(user.uid);
                                userRef.update({
                                    "classes": [...this.state.classes, item]
                                })
                                this.setState({ "displayedList": Object.values(Classes2['SUBJECT CODE']) })
                            }
                            else {
                                var k = 0
                            }
                        }
                    }
                    }>

                        <Text style={styles.connectOptionsText}>{item}</Text>
                    </TouchableOpacity>
                </View>
            );
            const renderItem2 = ({ item }) => (
                <View style={{ minHeight: 70, padding: 3 }}>
                    <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {
                        this.setState({ classes: removeItemOnce(this.state.classes, item) })
                        var db = firebase.firestore();
                        var user = firebase.auth().currentUser;
                        var userRef = db.collection("Users").doc(user.uid);
                        userRef.update({
                            //TODO: double name error
                            "classes": removeItemOnce(this.state.classes, item)
                        })
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
                //   console.log(this.state.displayedList)
            }
            return (

                <View style={styles.hello}>
                    <Text style={styles.AnswerText}>Create New Group</Text>
                    <TextInput
                        paddingTop={10}
                        style={{ height: 40 }}
                        placeholder="Name"
                        onChangeText={text => this.setState({ groupname: text })}
                        defaultValue={this.state.groupname}
                    />
                    <Text style={styles.AnswerText}>Group Description(Optional)</Text>
                    <TextInput
                        paddingTop={10}
                        style={{ height: 40 }}
                        placeholder="Description"
                        onChangeText={text => this.setState({ description: text })}
                        defaultValue={this.state.description}
                    />
                    <View>
                        <View style={styles.hi4}>
                            <FlatList
                                data={this.state.classes}
                                numColumns={4}
                                renderItem={renderItem2}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View styles={styles.second}>
                            <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { makeGroup() }}>
                                <Text style={styles.LoginText}>Enter</Text>
                            </TouchableOpacity>
                        </View>
                        <SearchBar
                            placeholder="Search"
                            onChangeText={(value) => updateSearch(value)}
                            value={this.state.search.toString()}
                            lightTheme={true}
                            round={true}
                            containerStyle={{ backgroundColor: '#F0F8FF', borderTopWidth: 0, borderBottomWidth: 0, }}
                            inputContainerStyle={{ backgroundColor: '#EBEBEB', height: 40, width: '597%', marginLeft: '1%', }} />
                        {
                            this.state.loading ? (
                                <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator size="large" />
                                </View>
                            ) : null
                        }

                        {this.state.choosingClass ? <Text></Text>
                            : <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {
                                this.setState({ displayedList: Object.values(Classes2['SUBJECT CODE']), "choosingClass": true })
                            }}>
                                <Text style={styles.connectOptionsText}>Back</Text>
                            </TouchableOpacity>

                        }
                        <View style={{
                            height: screenHeight * 0.45
                        }}>
                            <FlatList
                                data={this.state.displayedList}
                                numColumns={4}
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
                        </View>
                    </View>
                </View>);
        }
    }

    const [loading, setloading] = React.useState(false)
    const [memory, setmemory] = React.useState([...data2])
    const [search, setsearch] = React.useState("")
    const [displayedlist, setdisplayedlist] = React.useState([...data2])
    const [classes, setclasses] = React.useState([])
    const [groupname, setgroupname] = React.useState('')
    // console.log(displayedlist)
    return (
        <View style={{ backgroundColor: '#F0F8FF' }}>
            <Ionicon name="ios-arrow-back" size={50} onPress={() => navigation.goBack()} style={{ paddingTop: screenHeight * 0.05 }} />

            <FirebaseInfo></FirebaseInfo>
        </View >
    )
}
CreateGroup.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    hello: {
        flex: 0,
        paddingTop: screenHeight * 0,
        height: screenHeight * (0.5 - 0.1 * (val)),
        backgroundColor: '#F0F8FF'
    },
    liss: {
        flex: 1,
        flexDirection: 'row'
    },
    hi: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        flexDirection: 'row',
        height: screenHeight * 0.5

    },
    hi4: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        flexDirection: 'row',
    },

    second: {
        paddingTop: 0,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    liss: {
        height: screenHeight / 2.5,
        flex: 0,
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
        backgroundColor: '#F0F8FF',
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
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.23,
        height: 60,
        marginTop: 1,
        alignContent: "center",
        padding: 15,
        backgroundColor: '#0099FF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    connectOptionsText: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
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


