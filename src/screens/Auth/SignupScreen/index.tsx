import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AppScreens, AuthStackParamList } from '../../../navigators/AuthFlowNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { signup, setError } from '../../../store/actions/authActions';
import { RootState } from '../../../store';
import firebase from '../../../firebase/config';



type SignupScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Signup>;
export type SignupParams = {
    email: string;
    
};
interface SignupScreenProps {
    route: { params: SignupParams };
    navigation: SignupScreenNavigationProps;
    
}
const styles = StyleSheet.create({
    btnLoginContainer: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 200
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
        marginLeft: 30,
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
        marginTop: 200,
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
        padding: 12,
        fontSize:18,
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
        borderColor: '#d00909',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    OptionText: {
        color: '#d00909',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    txtError: {
        color: '#d00909',
        marginTop: 15,
        marginBottom: 10
    }
});
const SignupScreen: React.FunctionComponent<SignupScreenProps> = (props) => {
    
    
    const { navigation, route} = props;
    const { params } = route;
    // const [username, setUserName] = useState<string>('');
    // const [email, setEmail] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    // const { email, password } = params;
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);
    const back = () => navigation.navigate(AppScreens.Welcome);


    useEffect(() => {
        return () => {
          if(error) {
            dispatch(setError(''));
           
          }
          
        }
      }, [error, dispatch]);
    
      const submitHandler = ( email: string, password: string) => {
        if(error) {
          dispatch(setError(''));
        
        }
         else {
        
        setLoading(true);
        dispatch(signup({ email, password, firstName }, () => setLoading(false)));
        
    
        }
      }
   
      function checkSignIn(){
        firebase.auth().onAuthStateChanged(function(user) {
           if (user) {
              navigation.navigate("Main")
            //   console.log(user);
           } else {
              
          }
     })
   }

    // const SignUp = (email: string, password: string) => {
    //     try {
    //         firebase.auth().createUserWithEmailAndPassword(email,password)
    //         .then(() => navigation.navigate(AppScreens.Main))
    //         .catch((error: any) => {   
    //           Alert.alert('Oops! Something went awry, try re-entering your email and password');
    //        })
    //      }catch(err){
    //         alert(err);
    //      }
    //      try {
    //          const user = firebase.auth().currentUser;
    //          if (user != null) {
    //          user.updateProfile({
    //             displayName: username,
    //             photoURL: "https://i.stack.imgur.com/l60Hf.png",
    //           }).then(function() {
    //             // Update successful.
    //           }).catch(function(error:any) {
    //             // An error happened.
    //           });}
    //      }
    //      catch(err){
    //         alert(err);
         
    //     }
    //     }


    

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
            <Text style={styles.txtError}>{error}</Text>
            <TextInput
                    value={firstName}
                    placeholder="first name"
                    style={styles.textInput}
                    onChangeText={(text) => setFirstName(text)}
                />
            <TextInput
                    value={email}
                    placeholder="email address"
                    style={styles.textInput}
                    onChangeText={(text) => setEmail(text)}
                />
                
				

<TextInput value={password} placeholder="password" secureTextEntry={true} style={styles.textInput}  onChangeText={(text) => setPassword(text)} />
                
                
                <Text style={styles.button} onPress={() => {submitHandler( email, password); checkSignIn()}}>Sign Up</Text>
            </View>

            <View style={styles.btnLoginContainer}>
                {/* <Text style={styles.SignUpText}>have an account?</Text> */}
                <Text style={styles.OptionText} onPress={() => navigation.navigate(AppScreens.Login)}>Login</Text>
                {/* <Text>or just give your free opinion</Text> */}
                {/* <Text style={styles.OptionText} onPress={() => navigation.navigate(AppScreens.Main)}>Share your voice</Text> */}
            </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    );
};
export default SignupScreen;