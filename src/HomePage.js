import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Logo from './images/Logo';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons/faCircleCheck";

export default function HomePage(props){

    const handleContinue = () => {
        props.setAppState("NumberSelector");
    }

    const handleUpdateLexicon = () => {
        props.setAppState("UrlInput");
    }

    const toCommas = value => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const lexiconSizeText = toCommas(props.lexiconSize) + (props.lexiconSize === 1 ? " Word" : " Words");

    return (
        <View style={styles.homeContainer}>
            <Logo  style={styles.logo}/>
            <Text style={styles.titleText}>Zebra Word Judge</Text>
            <Text style={styles.subtitleText}>Selected Lexicon:</Text>
            {props.lexiconSize > 0 ? <Text style={styles.lexiconText}>{props.lexiconName}</Text> : <Text style={styles.lexiconText}>None Selected</Text>}
            { props.lexiconSize > 0 && <Text style={styles.subtitleText}>{lexiconSizeText}</Text> }
            <TouchableOpacity 
                accessible={true}
                accessibilityLabel="Update Lexicon"
                accessibilityHint="Navigates you to the page where you can update the lexicon via pasting a url"
                style={styles.updateBtn} 
                onPress={handleUpdateLexicon}>
                <Text style={styles.updatebtnText}>Update Lexicon</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                accessible={true}
                accessibilityLabel="Continue"
                accessibilityHint="Navigates you to the page where you can choose how many words to challenge"            
                style={styles.continueBtn} 
                onPress={handleContinue}>
                <Text style={styles.continuebtnText}>Continue</Text>
            </TouchableOpacity>            
        </View>
    )
}
const styles = StyleSheet.create({
    homeContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20
    },
    titleText : {
        color: "#006885",
        marginBottom: 80,
        fontSize: 30,
        fontWeight : "bold"
    },
    subtitleText : {
        color: "#696969",
        marginBottom: 40,
        fontSize: 20
    },
    lexiconText : {
        fontWeight: "bold",
        marginBottom: 40,
        fontSize: 30
    },
    updateBtn : {
        width : '50%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor : 'white',
        alignSelf : "center",
        alignContent : "flex-end",
        borderRadius: 50,
        borderWidth: 1,
        borderHeight: 0.,
        borderColor: 'black',
        marginBottom: 40
    },
    updatebtnText : {
        fontSize: 20,
        letterSpacing: 0.25,
        color: "#006885",
        alignSelf: "center",
        paddingRight : 0,        
    },
    continueBtn : {
        width : '35%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor : "#006885",
        alignSelf : "center",
        alignContent : "flex-end",
        borderRadius: 50,
        borderWidth: 1,
        borderHeight: 0.,
        borderColor: 'black'
    },
    continuebtnText : {
        fontSize: 20,
        letterSpacing: 0.25,
        color: 'white',
        alignSelf: "center",
        paddingRight : 0,        
    },
    faCircleCheck : {
        backgroundColor: 'transparent',
        color: "#006885",
        marginBottom: 5
    }
});