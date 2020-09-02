import React, { FunctionComponent }  from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../screens/WelcomeScreen';
import LoginScreen from '../../screens/Auth/LoginScreen';
import Main from '../../screens/MainScreen';
import SignupScreen, { SignupParams } from '../../screens/Auth/SignupScreen';


//name constants for nav screens
export enum AppScreens {
    Welcome = 'Welcome',
    Login = 'Login',
    Signup = 'Signup',
    Main = 'Main'
}

//parameters for nav screens
export type AuthStackParamList = {
    Login: undefined;
    Signup: SignupParams;
    Welcome: undefined;
    Main: undefined;
};

//create navigation and export it
const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthFlowNavigator: FunctionComponent = () => {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name={AppScreens.Welcome} component={WelcomeScreen} />
            <AuthStack.Screen name={AppScreens.Login} component={LoginScreen} />
            <AuthStack.Screen name={AppScreens.Signup} component={SignupScreen} />
            <AuthStack.Screen name={AppScreens.Main} component={Main} />
        </AuthStack.Navigator>
    );
};
export default AuthFlowNavigator;