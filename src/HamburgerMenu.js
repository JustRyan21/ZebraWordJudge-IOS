import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modal";
import {useState} from "react";

export default function Hamburger(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewHistoryButtonVisible, setIsViewHistoryButtonVisible] = useState(true);

    const handleHome = () => {
        props.setAppState("HomePage");
    }

    const handleChangeLexicon = () => {
        props.setAppState("UrlInput");
    }

    const handleViewHistory = () => {
        props.setAppState("SearchHistory");
        handleModal();
        handleViewHistoryButton();
    }

    const handleModal = () => {
        setIsModalVisible(() => !isModalVisible);
    }

    const handleViewHistoryButton = () => {
        setIsViewHistoryButtonVisible(() => !isViewHistoryButtonVisible);
    }

    if (isViewHistoryButtonVisible == true) {
        return (
            <View>
                <TouchableOpacity accessible={true} accessibilityLabel="Hamburger menu" onPress={() => handleModal()}>
                    <FontAwesomeIcon icon={faBars} size={35} style={styles.hamburgerIcon}/>
                </TouchableOpacity>
                <View>
                    <Modal isVisible={isModalVisible} transparent={true} style={styles.modal1} animationIn={"slideInUp"} animationOut={"slideOutDown"} onBackdropPress={() => {handleModal()}}>

                        <View>
                            <TouchableOpacity accessible={true} accessibilityLabel="Return home" style={styles.buttonHome} onPress={handleHome}>
                                <Text style={styles.buttonText}>Return Home</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity accessible={true} accessibilityLabel="Change lexicon" style={styles.buttonLexicon1} onPress={handleChangeLexicon}>
                                <Text style={styles.buttonText}>Change Lexicon</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity accessible={true} accessibilityLabel="View history" style={styles.buttonHistory} onPress={handleViewHistory}>
                                <Text style={styles.buttonText}>View History</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>
                </View>
            </View>

        );
    } else {
        return (
            <View>
                <TouchableOpacity accessible={true} accessibilityLabel="Hamburger menu" onPress={() => handleModal()}>
                    <FontAwesomeIcon icon={faBars} size={35} style={styles.hamburgerIcon}/>
                </TouchableOpacity>
                <View>
                    <Modal isVisible={isModalVisible} transparent={true} style={styles.modal2} animationIn={"slideInUp"} animationOut={"slideOutDown"} onBackdropPress={() => {handleModal()}}>

                        <View>
                            <TouchableOpacity accessible={true} accessibilityLabel="Return home" style={styles.buttonHome} onPress={handleHome}>
                                <Text style={styles.buttonText}>Return Home</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity accessible={true} accessibilityLabel="Change lexicon" style={styles.buttonLexicon2} onPress={handleChangeLexicon}>
                                <Text style={styles.buttonText}>Change Lexicon</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    hamburgerIcon : {
        marginRight: 10,
        color: "white",
    },

    modal1 : {
        position: "absolute",
        bottom: 0,
        height: "20%",
        width: "90%",
        backgroundColor : "white",
        borderRadius: 20,
    },

    modal2 : {
        position: "absolute",
        bottom: 0,
        height: "15%",
        width: "90%",
        backgroundColor : "white",
        borderRadius: 20,
    },

    buttonHome : {
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },

    buttonLexicon1 : {
        alignItems: "center",
        width: "100%",
        marginTop: 15,
        marginBottom: 15,
    },

    buttonLexicon2 : {
        alignItems: "center",
        width: "100%",
        marginTop: 15,
    },

    buttonHistory : {
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },

    buttonText : {
        fontSize: 22,
        color: "black",
    },

});