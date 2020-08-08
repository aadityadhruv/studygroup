import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList, ActivityIndicator,TouchableOpacity,Component } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'




export default function HomeScreen({navigation, route}) {
    const datab = [];
    function create_database() {
        add("Bella","Zwaldos Group","Join")
        add("Bella","Zwaldos Group2","Join")
    }
    
    function add(a, w,jo) {
    datab.push(
        {
            word:w,
            adj:a,
            status:jo
        })
    }
        
    const load = () => {
        console.log("Load function started")
        create_database();
        datab.map((val, key) => ({id: key, ...val})) // keys added
        datab.sort((a,b) => a.word>b.word); //sorted data base alphabetically
      //  console.log(datab);
    }

    const [search, setSearch] = useState('');
    const [displayedList, setDisplayedList] = useState([]);
    const [memory, setMemory] = useState([])
    const [isLoading, setLoading] = useState(true);
    

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
        console.log("New Render Cycle");
        setDisplayedList(datab);
        setMemory(datab)
        setLoading(false);
        
    }, [])
    
    const renderItem = ({item}) => (
        <View style={{minHeight:70, padding:3, borderBottomWidth:1, borderBottomColor:'grey'}}>
            <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => {navigation.navigate("JoinGroup",{group:item})}}>
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

            <View style = {styles.head}>
       
            <SearchBar 
            placeholder="Search" 
            onChangeText={(value) => updateSearch(value)} 
            value={search.toString()} 
            lightTheme={true} 
            round={true} 
            containerStyle={{backgroundColor:'white', borderTopWidth:0}}
            inputContainerStyle={{backgroundColor:'#EBEBEB', height: 40, width: '597%', marginLeft:'1%',}}/>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CreateGroup')}>
                <Text>Add </Text>

        </TouchableOpacity>
        
</View>            
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
                                    <Text style={{fontSize:15}} >No such Group found... try something else</Text>
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
        <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('HomeScreen')}>
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
        height:  10,
        marginBottom:0,
        flex: 1,
        flexDirection: 'row',
      },
      connectOptions: {
        marginTop: 0,
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
})
