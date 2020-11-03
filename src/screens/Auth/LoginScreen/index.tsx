import React, { useState, FormEvent, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TextInput, Alert, Button, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AppScreens, AuthStackParamList } from '../../../navigators/AuthFlowNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { signin, setError, sendPasswordResetEmail } from '../../../store/actions/authActions';
import { RootState } from '../../../store';
import firebase from '../../../firebase/config';

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
    txtLoginScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 90,
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
        padding: 10,
        width: '100%',
    },
    textInputContainer: {
        width: '100%',
        marginTop: 200
    },
    button: {
        marginTop: 10,
        borderColor: '#d00909',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    txtLogin: {
        fontSize: 30,
        top: 0
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
const LoginScreen: React.FunctionComponent<LoginScreenProps> = (props) => {
  //login props, state, variables, dispatch, use selector
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);
  const back = () => navigation.navigate(AppScreens.Welcome);

  //dispatch error
    useEffect(() => {
        return () => {
          if(error) {
            dispatch(setError(''));
          }
        }
      }, [error, dispatch]);

      //submit handler for user login via firebase
      const submitHandler = (email: string, password: string) => {
        if(error) {
          dispatch(setError(''));
        }
        setLoading(true);
        dispatch(signin({ email, password }, () => setLoading(false)));
      }

      //check to see if user is signed in, if so head to main page
      function checkSignIn(){
        firebase.auth().onAuthStateChanged(function(user) {
           if (user) {
              navigation.navigate("Main")
            //   console.log(user);
           } else {
          }
     })
   }

   // old login call
    // const Login = (email: string, password: string) => {
    //     try {
    //       firebase
    //          .auth()
    //          .signInWithEmailAndPassword(email, password)
    //          .then(() => navigation.navigate(AppScreens.Main))
    //         .catch((error: any) => {   
    //           Alert.alert('Oops! Something went awry, try re-entering your email and password');
    //        })
    //      }catch(err){
    //         alert(err);
    //      }
    //     }

return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
           {/* back x button */}
            <TouchableOpacity style={styles.btnClose}  onPress={back}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <View style={styles.login}>
            <Image source={require('../../../../assets/logo-2.png')} style={styles.image} />
            {/* <Text style={styles.txtLogin}>Login</Text> */}
            </View>

            {/*login form*/}
            <View style={styles.txtLoginScreenContainer} >
            <Text style={styles.txtError}>{error}</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email address"
                    style={styles.textInput}
                />
                <TextInput value={password} placeholder="password" secureTextEntry={true} style={styles.textInput}  onChangeText={(text) => setPassword(text)} />
                <Text style={styles.button} onPress={() => {submitHandler(email, password); checkSignIn()}}>Login</Text>
            </View>
           
            {/*signup or go to main page to voice free opinion*/}
            <View style={styles.btnSignupContainer}>
                {/* <Text>Or</Text> */}
                <Text style={styles.OptionText} onPress={() => navigation.navigate(AppScreens.Signup, { email})}>Signup</Text>
                {/* <Text>or just give your free opinion</Text> */}
                <Text style={styles.OptionText} onPress={() => navigation.navigate(AppScreens.Main)}>Share your voice</Text>
            </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    );
};
export default LoginScreen;