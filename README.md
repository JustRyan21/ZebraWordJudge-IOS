Zebra Word Judge (iOS)
==========

<br>

Project Management Tool:
----------
https://scrabbleapp-399.atlassian.net/jira/software/projects/TF1/boards/2/roadmap?shared=&atlOrigin=eyJpIjoiNDllYTY5NjhhYmMwNDZmNzliNzY2YzM4MWVmMDM4YmYiLCJwIjoiaiJ9

<br>

Description:
----------
Zebra Word Judge lets users check the validity of words played against a chosen lexicon during a game of scrabble, and can be enjoyed by not just those who play competitively but also by casual players.
<br>
<br>
Final Presentation link: https://docs.google.com/presentation/d/149Zw67ydC6_GvL3lUkf4wPDysPHDI1-TEyjD6o5o6HM/edit?usp=sharing
<br>
<br>
To create Zebra Word Judge for iOS we used React JS with Expo Go. Programming languages used was Javascript.

<br>

Code Dependencies and Versions:
----------
  "dependencies": {
    "@babel/runtime": "^7.19.0",
    "@fortawesome/fontawesome-svg-core": "^6.2.0",
    "@fortawesome/free-brands-svg-icons": "^6.2.0",
    "@fortawesome/free-regular-svg-icons": "^6.2.0",
    "@fortawesome/free-solid-svg-icons": "^6.2.0",
    "@fortawesome/react-native-fontawesome": "^0.3.0",
    "@react-native-material/core": "^1.3.7",
    "expo": "~45.0.0",
    "expo-av": "~11.2.3",
    "expo-sqlite": "~10.2.0",
    "expo-status-bar": "~1.3.0",
    "js-sha256": "^0.9.0",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-native": "0.68.2",
    "react-native-countdown-circle-timer": "^3.0.9",
    "react-native-modal": "^13.0.1",
    "react-native-svg": "12.3.0",
    "react-native-web": "0.17.7"
  },
  
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "react-native-svg-transformer": "^1.0.0"
  },

<br>

Installation:
----------
Prerequisites: An iOS device, Node.js, VSCode, Git, JDK latest version, NPM, Yarn, Expo Go (iOS Device) + all required software to install prerequisites.

1. On an iOS device, open the App Store and search for and download 'Expo Go'.
2. To run the app, please make sure ZebraWordJudge is somewhere in documents folder.
3. Open VSCode > Click File > Click open folder > Select ZebraWordJudge folder
4. In VSCode > Click terminial > Click new terminal
5. In VSCode > Write in the terminal and press **Enter** the following line - `npm install`
6. In VSCode > open the file AppEntry.js under ZebraWordJudge\node_modules\expo\AppEntry.js and replace the line `import App from '../../App';` with `import App from '../../src/App';`
7. In VSCode > Write in the terminal and press **Enter** the following line - `npm start`
8. The terminal may ask you if you want to install Expo/Metro (if it doesn't, skip this step), type in **y** and press **Enter**. If an error occurs with installing Expo, copy the provided command given in the output and paste it back into the terminal and press **Enter** to force install Expo. Then run `npm start` again.
9. Once the process has finished, scan the QR Code outputted using the iOS device's camera with Expo Go downloaded and tap on 'Open with Expo'.
<br>

Hosting Service:
----------
The app has not yet been deployed on the Apple App Store.

<br>

Conclusion:
----------
In the future, we would like to improve the UI by adding more animations and making it look more aesthetic without degrading the user experience and ease of use.
We would like to acknowledge the teaching staff and our client, Dylan for their guidance and support during this project.
