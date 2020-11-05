import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {TabsConfigsType} from 'curved-bottom-navigation-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Home from '../../screens/HomeScreen';
import Profile from '../../screens/ProfileScreen';
import Data from '../../screens/DataScreen';

//main page bottom nav setup
const tabs: TabsConfigsType = {
    Home: {
        icon: ({ progress }) => <Ionicons name={'md-home'} size={24}/>
    },
    Data: {
      icon: ({ progress }) => <Ionicons name={'md-pie'} size={24}/>
  },
    Profile: {
        icon: ({ progress }) => <Ionicons name={'md-settings'} size={24}/>
    },
}
 
const Tab = createBottomTabNavigator();

export default function Main() {
    return (
      
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={styles.safe}> 
        <Text style={[styles.heading]}>We The People</Text>
        </SafeAreaView>
      <Tab.Navigator
        tabBar={props => (
          <AnimatedTabBar tabs={tabs} {...props} barColor='#d00909'/>
        )}
      >
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="Data"
          component={Data}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
        />
        </Tab.Navigator>   
        
    </SafeAreaProvider>

 )
}

const styles = StyleSheet.create({
  heading: {
      paddingTop: 40,
      textAlign: 'center',
      fontFamily: 'alex-brush',
      fontSize: 40,
      backgroundColor: '#ffffff',
  },
  safe: {
    color: 'black',
    backgroundColor: 'white',


  }
})