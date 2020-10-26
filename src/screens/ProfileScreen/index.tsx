import React, { FC } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';

const Profile: FC = () => {
    const dispatch = useDispatch();
    const { authenticated, user } = useSelector((state: RootState) => state.auth);
    const logoutClickHandler = () => {
        dispatch(signout());
      }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.body]}>
            <Text style={styles.userText}>Hello {user?.firstName}</Text>
            <View style={styles.btnSignoutContainer}>
            <Text style={styles.button} onPress={() =>  logoutClickHandler()}>Sign out</Text>
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