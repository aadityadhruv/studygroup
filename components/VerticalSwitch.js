import React, { Component } from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';

const width = Dimensions.get('window').width;

export default class VerticalMenu extends Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        return(
            <View style={styles.container}>
                <GoalBtn number={"Easy"} handler={this.props.diff1}/>
                <GoalBtn number={"Medium"} handler={this.props.diff2}/> 
                <GoalBtn number={"Hard"} handler={this.props.diff3}/>
            </View>
        )
    }
}

const GoalBtn = props => {
    return(
        <View>
            <TouchableOpacity style={styles.GoalSliderBtn} onPress={props.handler}>
                <Text style={styles.btnText}>
                    {props.number}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    container: {
        width: '50%',
        height: 200,
        backgroundColor: '#EBEBEB',
        alignItems: 'center',
        justify: 'center',
        borderRadius: 27.5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    btnText: {
        flex:1,
        color: 'grey',
        fontWeight: "bold",
        textAlign: 'center',
        padding: 15,
    },
    GoalSliderBtn: {
        width: '50%',
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
}}