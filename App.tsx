import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthFlowNavigator from './src/navigators/AuthFlowNavigator';
import { Provider } from 'react-redux';
import store from './src/store'






export default function App() {
    
    return (
        <Provider store={store}>
        <NavigationContainer>
            <AuthFlowNavigator />
        </NavigationContainer>
        </Provider>
    );
}