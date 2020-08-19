import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, Image, TouchableOpacity } from 'react-native';
import { AppScreens, AuthStackParamList } from '../../../navigators/AuthFlowNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
type LoginScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Login>;
interface LoginScreenProps {
    navigation: LoginScreenNavigationProps;
}
const styles = StyleSheet.create({
    btnSignupContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 10,
        backgroundColor: '#ffffff'
    },
    btnClose: {
      alignSelf: 'flex-end',
      marginRight: 40,
      marginBottom: 0
    },
    closeText: {
        fontSize: 24,
        
    },
    image: {
        width: 150,
      height: 150,
      marginBottom: 40
    },
    login: {
      padding: 0,
      alignItems: 'center',
      height: 40,
      marginTop: 80
    },
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 4,
        padding: 12,
        width: '100%'
    },
    textInputContainer: {
        width: '100%',
        marginTop: 200
    },
    txtLogin: {
        fontSize: 30,
        top: 0
    }
});
const LoginScreen: React.FunctionComponent<LoginScreenProps> = (props) => {
    const { navigation } = props;
    const [username, setUsername] = useState<string>('');
    const onPress = () => navigation.navigate(AppScreens.Welcome)
return (
        <SafeAreaView style={styles.container} >
           
            <TouchableOpacity style={styles.btnClose}  onPress={onPress}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <View style={styles.login}>
            <Image source={require('../../../../assets/logo-2.png')} style={styles.image} />
            <Text style={styles.txtLogin}>Login</Text>
            </View>

            <View style={styles.textInputContainer} >
                <TextInput
                    value={username}
                    placeholder="username"
                    style={styles.textInput}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput placeholder="password" secureTextEntry={true} style={styles.textInput} />
            </View>
            <View style={styles.btnSignupContainer}>
                <Text>Or</Text>
                <Button title="Signup" onPress={() => navigation.navigate(AppScreens.Signup, { username })} />
            </View>
        </SafeAreaView>
    );
};
export default LoginScreen;