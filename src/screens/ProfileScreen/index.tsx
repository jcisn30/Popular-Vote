import React, { FC } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppScreens } from '../../navigators/AuthFlowNavigator';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';
import { Updates } from 'expo';

const Profile: FC = () => {
    //dispatch
    const dispatch = useDispatch();
    //user root state
    const { authenticated, user } = useSelector((state: RootState) => state.auth);
    //logout click handler
    
    const logoutClickHandler = () => {
        dispatch(signout());
        Updates.reload();

      }

    return (
        //profile page view
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.body]}>
            <Text style={styles.userText}>Hello {user?.firstName}</Text>
            <View style={styles.btnSignoutContainer}>
            <Text style={styles.button} onPress={() => logoutClickHandler()}>Sign out</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default Profile

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
    },
    btnSignoutContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 120
    },
    button: {
        marginTop: 10,
        borderColor: '#d00909',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    userText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    }
})