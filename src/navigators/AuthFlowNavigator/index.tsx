import React, { FunctionComponent, useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import {decode, encode} from 'base-64';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../screens/WelcomeScreen';
import LoginScreen from '../../screens/Auth/LoginScreen';
import Main from '../../screens/MainScreen';
import SignupScreen, { SignupParams } from '../../screens/Auth/SignupScreen';
import { MainParams } from '../../screens/HomeScreen';
import { getUserById, setLoading, setNeedVerification } from '../../store/actions/authActions';
import { RootState } from '../../store';
import firebase from '../../firebase/config';



if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

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
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);

    // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if(user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if(!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

//   if(loading) {
//     return <Loader />;
//   }

    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name={AppScreens.Welcome} component={WelcomeScreen} />
            <AuthStack.Screen name={AppScreens.Login} component={LoginScreen} />
            <AuthStack.Screen name={AppScreens.Signup} component={SignupScreen} />
            <AuthStack.Screen name={AppScreens.Main} component={Main} options={{gestureEnabled: false}}  />
        </AuthStack.Navigator>
    );
};
export default AuthFlowNavigator;