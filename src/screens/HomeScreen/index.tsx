import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux'
// import {firebase} from '../../firebase/config';

export type MainParams = {
    username: string;
};







const Home = () => {
    
    // var user = firebase.auth().currentUser
    
    return (
        <View style={[styles.body]}>
        <Text></Text>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
    }
})