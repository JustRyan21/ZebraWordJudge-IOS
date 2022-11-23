import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from "react";


export default function NumberBox(props) {
    let buttonTitle = props.number.toString()
    return (
        <TouchableOpacity value = {props.number} style={styles.numberBtn} onPress={() =>  props.onPress(props.number)}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    numberBtn: {
        paddingVertical: 35,
        paddingHorizontal: 45,
        margin: 8,
        backgroundColor : "#006885",
        borderWidth: 2,
        borderColor: "black",
        alignItems: "center",

    },
    buttonText : {
        fontSize: 35,
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
    }
});

