import React, { useState, useEffect, Fragment } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'
//import { PushController } from '../../services/LocalPushController'

import firebase from 'firebase'
import Ionicon from 'react-native-vector-icons/Ionicons';

import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default function Chats({ navigation, route }) {


	let unsubscribe;
	let unsubscribe2;

	function personalChatHelper() {
		return new Promise((resolve, reject) => {

			var listOfIDs = []
			var db = firebase.firestore();

			var user = firebase.auth().currentUser;
			var userID = user.uid;
			console.log(userID);
			var userRef = db.collection("Users").doc(userID);

			userRef.onSnapshot(function (doc) {

				doc.data().groupsList.forEach(element => {

					listOfIDs.push(element.pcGroupRefHash);
					resolve(listOfIDs);

				});
			});
			console.log("reacherd");
		});

	}

	function goToPCHelper(otherUserID) {
		return new Promise((resolve, reject) => {
			var groupHash = []
			var db = firebase.firestore();
			var user = firebase.auth().currentUser;
			var userRef = db.collection("Users").doc(user.uid);
			console.log(user.uid);
			userRef.onSnapshot(function (doc) {

				doc.data().groupsList.forEach(element => {

					if (element.id != undefined && element.pcGroupRefHash == otherUserID) {
						groupHash = element.id;

						resolve(groupHash);
					}


				});
			});
		});

	}
	function createPersonalChat(otherUserID) {
		if (otherUserID == firebase.auth().currentUser.uid) {
			return;
		}
		personalChatHelper().then((result) => {
			var isGroupExist = result.includes(otherUserID);
			console.log(isGroupExist);
			if (!isGroupExist) {
				console.log("-------------------------------");
				var db = firebase.firestore();
				var user = firebase.auth().currentUser;
				var userRef = db.collection("Users").doc(user.uid);
				console.log("user id: " + user.uid);
				console.log("user fullName: " + user.displayName);
				var otherUserRef = db.collection("Users").doc(otherUserID);
				console.log("other user id: " + otherUserID);
				//Make the personal chat as a 1 single group
				var hashString = (+new Date).toString(36);
				var dataBaseRef = db.collection("Groups").doc(hashString);
				var memberList = [];
				memberList.push(user.uid);
				memberList.push(otherUserID);
				var data = { name: "Personal Chat", id: hashString, owner: user.displayName, members: memberList, label: [], desc: "", isGroup: false };
				dataBaseRef.set(data);
				console.log(data);
				//get the name of the other User.
				var otherUserName = "";
				otherUserRef.get().then(function (doc) {
					if (doc.exists) {
						otherUserName = doc.data().fullName;
						console.log(otherUserName);
						userRef.update({
							"groupsList": firebase.firestore.FieldValue.arrayUnion({ "id": hashString, "name": otherUserName, pcGroupRefHash: otherUserID, memberList: memberList })
						});
						otherUserRef.update({
							"groupsList": firebase.firestore.FieldValue.arrayUnion({ "id": hashString, "name": user.displayName, pcGroupRefHash: user.uid, memberList: memberList })
						});
					} else {
						// doc.data() will be undefined in this case
						console.log("No such document!");
					}
				}).catch(function (error) {
					console.log("Error getting document:", error);
				});
				//Add the group ref to the current and other user
				console.log("-------------------------------");
				navigation.navigate('Chats', { id: hashString, name: "Personal Chat" });
			} else {
				console.log("Group exists");
				var db = firebase.firestore();
				var user = firebase.auth().currentUser;
				var userRef = db.collection("Users").doc(user.uid);
				goToPCHelper(otherUserID).then((groupHash) => {
					navigation.navigate('Chats', { id: groupHash, name: "Personal Chat" });
				})
			}
		});
	}
	class FirebaseInfo extends React.Component {
		state = { chats: [], loading: false, text2: "", usersName: "", id: "" };
		componentDidMount() {
			var user = firebase.auth().currentUser;
			var db = firebase.firestore();
			const id = route.params.id;
			var msgRef = db.collection("Groups").doc(id).collection("messages");
			unsubscribe = msgRef
				.onSnapshot(function (querySnapshot) {
					var cities = [];
					querySnapshot.forEach(function (doc) {
						if (doc.exists) {
							cities.unshift({ text: doc.data().text, from: doc.data().from, id: doc.data().id });
						}
					});
					this.setState({ chats: cities, loading: false });
				}.bind(this));
		}
		componentWillMount() {
			return unsubscribe;
		}
		render() {
			const entered = () => {
				var user = firebase.auth().currentUser;
				var db = firebase.firestore();
				var msgRef = db.collection("Groups").doc(route.params.id).collection("messages");
				var hashString = (+new Date).toString(36);
				if (!this.state.text2 == "") {
					console.log(user)
					msgRef.doc(hashString).set(
						{
							from: user.displayName,
							text: this.state.text2,
							id: user.uid
						});
				}
				this.setState({ text2: "" })
			}
			var user = firebase.auth().currentUser;
			const renderItem = ({ item }) => (
				<View style={{ flexDirection: 'column' }}>
					{
						(item.from == user.displayName) ?
							<View style={{ flexDirection: 'row-reverse' }}>
								<TouchableOpacity style={styles.connectOptions9} activeOpacity={0.8} onPress={() => createPersonalChat(item.id)}>
									<Text style={styles.connectOptions7}>{item.text}</Text>
								</TouchableOpacity>
							</View> :
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity style={styles.connectOptions8} activeOpacity={0.8} onPress={() => createPersonalChat(item.id)}>
									<Text style={styles.connectOptions10}>{item.text}</Text>
								</TouchableOpacity>
							</View>
					}
				</View>
			);
			return (
				<View style={{  height: screenHeight * 0.89, width: screenWidth*0.97,paddingTop:50, }}>
					{
						this.state.loading ? (
							<View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
								<ActivityIndicator size="large" />
							</View>
						) : null
					}

					<FlatList
						data={this.state.chats}
						renderItem={renderItem}
						inverted={true}

						keyExtractor={(item, index) => index.toString()}
						ListEmptyComponent={() => (
							<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
								{
									this.state.loading ? null : (
										<Text style={{ fontSize: 15 }} ></Text>
									)
								}
							</View>
						)}
					/>
					<View style={styles.second}>
						<TextInput
							style={styles.connectOptions2}
							placeholder="Type here!"
							onChangeText={text2 => this.setState({ text2: text2 })}
							defaultValue={this.state.text2}
						/>
						<Ionicon name="ios-send" size={50} onPress={() => entered()} style={{ alignSelf: 'center', paddingRight: 0, paddingLeft: 0, paddingTop: 0, marginBottom: 10, marginRight: 10 }} />
					</View>


				</View>);
		}

	}
	console.log(route.params.id)
	function leave() {
		var user = firebase.auth().currentUser;
		var db = firebase.firestore();

		var userInfoRef = db.collection("Users").doc(user.uid);
		userInfoRef.update({
			"groupsList": firebase.firestore.FieldValue.arrayRemove({ id: route.params.id, name: route.params.name })
		})

		navigation.navigate("Groups")
	}
	function groupinfo() {
		var db = firebase.firestore();
		var groupRef = db.collection("Groups").doc(route.params.id)
		groupRef.onSnapshot((doc) => {
			if (doc.data().isGroup) {
				navigation.navigate('GroupInfo', { id: route.params.id, name: route.params.name })
			}
		})
	}
	return (
		<View style={styles.buttonContainer2}>
			<View style={styles.buttonContainer3}>
				<Ionicon name="ios-arrow-back" size={50} onPress={() => navigation.navigate('Groups')} style={{ alignSelf: 'center', paddingRight: 20, paddingLeft: 0, paddingTop: 0, marginBottom: screenHeight / 200 }} />
				<TouchableOpacity style={styles.connectOptions11} activeOpacity={0.8} onPress={() => groupinfo()}>
					<Text style={styles.connectOptionsText}>{route.params.name}</Text>
				</TouchableOpacity>
			</View>
			<FirebaseInfo></FirebaseInfo>
		</View>
	)
}

