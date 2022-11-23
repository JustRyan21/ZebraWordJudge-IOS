import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons/faCircleCheck";

export default function Footer(props){
    return (
        <View style={styles.placeholder}>
            <View style={styles.leftSide}>
                <TouchableOpacity 
                    accessible={true}
                    accessibilityLabel="Return Home"
                    style={styles.clickableArea} 
                    onPress={props.navToHomePage}>
                        <Text style={styles.lexiconText}>Lexicon</Text>
                </TouchableOpacity>
                <FontAwesomeIcon icon={faChevronRight} size={15} style={styles.faChevronRight}/>
                <Text style={styles.lexiconNameText}>{props.lexiconName}</Text>
            </View>
            {props.isOfficial && 
            <View style={styles.rightSide}>
                <Text style={styles.verifiedText}>verified</Text>
                <FontAwesomeIcon icon={faCircleCheck} size={25} style={styles.faCircleCheck}/>
            </View> }
        </View> 

    )

}

const styles = StyleSheet.create({
    placeholder : {
        position : "absolute",
        left : 0,
        right: 0,
        bottom : 0,
        height : 65,
        backgroundColor : "#006885",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20
    },
    leftSide : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightSide : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    lexiconText : {
        fontSize: 20,
        color: "#CCCCCC",
        textDecorationLine: 'underline'
    },
    verifiedText : {
        fontSize: 20,
        color: "#CCCCCC",
    },
        lexiconNameText : {
        fontSize: 20,
        color: "#FFFFFF",
    },
    clickableArea : {
        textAlign: 'center',
    },
    faChevronRight : {
        backgroundColor: 'transparent',
        color: "#222222",
        marginRight: 3,
        marginLeft: 3
    },
    faCircleCheck : {
        backgroundColor: 'transparent',
        color: "#FFFFFF",
        marginLeft: 5
    }
});