import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import TextBox from "./TextBox";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import { Audio } from 'expo-av';

export default function UserTextInput(props){
    const wordsArray = props.wordsArray
    const numWords = props.numWords     //number of words to judge
    let result = props.result;

    async function playSuccess() {
        const { sound } = await Audio.Sound.createAsync( require('../assets/Success.mp3'));
        await sound.playAsync();
    }

    async function playFail() {
        const { sound } = await Audio.Sound.createAsync( require('../assets/Fail.mp3'));
        await sound.playAsync();
    }       

    const handleInput = (text, index) => {
        let maxWordLength = 45;
        if(text.length > maxWordLength) return;
        var punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~“”‘]/g;
        var numberRegex = /[0-9]/g;
        text = text.replace(punctuationRegex, '')   //doesn't allow any punctuation characters
            .replace(numberRegex, '')       //doesn't allow any number characters
            .replace(' ', '');              //doesn't allow spaces
        var newArr = [...wordsArray];
        newArr[index] = text.toUpperCase();
        props.setWordsArray(newArr);
    }

    const handleResultsPage = () => {
        let valid = checkInputValid();
        if (!valid) {
            createAlert();
        } else {
            result ? playSuccess().then(props.setAppState("ResultsPage")) : playFail().then(props.setAppState("ResultsPage"));
        }
    }

    //create a list containing the correct number of textBox's
    const textBoxList = wordsArray.map((item, index) => {
        if(index < numWords) {
            return <TextBox numwords={numWords} key={index} index={index} value={wordsArray[index]} handleInput={handleInput} ref_array={props.ref_array} handleResultsPage={handleResultsPage}/>;
        } else {
            return null;
        }
    });

    const instructionText = (numWords === 1) ? "Enter a word" : "Enter " + numWords + " words";
    const createAlert = () =>
        Alert.alert(
            instructionText,""[
                { text: "OK", onPress: () => 1+1}
            ]
        );

    const checkInputValid = () => {
        for(let i=0; i<numWords; i++) {
            if(wordsArray[i] === '') {
                return false;
            }
        }
        return true;
    }

    const handleReturnToNum = () => {
        props.setAppState("NumberSelector");
    }


    const clearAllText = () => {
        props.setWordsArray(new Array(8).fill(""));
    }

    return (
        <ScrollView automaticallyAdjustKeyboardInsets = {true} keyboardShouldPersistTaps={"always"} style = {styles.scrollView} >
        <Text style={styles.instructionHeader}> {instructionText}</Text>
        <View style={styles.buttons} >
            <TouchableOpacity 
                accessible={true} 
                accessibilityLabel="Go back" 
                accessibilityHint="Navigates back to the page where you choose number of words to judge" 
                style={styles.backButton} 
                onPress={handleReturnToNum}>
                <FontAwesomeIcon icon={faArrowLeft} size={25.5} />
                    <Text style = {styles.backText}> Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            accessible={true} 
            accessibilityLabel="Clear all input" 
            accessibilityHint="Removes all the text you've entered into the input boxes" 
            onPress={clearAllText} 
            style={styles.clearButton}>
            <Text style={styles.clearText}>Clear </Text>
            <FontAwesomeIcon icon={faArrowsRotate} size={25.5} />
        </TouchableOpacity>

        </View>
        {textBoxList}
        <TouchableOpacity 
            accessible={true} 
            accessibilityLabel="Judge" 
            accessibilityHint="Navigates you to the results page which gives the verdict after comparing your words against the lexicon"
            onPress={handleResultsPage} 
            style={styles.judgeBtn}>
            <Text style={styles.judgebtnText}>Judge</Text>
        </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    instructionHeader: {
        fontSize: 28,
        fontWeight : "bold",
        alignSelf : "center",
        paddingTop: 18,
        paddingBottom : 8,
    },
    buttons : {
        width : 350,
        height : 50,
        flexDirection: "row",
        alignSelf : "center",
        alignItems: "center",
        justifyContent: "space-between",

    },
    clearButton : {
        flexDirection: "row",
    },
    backButton : {
        flexDirection: "row",
    },
    clearText : {
        flexDirection: "row",
        fontSize : 20,
    },
    backText : {
        flexDirection: "row",
        fontSize : 20,
    },
    judgeBtn : {
        width : '85%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor : "#006885",
        alignSelf : "center",
        alignContent : "flex-end",
        top : "1%"
    },
    judgebtnText : {
        fontSize: 34,
        letterSpacing: 0.25,
        color: 'white',
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    }
});