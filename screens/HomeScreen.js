
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useState, useEffect, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button,FlatList, ActivityIndicator  } from 'react-native';
import { Dimensions } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import IconSetting from 'react-native-vector-icons/Feather';
import IconLeader from 'react-native-vector-icons/MaterialCommunityIcons';
import { MonoText } from '../components/StyledText';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'
import { SearchBar } from 'react-native-elements'

import GRE1 from './Data/GRE_list_1.json';
import GRE2 from './Data/GRE_list_2.json';
import GRE3 from './Data/GRE_list_3.json';
import GRE4 from './Data/GRE_list_4.json';
import GRE5 from './Data/GRE_list_5.json';
import SAT1 from './Data/SAT_list_1.json';
import SAT2 from './Data/SAT_list_2.json';
import SAT3 from './Data/SAT_list_3.json';
import SAT4 from './Data/SAT_list_4.json';
import SAT5 from './Data/SAT_list_5.json';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function HomeScreen({ navigation, route }) {
  const datab = [];
  function create_database() {
    for (var i = 0; i < Object.values(SAT1.Adjective).length; i++) {
      add(SAT1.Adjective[i], SAT1.Word[i]);
    }
    for (var i = 0; i < Object.values(SAT2.Adjective).length; i++) {
      add(SAT2.Adjective[i], SAT2.Word[i]);
    }

    for (var i = 0; i < Object.values(SAT3.Adjective).length; i++) {
      add(SAT3.Adjective[i], SAT3.Word[i]);
    }
    for (var i = 0; i < Object.values(SAT4.Adjective).length; i++) {
      add(SAT4.Adjective[i], SAT4.Word[i]);
    }
    for (var i = 0; i < Object.values(SAT5.Adjective).length; i++) {
      add(SAT5.Adjective[i], SAT5.Word[i]);
    }
    for (var i = 0; i < Object.values(GRE1.Adjective).length; i++) {
      add(GRE1.Adjective[i], GRE1.Word[i]);
    }
    for (var i = 0; i < Object.values(GRE2.Adjective).length; i++) {
      add(GRE2.Adjective[i], GRE2.Word[i]);
    }
    for (var i = 0; i < Object.values(GRE3.Adjective).length; i++) {
      add(GRE3.Adjective[i], GRE3.Word[i]);
    }
    for (var i = 0; i < Object.values(GRE4.Adjective).length; i++) {
      add(GRE4.Adjective[i], GRE4.Word[i]);
    }
    for (var i = 0; i < Object.values(GRE5.Adjective).length; i++) {
      add(GRE5.Adjective[i], GRE5.Word[i]);
    }
  }
  function add(a, w) {
    datab.push(
      {
        word: w,
        adj: a
      })
  }

  load = () => {
    console.log("Load function started")
    create_database();
    datab.map((val, key) => ({ id: key, ...val })) // keys added
    datab.sort((a, b) => a.word > b.word); //sorted data base alphabetically
    console.log("Yooo, data ready");
  }
  
  const [search, setSearch] = React.useState('');
  const [displayedList, setDisplayedList] = React.useState([]);
  const [memory, setMemory] = React.useState([])
  const [isLoading, setLoading] = React.useState(true);
  
  const updateSearch = (event) => {
    const filteredList = memory.filter(
        (item) => {
            let word = item.word.toLowerCase();
            let lowerSearch = event.toLowerCase();
            return word.indexOf(lowerSearch) > -1;
        }
    )
    setSearch(event);
    setDisplayedList(filteredList);
}

//load db once at first render
React.useEffect(() => {
    load();
    console.log("New Render Cycle");
    setDisplayedList(datab);
    setMemory(datab)
    setLoading(false);
    
}, [])

renderItem = ({item}) => (
  <View style={{minHeight:70, padding:3, borderBottomWidth:1, borderBottomColor:'grey',}}>
      <Text style={{fontSize:20, paddingLeft:3, marginBottom:4,}}>{item.word}</Text>
      <Text style={{paddingLeft:3}}>{item.adj}</Text>
  </View>
  );




  return (
    <View style={styles.container}>
      <View>
      <SearchBar 
            placeholder="Look up a word..." 
            onChangeText={(value) => updateSearch(value)} 
            value={search.toString()} 
            lightTheme={true} 
            round={true} 
            containerStyle={{backgroundColor:'white', borderTopWidth:0}}
            inputContainerStyle={{backgroundColor:'#EBEBEB', height: 40, width: '97%', marginLeft:'1%',}}/>
            <View style={{flex:1}}>
                {
                    isLoading?(
                        <View style={{...StyleSheet.absoluteFill, alignItems:'center', justifyContent:'center'}}>
                            <ActivityIndicator size="large" />
                        </View>
                    ):null
                }
                <FlatList
                    data={displayedList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={()=> (
                        <View style={{flex:1, alignItems:'center', justifyContent:'center', marginVertical:20}}>
                            {
                                isLoading?null:(
                                    <Text style={{fontSize:15}} >No such word found... try something else</Text>
                                )
                            }
                        </View>
                    )}
                />
            </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Groups')}>
          <Text style={styles.connectOptionsText}>Our Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.connectOptionsText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.connectOptionsText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  HomeScreen.navigationOptions = {
    header: null,
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: screenHeight / 5,
    marginTop: screenHeight - 200,
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
    borderWidth:1,
},

heading: {
    fontSize: 48,
    fontWeight: '700',
    paddingLeft: 15,
},

});

export default HomeScreen
