import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { IconButton } from '../../components';
import Firebase from '../../../config/firebase'
import { AuthenticatedUserContext } from '../../../navigation/AuthenticatedUserProvider';
import { getFirestore, getDoc, doc } from "firebase/firestore";

const auth = Firebase.auth();

function HomeScreen() {

    const { user } = useContext(AuthenticatedUserContext);
    const db = getFirestore(Firebase);
    const docRef = doc(db, 'users', user.uid);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');

    useEffect (() => {
        getDoc(docRef).then(docSnap => {
            console.log("Document data:", docSnap.data());
            setFName(docSnap.data().firstName);
            setLName(docSnap.data().lastName);
        }).catch((e) => {
            console.log('Error:',e)
        });
    });

    return (
        <View style={containerStyles.mainView}>
            <View style={containerStyles.miniView}>
                <Text style={textStyles.titleText}>Welcome to your dashboard,</Text>
                <Text style={textStyles.titleText}>{fName} {lName}!</Text>
                <Text style={textStyles.bodyText}>Here, info and reminders are readily available for you.</Text>
            </View>
        </View>
    );
}

const textStyles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '5%',
    },
    bodyText: {
        fontSize: 19,
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '7%',
    },
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
    },
    miniView: {
        marginBottom: '5%',
    },
});

export default HomeScreen;