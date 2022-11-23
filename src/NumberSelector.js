import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import NumberBox from "./NumberBox";


export default function NumberSelector(props) {
    return (
        <View style= {styles.numpad}>
            <Text style={styles.NumberSelectorH1}>How many words would you like to judge?</Text>
            <View style={styles.numberBoxes}>
                <View style= {styles.row}>
                    <NumberBox accessible={true} accessibilityLabel="One word" accessibilityHint="For challenging only one word" number={1} onPress={props.onPress}/>
                    <NumberBox accessible={true} accessibilityLabel="Two words" accessibilityHint="For challenging only two words" number={2} onPress={props.onPress}/>
                </View>
                
                <View style={styles.row}>
                    <NumberBox accessible={true} accessibilityLabel="Three words" accessibilityHint="For challenging only three words" number={3} onPress={props.onPress}/>
                    <NumberBox accessible={true} accessibilityLabel="Four words" accessibilityHint="For challenging only four words" number={4} onPress={props.onPress}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    numpad : {
        display : "flex",
        flex: 1,
        justifyContent : "center",
        paddingBottom: 80,
    },
    NumberSelectorH1 : {
        display : "flex",
        fontSize: 30,
        textAlign : "center",
        fontWeight : "bold",
        bottom: 45,
        paddingHorizontal:3
    },
    numberBoxes : {
        justifyContent : "center",
        alignItems : "center",
    },
    row : {
        display : "flex",
        flexDirection : "row",
    }
});