import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import Search from './Search.js';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { faFileExport } from "@fortawesome/free-solid-svg-icons/faFileExport";
import { Linking } from 'react-native';

export default function SearchHistory(props) {
    const [searchHistory, setSearchHistory] = useState([]);
    const [selectedSearches, setSelectedSearches] = useState([]);
    
    const db = props.db;

    const getSearchHistoryFromDB = () => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM history",
            [],
            (tx, results) => {
                var searchHistoryArray = [];
                if(results.rows.length > 0) {
                    var searchHistoryArray = [];
                    var timestamp;
                    var wordList;
                    var result;
                    var lexicon;
                    for(let i=0; i<results.rows.length; i++) {
                        wordList = results.rows.item(i).words;
                        result = results.rows.item(i).result;
                        timestamp = results.rows.item(i).timestamp;
                        lexicon = results.rows.item(i).lexicon;
                        searchHistoryArray.push({timestamp : timestamp, wordList : wordList, lexicon : lexicon, result : result})
                    }
                }
                setSearchHistory(searchHistoryArray);
            });
        });
    }

    const deleteHistoryFromDB = () => {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM history", [], []);
        });
    }

    const deleteSelectedSearchesFromDB = (selectedSearches) => {
        db.transaction((tx) => {
            for(let i=0; i<selectedSearches.length; i++) {
                tx.executeSql("DELETE FROM history WHERE timestamp='" + selectedSearches[i] + "'", [], []);
            }
        });
    }

    const selectSearch = timestamp => {
        if (selectedSearches.includes(timestamp)) {
            const newListItems = selectedSearches.filter(searchID => searchID !== timestamp);
            return setSelectedSearches([...newListItems]);
        }
        setSelectedSearches([...selectedSearches, timestamp]);
  };

    const clearAll = async () => {
        deleteHistoryFromDB();
        getSearchHistoryFromDB();
    }

    const handleOnPress = (timestamp) => {
        if(selectedSearches.length) {
            selectSearch(timestamp);
        }
    }

    const handleLongPress = (timestamp) => {
        if(!selectedSearches.length) {
            selectSearch(timestamp);
        }
    }

    const searches = searchHistory.slice(0).reverse().map((search, index) => {
        return <Search 
            accessible={true} 
            accessibilityLabel="Search history"
            accessibilityHint="Hold for a few seconds and press delete to delete a particular search"
            key={index}
            timestamp={search.timestamp} 
            lexicon={search.lexicon} 
            wordList={search.wordList} 
            result={search.result}
            onPress={handleOnPress}
            onLongPress={handleLongPress}
            selected={selectedSearches.includes(search.timestamp)}
            />
    });

    const deleteSelectedSearches = () => {
        deleteSelectedSearchesFromDB(selectedSearches);
        setSelectedSearches([]);
        getSearchHistoryFromDB();
    }

    useEffect(() => {
        getSearchHistoryFromDB();
    }, []);

    const handleExport = () => {
        var exampleEmail = 'support@example.com'
        var subject = 'Zebra Word Judge History'
        var body = getEmailBody();
        Linking.openURL('mailto:' + exampleEmail + '?subject=' + subject + '&body=' + body );
    }

    const getEmailBody = () => {
        var body = "Exported " + searchHistory.length + " Searches from Zebra Word Judge iOS App.\n\n";
        var searchString = "";
        for(let i=0; i<searchHistory.length; i++) {
            var time = searchHistory[i].timestamp;
            var wordList = searchHistory[i].wordList;
            var result = searchHistory[i].result;
            var lexicon = searchHistory[i].lexicon;
            
            searchString += (i+1) + ")\n";
            searchString += "result: " + (result === 1 ? "ACCEPTED " : "UNACCEPTED") + "\n";
            searchString += "time: " + time + "\n"; 
            searchString += "lexicon: " + lexicon + "\n";
            searchString +=  wordList.split(" ").length + (wordList.split(" ").length === 1 ? " word" : " words") + ": " + wordList.replace(/[ ]+/g, ", ") + "\n\n";
        }
        return body + searchString;
    }

    return (
        <View style={styles.bg}>
            <View style={styles.titleContainer}>
                {/* <Text style={styles.title}>History</Text> */}
                <TouchableOpacity accessible={true} accessibilityLabel="Export history" accessibilityHint="Share history with others via email" onPress={handleExport} style={styles.exportButton}>
                <Text style = {styles.exportText}>History</Text>
                <FontAwesomeIcon icon={faFileExport} size={34.5}/>
            </TouchableOpacity>
                </View>



            <ScrollView style={styles.searches}>
                {searches}
            </ScrollView>

            <View style={styles.historyFooter}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity accessible={true} accessibilityLabel="Delete selected history" onPress={deleteSelectedSearches} style={[styles.clearButton]}>
                        <FontAwesomeIcon style={(selectedSearches.length ? styles.btnEnabled : styles.btnDisabled)} icon={faTrashCan} size={20} />
                        <Text style={[styles.clearText, , (selectedSearches.length ? styles.btnEnabled : styles.btnDisabled)]}>Delete {selectedSearches.length ? "(" + selectedSearches.length + ") " : ""}</Text>
                    </TouchableOpacity>

                    <Text style={styles.clearText}>{searchHistory.length}{searchHistory.length === 1 ? " Item" : " Items"}</Text>

                    <TouchableOpacity accessible={true} accessibilityLabel="Clear all history" onPress={clearAll} style={styles.clearButton}>
                        <Text style={styles.clearText}>Clear All</Text>
                        <FontAwesomeIcon icon={faArrowsRotate} size={20} />
                    </TouchableOpacity>

                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    bg : {
        backgroundColor: 'white',
        flex: 1
    },
    clearButton : {
        flexDirection: 'row'
    },
    buttonRow : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 13,
    },
    btnDisabled : {
        color: '#EBEBE4'
    },
    title : {
        fontWeight: 'bold',
        fontSize: 26
    },
    titleContainer: {
        width : 480,
        height : 55,
        flexDirection: "row",
        alignSelf : "center",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
    },
    clearText : {
        marginHorizontal: 7,
        fontSize: 15
    },
    exportText: {
        fontWeight: 'bold',
        fontSize: 26,
        flexDirection: 'row',
        paddingRight: 5
    },
    exportButton : {
        flexDirection: 'row'
    },
    searches : {
        marginBottom: 30,

    },
    historyFooter : {
        position: "absolute",
        bottom : -35,
        left : 0,
        right : 0,
        height: 65,
        backgroundColor : "white",
        borderTopWidth : 0.5
    }
});  