import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from "react";
import Header from './Header.js';
import HomePage from "./HomePage";
import NumberSelector from "./NumberSelector";
import Footer from "./Footer";
import UserTextInput from "./UserTextInput";
import UrlInput from "./UrlInput";
import SearchHistory from './SearchHistory.js';
import ResultsPage from "./ResultsPage";
import * as SQLite from 'expo-sqlite';
import sha256 from 'js-sha256';
import {DEFAULT_LEXICON} from "./CONSTANTS";
import {OFFICIAL_LEXICONS} from "./CONSTANTS";


export default function App() {
    const [wordsArray, setWordsArray] = useState(new Array(4).fill("")); //array containing the words to judge
    const [appState, setAppState] = useState('HomePage');
    const [numWordsSelected, setNumWordsSelected] = useState(0);
    const [currentLexicon, setCurrentLexicon] = useState({name : "", wordList : [], isOfficial : false, hash : "", size : 0});

    // (creates ref objects for text input boxes index 1-7)
    const ref_i1 = useRef();
    const ref_i2 = useRef();
    const ref_i3 = useRef();
    const ref_i4 = useRef();
    const ref_i5 = useRef();
    const ref_i6 = useRef();
    const ref_i7 = useRef();
    const ref_array = ["index_zero_placeholder", ref_i1, ref_i2, ref_i3, ref_i4, ref_i5, ref_i6, ref_i7]

    //fetches lexicon, checks hash, checks isOfficial, splits fetchedLexicon into chunks, 
    //stores chunks into database, then sets currentLexicon state 
    const changeLexicon = async (lexiconName, lexiconURL) => {
        try {
            await fetchLexicon(lexiconURL).then(fetchedLexicon => {
                var hash = getHash(fetchedLexicon); // hash fetched lexicon
                var isOfficial = checkIsOfficial(lexiconName, hash); //compare name + hash to our official list
                var chunks = chunkify(fetchedLexicon);
                deleteLexiconFromDB();
                storeLexicon(lexiconName, chunks, hash).then(() => {
                    setCurrentLexicon({...currentLexicon, name : lexiconName, isOfficial : isOfficial, hash : hash});
                    getWordlistFromDB();
                }).catch(() => {throw new Error("Store Lexicon Error"); return -1;});
            }).catch(() => {throw new Error("Fetch Lexicon Error"); return -1;});
        } catch (error) {
            console.log("Error storing lex");
            return -1;
        }
        console.log('Successfully stored in db: ', lexiconName);
        return 1;
    }

    //True if all judgeWords exist in lexiconWords
    const getResult = (judgeWords) => {
        var result = judgeWords.filter(word => word !== "").every(word => (currentLexicon.wordList).includes(word));
        addSearchEntry((new Date()).toString(), judgeWords, currentLexicon.name, (result === true) ? 1 : 0);
        return result;
    }
    const getResultBool = (judgeWords) => {
        var result = judgeWords.filter(word => word !== "").every(word => (currentLexicon.wordList).includes(word));
        return result;

    }

    const getHash = (fetchedLexicon) => {
        var newLineRegex = /\r\n/g;
        var combinedString = fetchedLexicon.replace(newLineRegex, "\n");  
        // var combinedString = fetchedLexicon.replaceAll("\r", "");
        var lexiconHash = sha256(combinedString);
        return lexiconHash;
    }

    //checks if lexicon is official
    const checkIsOfficial = (name, hash) => {
        for(let i=0; i<OFFICIAL_LEXICONS.length; i++) {
            if(name === OFFICIAL_LEXICONS[i].officialName && hash === OFFICIAL_LEXICONS[i].officialHash) {
                return true;
            }
        }
        return false;
    }

    //returns database object 
    const openDatabase = () => {
        const db = SQLite.openDatabase("DB");
        return db;
    }

    //creates table in database
    const createTables = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS " 
                + "lexicon "
                + "(Name TEXT PRIMARY KEY NOT NULL, "
                + "Wordlist BLOB, "
                + "Hash TEXT);");
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS " 
                + "history "
                + "(timestamp TEXT PRIMARY KEY NOT NULL, "
                + "words TEXT, "
                + "lexicon TEXT, "
                + "result INT);");
        });
    }

    const addSearchEntry = (timestamp, wordList, lexicon, result) => {
        var words = wordList.join(" ").trim();
        try {
            db.transaction((tx) => {
                tx.executeSql("INSERT into history (timestamp, words, lexicon, result) VALUES (?,?,?,?)", [timestamp, words, lexicon, result],
                    [],(error) => {
                        console.log("Error Inserting Search Entry into DB");
                        console.log(error);
                    });
                }
            );
            //setSearchHistory(searchHistory => ([...searchHistory, { timestamp : timestamp, words : words, lexicon : lexicon, result : result }]));
        } catch {
            throw new Error("Error Inserting Search Entry into DB");
        }
    }
    


    const loadLexicon = async (LexiconURL) => {
        const response = await fetch(LexiconURL);
        if(!response.ok) {
            throw new Error("Invalid URL!");
        }
        return (await response.text());
    };

    //fetches lexicon from URL
    const fetchLexicon = async (LexiconURL) => {
        var fetchedLexiconWords; 
        try {
            fetchedLexiconWords = await loadLexicon(LexiconURL);
        } catch {
            throw new Error("ERROR FETCHING LEXICON");
        }
        return fetchedLexiconWords;
    }

    //splits fetched lexicon (if less than 10m chars) into chunks of 1 million characters
    const chunkify = (lexiconWords) => {
        var wordsArray = [];
        if(lexiconWords.length < 10000000) {
            for(let i=0; i < lexiconWords.length; i+=1000000) {
                wordsArray.push(lexiconWords.substring(i, Math.min(lexiconWords.length,  i + 1000000)));
            }
        } else {
            throw new Error("Lexicon Too Large");
        }

        return wordsArray;
    }

    //stores lexicon chunks into database along with name (primary key) and hash
    const storeLexicon = async (lexiconName, lexiconChunks, lexiconHash) => {  
        try {
            db.transaction((tx) => {
                for(let i=0; i < lexiconChunks.length; i++) {
                    tx.executeSql("INSERT into lexicon (Name, Wordlist, Hash) VALUES (?,?,?)", [lexiconName + "-" + i, lexiconChunks[i], lexiconHash],
                        [],
                        (error) => {
                            console.log("Error Inserting into DB");
                        });
                    }
                } 
            );
        } catch {
            throw new Error("Error Inserting into DB");
        }
    }

    const deleteLexiconFromDB = () => {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM lexicon");
        });
    }

    //closes DB and deleted everything
    const closeDatabase = () => {
        db.closeAsync();
        db.deleteAsync();
    }

    //gets lexicon chunks from DB, joins them into large string, then splits into array and updates currentLexicon
    const getWordlistFromDB = async () => {
        db.transaction((tx) => {
            tx.executeSql("SELECT Wordlist FROM lexicon WHERE NAME LIKE NAME", //might need to change this query
            [],
            (tx, results) => {
                if(results.rows.length > 0) {
                    var joinedWordlist = "";
                    for(let i=0; i<results.rows.length; i++) {
                        joinedWordlist += results.rows.item(i).Wordlist;
                    }
                    var lexiconWords = joinedWordlist.split(/\r?\n/);
                    setCurrentLexicon((currentLexicon) => ({...currentLexicon, wordList : lexiconWords, size : lexiconWords.length}));
                } else {
                    console.log("Unable to find");

                }
            });
        });
    }

    const getNameFromDB = async () => {
        db.transaction((tx) => {
            tx.executeSql("SELECT Name FROM lexicon",
            [],
            (tx, results) => {
                if(results.rows.length > 0) {
                    var rowName = results.rows.item(0).Name;
                    var lexiconName = (rowName.split('-'))[0];
                    setCurrentLexicon((currentLexicon) => ({...currentLexicon, name : lexiconName}));
                } else {
                    console.log("Unable to find lexicon name in DB");
                }
            });
        });
    }

    const getHashFromDB = async () => {
        db.transaction((tx) => {
            tx.executeSql("SELECT Name, Hash FROM lexicon",
            [],
            (tx, results) => {
                if(results.rows.length > 0) {
                    var name = ((results.rows.item(0).Name).split('-'))[0];
                    var hashValue = results.rows.item(0).Hash;
                    const isOfficial = checkIsOfficial(name, hashValue);
                    setCurrentLexicon((currentLexicon) => ({...currentLexicon, hash : hashValue, isOfficial : isOfficial}));
                } else {
                    console.log("Unable to find hash value in DB");

                }
            });
        });
    }

    const setCurrentLexiconDetails = () => {
        getHashFromDB();
        getNameFromDB();
        getWordlistFromDB();
    }

    //checks if database is storing lex, then updates lexicon if it is, otherwise loads the default lexicon. 
    const initCurrentLexicon = async () => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM lexicon",
            [],
            (tx, results) => {
                var dbIsEmpty = results.rows.length === 0;
                if(!dbIsEmpty) {
                    setCurrentLexiconDetails();
                } else {
                var lexiconName = DEFAULT_LEXICON.name;
                var lexiconURL = DEFAULT_LEXICON.url;
                changeLexicon(lexiconName, lexiconURL);
                }
            })
        });
    }

    const db = openDatabase();
    
    useEffect(() => {
        // vvvv uncomment if you want to empty database on app start
        // deleteLexiconFromDB();
        // closeDatabase();
        createTables();
        initCurrentLexicon();
        deleteOldSearchesFromSearchHistory();
    }, []);

    const deleteOldSearchesFromSearchHistory = () => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM history",
            [],
            (tx, results) => {
                if(results.rows.length > 0) {
                    var oneYearOldSearches = []
                    for(let i=0; i<results.rows.length; i++) {
                        let timestamp = results.rows.item(i).timestamp;
                        let date = new Date(timestamp);
                        let secondsSinceSearch = Math.floor((new Date() - date) / 1000);
                        let yearsSinceSearch = Math.floor(secondsSinceSearch / 31536000);
                        if (yearsSinceSearch) {
                            oneYearOldSearches.push(timestamp);
                        } else {
                            break;
                        }
                    }
                    for(let i=0; i<oneYearOldSearches.length; i++) {
                        tx.executeSql("DELETE FROM history WHERE timestamp='" + oneYearOldSearches[i] + "'", [], []);
                    }
                }
            });
        });
    }

    const handleNumberSelected = (num) => {
        setNumWordsSelected(num);
        setAppState('UserTextInput');
        setWordsArray(new Array(4).fill(""));
    }

    const getActiveComponent = () => {
        switch(appState) {
            case 'HomePage': return <HomePage setAppState={setAppState} lexiconName={currentLexicon.name} isOfficial={currentLexicon.isOfficial} lexiconSize= {currentLexicon.size} />;
            case 'UrlInput': return <UrlInput setAppState={setAppState} changeLexicon={changeLexicon} />;
            case 'NumberSelector': return  <NumberSelector onPress={(newNumber) => handleNumberSelected(newNumber)} setAppState={setAppState} />;
            case 'UserTextInput': return <UserTextInput setWordsArray={(newArray) => setWordsArray(newArray)} wordsArray = {wordsArray} numWords={numWordsSelected} setAppState={(newAppState) => setAppState(newAppState)} ref_array={ref_array} result={getResultBool(wordsArray)}/>;
            case 'ResultsPage': return <ResultsPage wordsArray = {wordsArray} setAppState={setAppState} result={getResult(wordsArray)} />;
            case 'SearchHistory' : return <SearchHistory db={db}/>
            default : return <NumberSelector onPress={handleNumberSelected} />;
        }
    }

    const activeComponent = getActiveComponent();

    return (
        <SafeAreaView flex={1}>
            {appState !== 'HomePage' && appState !== 'UrlInput' && <Header setAppState={setAppState}/>}
            {activeComponent}
            {appState !== 'HomePage' && appState !== 'UrlInput' && appState !== 'SearchHistory' &&
                <Footer lexiconName={currentLexicon.name} isOfficial={currentLexicon.isOfficial} navToHomePage={() => setAppState('HomePage')}/>
            }
        </SafeAreaView>
    );
}