const styles = StyleSheet.create({
	second2: {

		flexDirection: 'row'
	},

	second: {
		marginTop:50,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row'
	},
	buttonContainer: {
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		height: 20,
		marginTop: 20,
		flex: 1,
		flexDirection: 'row',

	},
	buttonContainer2: {
		flex: 1,
		
	},
	buttonContainer3: {
		paddingTop:screenHeight/15,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		height: 5,
		flexDirection: 'row',
	},

	connectOptions: {
		marginTop: 10,
		alignContent: "center",
		padding: 15,
		paddingBottom: 15,
		marginLeft: 0,
		marginRight: 0,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000000'
	},
	connectOptions11: {
		height: screenHeight *0.05,
		width:screenWidth*0.8,
		alignContent: "center",
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000000'
	},

	connectOptionsBack: {
		marginTop: 10,
		alignContent: "center",
		padding: 15,
		paddingBottom: 15,
		marginLeft: 0,
		marginRight: 200,
		backgroundColor: '#0099FF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff'
	},
	connectOptions5: {
		marginTop: 10,
		alignContent: "stretch",
		padding: 15,
		paddingBottom: 15,
		marginLeft: screenWidth / 1.6,
		marginRight: 0,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000000',
		flexDirection: 'row',

	},
	connectOptions6: {
		marginTop: 10,
		alignContent: "stretch",
		padding: 15,
		paddingBottom: 15,
		marginLeft: 0,
		marginRight: 0,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000000',
		flexDirection: 'row',

	},
	connectOptions7: {
		flexDirection: 'row',
		flexWrap: 'wrap',

	},
	connectOptions10: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	connectOptions8: {
		marginLeft: 15,
		marginTop: 10,
		padding: 15,
		paddingBottom: 15,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000000',
	},
	connectOptions9: {
		marginTop: 10,
		padding: 15,
		paddingBottom: 15,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000000',
	},
	connectOptionsText: {
		flex: 1,
		flexWrap: 'wrap',
		fontSize: 24,
		color: 'black',
	},
	connectOptions2: {
		width: 350,
		height:50,
		alignContent: "center",
		padding: 15,
		backgroundColor: '#dde0dc',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',

	},
	connectOptions3: {
		width: 50,
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

	connectOptionsText2: {
		fontSize: 24,
		color: 'black',
		textAlign: 'auto'
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
