import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {TabsConfigsType} from 'curved-bottom-navigation-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Home from '../../screens/HomeScreen';
import Profile from '../../screens/ProfileScreen';
import Data from '../../screens/DataScreen';



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