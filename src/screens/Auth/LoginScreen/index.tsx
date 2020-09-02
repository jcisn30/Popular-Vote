import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AppScreens, AuthStackParamList } from '../../../navigators/AuthFlowNavigator';

import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
type LoginScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Login>;
interface LoginScreenProps {
    navigation: LoginScreenNavigationProps;
}
const styles = StyleSheet.create({
    btnSignupContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 120
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 10,
        backgroundColor: '#ffffff'
    },
    btnClose: {
      alignSelf: 'flex-start',
      marginLeft: 20,
      marginBottom: 0
    },
    closeText: {
        fontSize: 24,
    },
    txtLoginScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        width: '70%',
    },
    image: {
        width: 250,
      height: 250,
      marginBottom: 40
    },
    login: {
      padding: 0,
      alignItems: 'center',
      height: 0,
      marginTop: 60
    },
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 4,
        marginBottom: 10,
        padding: 20,
        width: '100%',
    },
    textInputContainer: {
        width: '100%',
        marginTop: 200
    },
    button: {
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    txtLogin: {
        fontSize: 30,
        top: 0
    },
    OptionText: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    }
});
const LoginScreen: React.FunctionComponent<LoginScreenProps> = (props) => {
    const { navigation } = props;
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const back = () => navigation.navigate(AppScreens.Welcome);
    
    

    const Login = (email: string, password: string) => {
        try {
          firebase
             .auth()
             .signInWithEmailAndPassword(email, password)
             .then(() => navigation.navigate(AppScreens.Main))
            .catch(error => {   
              alert('Oops! Something went awry, try re-entering your email and password');
           })
         }catch(err){
            alert(err);
         }
        }

return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
           
            <TouchableOpacity style={styles.btnClose}  onPress={back}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <View style={styles.login}>
            <Image source={require('../../../../assets/logo-2.png')} style={styles.image} />
            {/* <Text style={styles.txtLogin}>Login</Text> */}
            </View>

            
            <View style={styles.txtLoginScreenContainer} >
                <TextInput
                    value={username}
                    placeholder="username"
                    style={styles.textInput}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput value={password} placeholder="password" secureTextEntry={true} style={styles.textInput}  onChangeText={(text) => setPassword(text)} />
                <Text style={styles.button} onPress={() => Login(username, password)}>Login</Text>
            </View>
           
            
            <View style={styles.btnSignupContainer}>
                {/* <Text>Or</Text> */}
                <Text style={styles.OptionText} onPress={() => navigation.navigate(AppScreens.Signup, { username })}>Signup</Text>
                <Text>or just give your free opinion</Text>
                <Text style={styles.OptionText} onPress={() => navigation.navigate(AppScreens.Main)}>Home</Text>
            </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    );
};
export default LoginScreen;