import React, {useRef} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';

export default function TextBox(props) {
    const ref_array = props.ref_array
    var current_ref = ref_array[props.index];
    var next_num = (1 + props.index);
    var next_ref = ref_array[next_num];

    const placeholderText = "Enter a word";
    var label = (1+props.index).toString() + ".";

    if(props.numwords === 1){
        return (
            <View 
                accessible={true} 
                accessibilityLabel="Word input" 
                accessibilityHint="Enter word to challenge"
                style={styles.outerTextBox}>
                <Text style={styles.label}>{label}</Text>
                <TextInput fontSize={(props.value === "" ? 18 : 30)} style={styles.input} type="text"
                value={props.value}
                onChangeText={(changedText) => props.handleInput(changedText, props.index)}
                autoComplete="off" autoCorrect={false}
                placeholder={placeholderText} id={props.index} autoFocus={props.index === 0}
                autoCapitalize="characters" onSubmitEditing={() => props.handleResultsPage()} selectionColor={"#006885"}/>

                </View>
        );
    }
    else if (props.index === 0) {
        return (
            <View 
            accessible={true} 
            accessibilityLabel="Word input" 
            accessibilityHint="Enter words to challenge"
            style={styles.outerTextBox}>
                <Text style={styles.label}>{label}</Text>
                <TextInput fontSize={(props.value === "" ? 18 : 30)} style={styles.input} type="text"
                           value={props.value}
                           onChangeText={(changedText) => props.handleInput(changedText, props.index)}
                           autoComplete="off" autoCorrect={false}
                           placeholder={placeholderText} id={props.index} autoFocus={props.index === 0}
                           autoCapitalize="characters"
                           returnKeyType={"next"} onSubmitEditing={() => next_ref.current.focus()} selectionColor={"#006885"}/>
            </View>
        );
    }
    else if (props.index === (props.numwords-1)) {
        return (
            <View 
            accessible={true} 
            accessibilityLabel="Word input" 
            accessibilityHint="Enter words to challenge"
            style={styles.outerTextBox}>
                <Text style={styles.label}>{label}</Text>
                <TextInput ref={current_ref} fontSize={30} style={styles.input} type="text"
                           value={props.value}
                           onChangeText={(changedText) => props.handleInput(changedText, props.index)}
                           autoComplete="off" autoCorrect={false}
                            id={props.index} autoFocus={props.index === 0}
                           autoCapitalize="characters" onSubmitEditing={() => props.handleResultsPage()} selectionColor={"#006885"} />
            </View>
        );
    }
    else {
        return (
            <View 
            accessible={true} 
            accessibilityLabel="Word input" 
            accessibilityHint="Enter words to challenge"
            style={styles.outerTextBox}>
                <Text style={styles.label}>{label}</Text>
                <TextInput ref={current_ref} fontSize={30} style={styles.input} type="text"
                           value={props.value}
                           onChangeText={(changedText) => props.handleInput(changedText, props.index)}
                           autoComplete="off" autoCorrect={false}
                           id={props.index} autoFocus={props.index === 0}
                           autoCapitalize="characters"
                           returnKeyType={"next"} onSubmitEditing={() => next_ref.current.focus()} selectionColor={"#006885"}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerTextBox : {
        height: 50,
        borderStyle: "solid",
        width : 350,
        borderWidth : 0.8,
        alignSelf: "center",
        margin : 9.5,
        justifyContent : "space-between",

    },
    label : {
        fontSize: 14,
        textAlign : "left",
        paddingTop: 15,
        paddingLeft: 10,
        opacity: 0.5,

    },
    input: {
        height: 35,
        margin: 9.5,
        borderWidth: 0,
        paddingLeft: 8,
        width : 300,
        alignItems : "center",
        justifyContent : "space-between",
        alignSelf : "center",
        marginTop: -26.5,
    },
});