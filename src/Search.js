import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Search(props) {
    var wordList = props.wordList.split(" ");

    const wordListColumn1 = wordList.map((word, index) => {
        if(index < 4) return <Text style={styles.text} key={index}>{word}</Text>
    });

    const wordListColumn2 = wordList.map((word, index) => {
        if(index >= 4) return <Text style={styles.text} key={index}>{word}</Text>
    });

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onPress(props.timestamp)} onLongPress={() => props.onLongPress(props.timestamp)}>
            <View style={[styles.banner, (props.selected ? styles.selected : styles.unselected)]}>
                <View style={styles.iconAndResult}>
                    <View style={[styles.circle, (props.result === 1 ? styles.circleCorrect : styles.circleIncorrect)]}></View>
                    <Text style={styles.bannerText}>{props.result === 1 ? "ACCEPTABLE": "UNACCEPTABLE"}</Text>
                </View>
                <View style={styles.LexiconAndDate}>
                    <Text style={styles.bannerText}>{props.lexicon}</Text>
                    <Text style={styles.date}>{timeSince(props.timestamp)}</Text>  
                </View>
            </View>
        
            <View style={[styles.wordList, (props.selected ? styles.selected : styles.unselected)]}>
                <View style={styles.wordListColumn}>{wordListColumn1}</View>
                <View style={styles.wordListColumn}>{wordListColumn2}</View>
            </View>
        </TouchableOpacity>
    );
}
    
const styles = StyleSheet.create({
    text : {
        fontSize: 16,
    },
    wordListColumn : {
        width: '50%',
    },
    date : {
        fontSize: 14,
        fontStyle: 'italic'
    },
    container : {
        borderColor: 'black',
        borderTopWidth: 2,
        borderBottomWidth: 0
    },
    banner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 7,
        backgroundColor: '#E7FAFF'
    },
    iconCorrect : {
        color: 'green',
        border: '2px black solid'
    },
    iconIncorrect : {
        color: 'red'
    },
    bannerText : {
        fontSize : 20,
        fontWeight: 'bold'
    },
    wordList : {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingVertical: 8,
        backgroundColor: '#FBFEFF'
        
    },
    iconAndResult : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 2,
        marginRight: 5
    },
    circleCorrect : {
        backgroundColor: 'green'
    },
    circleIncorrect : {
        backgroundColor: 'red'
    },
    LexiconAndDate : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '47%'
    },
    selected : {
        backgroundColor : '#87CEFA'
    },
    unselected : {
    },
});

const timeSince = (timestamp) => {
    var date = new Date(timestamp);
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    var digit;
    
    if (interval > 1) {
        digit = Math.floor(interval);
        return digit + (digit === 1 ? " year ago" : " years ago");
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        digit = Math.floor(interval);
        return digit + (digit === 1 ? " month ago" : " months ago");
    }

    interval = seconds / 86400;
    if (interval > 1) {
        digit = Math.floor(interval);
        return digit + (digit === 1 ? " day ago" : " days ago");
    }

    interval = seconds / 3600;
    if (interval > 1) {
        digit = Math.floor(interval);
        return digit + (digit === 1 ? " hour ago" : " hours ago");
    }

    interval = seconds / 60;
    if (interval > 1) {
        digit = Math.floor(interval);
        return digit + (digit === 1 ? " minute ago" : " minutes ago");
    }

    digit = Math.floor(seconds)
    return digit + (digit === 1 ? " second ago" : " seconds ago");;
}