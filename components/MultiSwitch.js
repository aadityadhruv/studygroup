import React, {Component, useState} from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Animated, PanResponder} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class MultiSwitch extends Component {
    constructor(props) {
        super(props);
        const selected = 0;
        if (props.selected === "fifty") {
            this.selected = 1;
        } else if (props.selected === "hundred") {
            this.selected = 2;
        } else {
            this.selected = 3;
        }
            
    }
    // Slider() {
    //     const panResponder = React.useRef(PanResponder.create({
    //         onStartShouldSetPanResponder: (evt, gestureState) => true,
    //         onStartShouldSetPanResponderCapture: (evt, gestureState) =>
    //             true,
    //         onMoveShouldSetPanResponder: (evt, gestureState) => true,
    //         onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
    //             true,
            
    //         onPanResponderMove: (evt, gestureState) => {
    //             let finalValue = gestureState.dx + this.state.posValue;
    //             if ( finalValue >= 0 && finalValue <= this.state.thresholdDistance)
    //                 this.state.position.setValue(this.state.posValue+gestureState.dx);
    //         },
            
    //         onPanResponderRelease: (evt, gestureState) => {
    //             let finalValue=gestureState.dx + this.state.posValue;
    //             if (gestureState.dx > 0) {
    //                 if(finalValue >= 0 && finalValue <= 30) {
    //                     this.goal1selected();
    //                 } else if (finalValue >= 30 && finalValue <= 121) {
    //                     this.goal2selected();
    //                 } else if (finalValue >= 121 && finalValue <= 280) {
    //                     if (gestureState.dx > 0) {
    //                         this.goal3selected();
    //                     } else {
    //                         this.goal2selected();
    //                     }
    //                 } else {
    //                     if (finalValue >= 78 && finalValue <= 175) {
    //                         this.goal2selected();
    //                     } else if (finalValue >= -100 && finalValue <= 78) {
    //                         this.goal1selected();
    //                     } else {
    //                         this.goal3selected();
    //                     }
    //                 }
    //             }
    //         },

    // })).current;
    
    // return <View {...panResponder.panHandlers} />;
    // }



    render() {
        return(
            <View style={styles.container}>
                <GoalBtn number={50} handler={this.props.g1}/>
                <GoalBtn number={100} handler={this.props.g2}/> 
                <GoalBtn number={200} handler={this.props.g3}/>
                {/* <Animated.View 
                    {...this._panResponder.panHandelers}
                    style={[
                        styles.switcher,
                        {
                            transform: [{translateX: this.state.position}]
                        }
                    ]                        
                    }
                >
                    <Button type={this.getStatus()} active={true} />
                </Animated.View> */}

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

const Metrics = {
    containerWidth: windowWidth - 30,
    switchWidth: windowWidth / 2.7,
}

const styles = {
    container: {
        width: Metrics.containerWidth,
        height: 55,
        flexDirection: 'row',
        backgroundColor: '#EBEBEB',
        alignItems: 'center',
        justify: 'center',
        borderRadius: 27.5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnText: {
        color: 'grey',
        fontWeight: "bold",
        textAlign: 'center',
    },
    selectedBtnTexn: {
        flex:1,
        color: 'blue',
        fontSize:15,
        fontWeight: "bold",
        textAlign: 'center',
        padding: 15,
    },
    GoalSliderBtn: {
        width: Metrics.containerWidth/3,
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    switcher: {
        flexDirection: 'row',
        position: 'absolute',
        top:0,left:0,
        backgroundColor: 'white',
        borderRadius: 28,
        height: 53,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth/2.7,
        elevation: 4,
        shadowOpacity: 0.31,
        shadowRadius: 10,
        shadowColor: Colors.shadowColor,
    }
}