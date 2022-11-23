import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import { TextInput } from "@react-native-material/core";
import Modal from "react-native-modal";
import Logo from './images/Logo';

export default function UrlInput(props){
    const [urlText, setUrlText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadState, setLoadState] = useState("notDownloading");

    const handleContinue = () => {
        props.setAppState("HomePage");
    }

    const handleUrl = (url) => {
        setUrlText(url);
    }

    const handleModal = () => {
        setIsModalVisible(() => !isModalVisible);
    }

  //returns first 5 characters of lexicon
  const getName = () => {
    let name = urlText.split("/").pop().split(".")[0];
    name = name.length > 8 ? name.substring(0,8) : name;   
    return name; 
  }

  function timeout(delay) { // this function creates a delay so that the loading spinner is observed for at least x seconds as opposed to a sudden flash
    return new Promise( res => setTimeout(res, delay) );
}

  const changeLexicon = async (name, lexiconURL) => {
    console.log("changing lexicon...");
    setLoadState('downloading');
    let res = await props.changeLexicon(name, lexiconURL);
    // setLoadState('notDownloading');
    return res;
  }; 

  const handleDownload = async () => {
    console.log("handling download...")
    let downloadStatus = await changeLexicon(getName(), urlText);
    if (downloadStatus === 1) {
        await timeout(1000);
        setLoadState('downloaded');
        props.setAppState('HomePage')
    } else {
        setLoadState('notDownloading');
        handleModal()
        console.log("invalid url!");
    }
  }

  const getActiveComponent = () => {
    switch (loadState) {
      case 'notDownloading' : return <TextInput accessible={true} accessibilityLabel="Url input box" color='#006885' variant="outlined" placeholder="URL" style={styles.textInput} onChangeText={handleUrl} />;
      case 'downloading' : return <ActivityIndicator size="large" color="#006885" style={{marginBottom:40}}/>;
    } 
  }
  
    return (
      <ScrollView automaticallyAdjustKeyboardInsets = {true} keyboardShouldPersistTaps={"always"} style = {styles.scrollView} >
        <View style={styles.homeContainer}>
            <Logo  style={styles.logo}/>
            <Text style={styles.titleText}>Zebra Word Judge</Text>
            <Text style={styles.subtitleText}>Please enter the URL of the lexicon you wish to use.</Text>
            {getActiveComponent()}
            <View style={{ flexDirection:"row" }}>              
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel="Cancel"
                  accessibilityHint="Navigates you back to the home page"                
                  style={styles.cancelBtn} 
                  onPress={handleContinue}>
                    <Text style={styles.cancelbtnText}>Cancel</Text>
                </TouchableOpacity>   
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel="Download Lexicon"
                  accessibilityHint="Trys to download the new lexicon from the url you pasted into the textbox"                
                  style={styles.continueBtn} 
                  onPress={handleDownload}>
                    <Text style={styles.continuebtnText}>Download</Text>
                </TouchableOpacity>   
            </View>
            <Modal isVisible={isModalVisible}
            transparent={true}
            style={{
            flex: 1,
            margin: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
          animationIn={"fadeIn"} //Modal show animation
          animationOut={"fadeOut"} // Modal hide animation
          >
          <View
            style={{  
              height: 250, //Fixed View size
              width: 350, //Fixed View size
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <Text style={{ color: "black", fontSize:25, marginBottom: 20 }}>
              Unable to download
            </Text>
            <Text style={{ color: "#696969", fontSize:20, marginBottom: 20, paddingLeft: 10, paddingRight: 10 }}>
              Couldn't fetch lexicon. Please check the URL and try again.
            </Text>
            <TouchableOpacity
              style={{
                height: 50,
                width: 80,
                borderRadius: 50,
                backgroundColor: "#006885",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => handleModal()}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>     
        </View>
      </ScrollView>
    )
}
const styles = StyleSheet.create({
  homeContainer: {
      paddingTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },
  logo: {
      width: 250,
      height: 250,
      marginBottom: 20
  },
  titleText : {
      color: "#006885",
      marginBottom: 80,
      fontSize: 30,
      fontWeight : "bold"
  },
  subtitleText : {
      color: "#696969",
      textAlign: 'center',
      marginBottom: 40,
      fontSize: 18,
      paddingLeft: 20,
      paddingRight: 20
  },
  textInput : {
      width: '80%',
      marginBottom: 40
  },
  cancelBtn : {
      width : '25%',
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor : 'white',
      alignSelf : "center",
      alignContent : "flex-end",
      borderRadius: 50,
      borderWidth: 1,
      borderHeight: 0.,
      borderColor: 'black',
      marginRight: 15
  },
  cancelbtnText : {
      fontSize: 20,
      letterSpacing: 0.25,
      color: "#006885",
      alignSelf: "center",
      paddingRight : 0,        
  },    
  continueBtn : {
      width : '35%',
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor : "#006885",
      alignSelf : "center",
      alignContent : "flex-end",
      borderRadius: 50,
      borderWidth: 1,
      borderHeight: 0.,
      borderColor: 'black'
  },
  continuebtnText : {
      fontSize: 20,
      letterSpacing: 0.25,
      color: 'white',
      alignSelf: "center",
      paddingRight : 0,        
  }    
});