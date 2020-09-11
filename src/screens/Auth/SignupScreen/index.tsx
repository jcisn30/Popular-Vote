import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AppScreens, AuthStackParamList } from '../../../navigators/AuthFlowNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import {firebase} from '../../../firebase/config';
import { Ionicons } from '@expo/vector-icons';


type SignupScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Signup>;
export type SignupParams = {
    username: string;
};
interface SignupScreenProps {
    route: { params: SignupParams };
    navigation: SignupScreenNavigationProps;
}
const styles = StyleSheet.create({
    btnLoginContainer: {
        alignSelf: 'center',
        marginTop: 0,
        marginBottom: 80
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 0,
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
    image: {
        width: 250,
      height: 250,
      marginBottom: 40
    },
    signUp: {
      padding: 0,
      alignItems: 'center',
      height: 0,
      marginTop: 60
    },
    txtSignupScreen: {
        fontSize: 30
    },
    txtSignupScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 90,
        width: '70%',
    },
    txtUsername: {
        fontSize: 25,
        color: 'grey'
    },
    txtSignUp: {
        fontSize: 30,
        top: 0
    },
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 4,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        
    },
    textInputContainer: {
        width: '100%',
        marginTop: 0
    },
    SignUpText: {
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    OptionText: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    }
});
const SignupScreen: React.FunctionComponent<SignupScreenProps> = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const { email, password } = params;
    const back = () => navigation.navigate(AppScreens.Welcome);

    

    const SignUp = (email: string, password: string) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(() => navigation.navigate(AppScreens.Main))
            .catch((error: any) => {   
              Alert.alert('Oops! Something went awry, try re-entering your email and password');
           })
         }catch(err){
            alert(err);
         }
         try {
             const user = firebase.auth().currentUser;
             if (user != null) {
             user.updateProfile({
                displayName: username,
                photoURL: "https://i.stack.imgur.com/l60Hf.png",
              }).then(function() {
                // Update successful.
              }).catch(function(error) {
                // An error happened.
              });}
         }
         catch(err){
            alert(err);
         
        }
        }


    

return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
             <TouchableOpacity style={styles.btnClose}  onPress={back}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <View style={styles.signUp}>
            <Image source={require('../../../../assets/logo-2.png')} style={styles.image} />
            {/* <Text style={styles.txtSignUp}>Sign Up</Text> */}
            </View>

            <View style={styles.txtSignupScreenContainer}>
            <TextInput
                    value={username}
                    placeholder="user name"
                    style={styles.textInput}
                    onChangeText={(text) => setUserName(text)}
                />
            <TextInput
                    value={email}
                    placeholder="email address"
                    style={styles.textInput}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput value={password} placeholder="password" secureTextEntry={true} style={styles.textInput}  onChangeText={(text) => setPassword(text)} />
                <Text style={styles.button} onPress={() => SignUp(email, password)}>Sign Up</Text>
            </View>

            <View style={styles.btnLoginContainer}>
                {/* <Text style={styles.SignUpText}>have an account?</Text> */}
                <Text style={styles.OptionText} onPress={() => navigation.navigate(AppScreens.Login)}>Login</Text>
                {/* <Text>or just give your free opinion</Text> */}
                <Text style={styles.OptionText} onPress={() => navigation.navigate(AppScreens.Main)}>Share your voice</Text>
            </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    );
};
export default SignupScreen;