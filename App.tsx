import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthFlowNavigator from './src/navigators/AuthFlowNavigator';
import { Provider } from 'react-redux';
import store from './src/store';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';



// custom fonts
const fetchFonts = () => {
    return Font.loadAsync({
    'alex-brush': require('./assets/fonts/AlexBrush-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
    });
    };



export default function App() {
    
    //load fonts before app loads
    const [dataLoaded, setDataLoading] = useState(false);
    if (!dataLoaded){
        return (
            <AppLoading startAsync={fetchFonts} onFinish={()=> setDataLoading(true)} />
        )
    }
    return (
        <Provider store={store}>
        <NavigationContainer>
            <AuthFlowNavigator />
        </NavigationContainer>
        </Provider>
    );
}