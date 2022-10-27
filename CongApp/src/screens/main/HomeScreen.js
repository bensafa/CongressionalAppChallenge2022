import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import Firebase from '../../../config/firebase'
import { AuthenticatedUserContext } from '../../../navigation/AuthenticatedUserProvider';
import { getFirestore, getDoc, doc } from "firebase/firestore";

const auth = Firebase.auth();

function HomeScreen() {

    const { user } = useContext(AuthenticatedUserContext);
    const db = getFirestore(Firebase);
    const docRef = doc(db, 'patients', user.uid);
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
                <Text style={textStyles.titleText}>Welcome to your home page,</Text>
                <Text style={textStyles.titleText}>{fName} {lName}!</Text>
                <Text style={textStyles.bodyText}>Here, you can find helpful tips for navigating around the app. Click on the ⓘ icons below for info!</Text>
                <View style={containerStyles.infoView}>
                    <Pressable style={containerStyles.iButton}>
                        <Text style={textStyles.iText}>ⓘ</Text>
                    </Pressable>
                    <Pressable style={containerStyles.iButton}>
                        <Text style={textStyles.iText}>ⓘ</Text>
                    </Pressable>
                    <Pressable style={containerStyles.iButton}>
                        <Text style={textStyles.iText}>ⓘ</Text>
                    </Pressable>
                    <Pressable style={containerStyles.iButton}>
                        <Text style={textStyles.iText}>ⓘ</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const textStyles = StyleSheet.create({
    titleText: {
        fontSize: 34,
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-light',
    },
    bodyText: {
        fontSize: 21,
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-light',
    },
    iText: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'sans-serif-light',
    },
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
    },
    miniView: {
        marginBottom: '5%',
        marginTop: '30%',
    },
    infoView: {
        flexDirection: 'row',
        marginTop: '60%',
    },
    iButton: {
        flex: 1,
    },
});

export default HomeScreen;