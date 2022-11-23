import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { SECONDS_TO_RETURN_AFTER_RESULTS } from "./CONSTANTS";

export default function ResultsPage(props) {
    let valid = props.result;
    const id = useRef(null);

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
          size={50}
          strokeWidth={5}
          isPlaying
          duration={SECONDS_TO_RETURN_AFTER_RESULTS}
          colors="#006885"
          onComplete={() => {
            props.setAppState("NumberSelector");
            return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds; for testing purposes
          }}
        />
    )      

    const handleHomepage = () => {
        console.log(props.result)
        props.setAppState("NumberSelector");
    }

    if(!valid) {
        return (
            <SafeAreaView style={styles.ResultsContainerInvalid} flex={1}>
                <TouchableOpacity 
                    accessible={true} 
                    accessibilityLabel="Click to return home" 
                    accessibilityHint="Navigates you to the page where you can choose number of words to judge"                 
                    style={styles.ResultsContainerInvalid} 
                    onPress= {handleHomepage}>
                <View style={{flex: 1}}>
                    <Text style={styles.IncorrectVerdictText}>UNACCEPTABLE</Text> 
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    {[props.wordsArray.map((item,index)=><Text style={styles.IncorrectWordsText} key={index}> {item} </Text>)]}
                </View>
                <View style={{flex: 1}}>
                    <UrgeWithPleasureComponent style={styles.Timer}></UrgeWithPleasureComponent>
                </View>
                </TouchableOpacity> 
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.ResultsContainerValid} flex={1}>
                <TouchableOpacity 
                    accessible={true} 
                    accessibilityLabel="Click to return home" 
                    accessibilityHint="Navigates you to the page where you can choose number of words to judge"                
                    style={styles.ResultsContainerValid} 
                    onPress= {handleHomepage}>
                <View style={{flex: 1}}>
                    <Text style={styles.CorrectVerdictText}>ACCEPTABLE</Text> 
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    {[props.wordsArray.map((item,index)=><Text style={styles.CorrectWordsText} key={index}> {item} </Text>)]}
                </View>
                <View style={{flex: 1, justifyContent: 'center', paddingTop: 0}}>
                    <UrgeWithPleasureComponent style={styles.Timer}></UrgeWithPleasureComponent>
                </View>
                </TouchableOpacity> 
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    ResultsContainerInvalid: {
        backgroundColor: "#e0251e",
        alignItems: 'center'
    },
    ResultsContainerValid: {
        backgroundColor: "#1fe173",
        alignItems: 'center',
    },
    CorrectVerdictText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 30,
        marginTop: 40,
    },      
    IncorrectVerdictText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
        marginTop: 40,
    },           
    CorrectWordsText: {
        color: "black",
        flexDirection:'row',
        fontWeight: "bold",
        fontSize: 30,
    },
    IncorrectWordsText: {
        color: "white",
        flexDirection:'row',
        fontWeight: "bold",
        fontSize: 30,

    }        
});   