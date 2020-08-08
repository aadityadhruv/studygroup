import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator,TouchableOpacity,Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'






export default function Groups({navigation, route}) {
    const groupss = [];
    function create_database() {
        add_group("CS","Shaayari and Anime")
      }
    
    function add_group(a, w) {
    groupss.push(
        {
            word:w,
            adj:a
        })
    }
        
    load = () => {
        console.log("Load function started")
        create_database();
        groupss.map((val, key) => ({id: key, ...val})) // keys added
        groupss.sort((a,b) => a.word>b.word); //sorted data base alphabetically
        console.log(groupss);
    }

    const people = [];
    function create_database2() {
        add_group2("CS","Shyari and Anime")
      }
    
    function add_group2(a, w) {
    people.push(
        {
            word:w,
            adj:a
        })
    }
        
    load2 = () => {
        console.log("Load function started")
        create_database2();
        people.map((val, key) => ({id: key, ...val})) // keys added
        people.sort((a,b) => a.word>b.word); //sorted data base alphabetically
        console.log(people);
    }


    const [search, setSearch] = useState('');
    const [displayedList, setDisplayedList] = useState([]);
    const [memory, setMemory] = useState([])
    const [isLoading, setLoading] = useState(true);

    const [displayedList2, setDisplayedList2] = useState([]);
    const [memory2, setMemory2] = useState([])
    const [isLoading2, setLoading2] = useState(true);
    
    const updateSearch2 = (event) => {
      const filteredList = memory2.filter(
          (item) => {
              let word = item.word.toLowerCase();
              let lowerSearch = event.toLowerCase();
              return word.indexOf(lowerSearch) > -1;
          }
      )
      setSearch(event);
      setDisplayedList2(filteredList);
  }



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
    useEffect(() => {
        load();
        load2();
        console.log("New Render Cycle");
        setDisplayedList(groupss);
        setMemory(groupss)
        setLoading(false);

        setDisplayedList2(people);
        setMemory2(people)
        setLoading2(false);

        
    }, [])

    renderItem = ({item}) => (
    <View style={{minHeight:70, padding:3, borderBottomWidth:1, borderBottomColor:'grey'}}>
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Chats',{'word':item.word})}>
          <Text style={styles.connectOptionsText}>{item.word}</Text>
        </TouchableOpacity>
    
    </View>
    );

    renderItem2 = ({item}) => (
      <View style={{minHeight:70, padding:3, borderBottomWidth:1, borderBottomColor:'grey'}}>
          <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Chats',{'word':item.word})}>
            <Text style={styles.connectOptionsText}>{item.word}</Text>
          </TouchableOpacity>
      
      </View>
      );

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#fff',
          }}>

            <View style={styles.head}>
            </View>
            <SearchBar 
            placeholder="Search" 
            onChangeText={(value) => updateSearch(value)} 
            value={search.toString()} 
            lightTheme={true} 
            round={true} 
            containerStyle={{backgroundColor:'white', borderTopWidth:0}}
            inputContainerStyle={{backgroundColor:'#EBEBEB', height: 40, width: '97%', marginLeft:'1%',}}/>
            <Text >Groups</Text>

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
                <Text >People</Text>

<View style={{flex:1}}>
    {
        isLoading2?(
            <View style={{...StyleSheet.absoluteFill, alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator size="large" />
            </View>
        ):null
    }
    <FlatList
        data={displayedList2}
        renderItem={renderItem2}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={()=> (
            <View style={{flex:1, alignItems:'center', justifyContent:'center', marginVertical:20}}>
                {
                    isLoading2?null:(
                        <Text style={{fontSize:15}} >No such word found... try something else</Text>
                    )
                }
            </View>
        )}
    />

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
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height:  50,
        marginTop:  20,
        flex: 1,
        flexDirection: 'row',
      
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
      container2: {
        alignItems: 'center',
        justifyContent: 'center',      },
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
})
