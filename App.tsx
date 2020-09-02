import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthFlowNavigator from './src/navigators/AuthFlowNavigator';
import * as firebase from 'firebase';



var firebaseConfig = {
    apiKey: "AIzaSyBxdWdasp6_OWDSCCbfifW45H0pkMR7r60",
    authDomain: "we-the-people-e376e.firebaseapp.com",
    databaseURL: "https://we-the-people-e376e.firebaseio.com",
    projectId: "we-the-people-e376e",
    storageBucket: "we-the-people-e376e.appspot.com",
    messagingSenderId: "854505201043",
    appId: "1:854505201043:web:b4d82e674ba314be30dc66"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  

export default function App() {
    return (
    
        <NavigationContainer>
            <AuthFlowNavigator />
        </NavigationContainer>
    );
}