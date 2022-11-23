import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import Logo from './images/Logo';
import HamburgerMenu from './HamburgerMenu.js';

export default function Header(props) {

    return (
        <View style={styles.header}>
            <Logo accessible={true} accessibilityLabel="Return home" style={styles.logo} onPress={() => {props.setAppState("HomePage");}}/>
            <Text style={styles.title}>
                Zebra Word Judge
            </Text>
            <HamburgerMenu accessible={true} accessibilityLabel="Hamburger menu" setAppState={props.setAppState}/>
        </View>
    );
}
const styles = StyleSheet.create({

    header: {
        height : 65,
        display : "flex",
        alignItems : "center",
        flexDirection: "row",
        backgroundColor : "#006885",
        padding : 3,

    },

    logo: {
        height : 70,
        width : 70,
        marginRight : 6,
        marginLeft : 0,

    },

    title : {
        fontSize : 26,
        marginRight : "auto" ,
        width : "100%",
        textAlign : "left",
   //     fontFamily: "Baskerville-Bold",
        color : "#FFF",

    },

});
