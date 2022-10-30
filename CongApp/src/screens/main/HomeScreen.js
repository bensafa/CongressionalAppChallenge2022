import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

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
    const [info, setInfo] = useState('');

    useEffect (() => {
        getDoc(docRef).then(docSnap => {
            console.log("Document data:", docSnap.data());
            setFName(docSnap.data().firstName);
            setLName(docSnap.data().lastName);
        }).catch((e) => {
            console.log('Error:',e)
        });
        setInfo('');
    }, []);

    return (
        <View style={containerStyles.mainView}>
            <View style={containerStyles.miniView}>
                <View style={containerStyles.logoView}>
                    <Image style={textStyles.image} source={require('../../../assets/CongAppSplash.png')}/>
                </View>
                <View style={containerStyles.titleView}>
                    <Text style={textStyles.titleText}>Welcome to your home page,</Text>
                    <Text style={textStyles.titleText}>{fName} {lName}!</Text>
                    <Text style={textStyles.bodyText}>Here, you can find helpful tips for navigating around the app. Click on the ⓘ icons below for info!</Text>
                </View>
                <View style={containerStyles.iView}>
                    <Text style={textStyles.bodyText}>{info}</Text>
                </View>
                <View style={containerStyles.infoView}>
                    <Pressable style={containerStyles.iButton} onPress={() => {setInfo('This is the home page. You are currently here! Navigate back here if you ever need info on the other screens.')}}>
                        <Text style={textStyles.iText}>ⓘ</Text>
                    </Pressable>
                    <Pressable style={containerStyles.iButton} onPress={() => {setInfo('This is the surveys screen. Here, you may find a vast array of surveys that can diagnose you with various diseases and conditions.')}}>
                        <Text style={textStyles.iText}>ⓘ</Text>
                    </Pressable>
                    <Pressable style={containerStyles.iButton} onPress={() => {setInfo('This is the communications screen. Here, you may use the various chatrooms to communicate with medical professionals.')}}>
                        <Text style={textStyles.iText}>ⓘ</Text>
                    </Pressable>
                    <Pressable style={containerStyles.iButton} onPress={() => {setInfo('This is the settings screen. Here, you may manage your account.')}}>
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
        marginTop: '6%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-medium',
    },
    bodyText: {
        fontSize: 21,
        textAlign: 'center',
        marginTop: '7%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-light',
    },
    iText: {
        fontSize: 28,
        textAlign: 'center',
        fontFamily: 'sans-serif-light',
    },
    image: {
        width: null,
        height: null,
        aspectRatio: 13/4,
    }
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#afd1f0',
    },
    miniView: {
        flexDirection: 'column',
        flex: 1,
    },
    titleView: {
        flex: 10,
        backgroundColor: 'white',
        borderWidth: 3,
        marginHorizontal: '2%',
        borderRadius: 15,
    },
    infoView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        flex: 1.5,
    },
    iButton: {
        flex: 1,
    },
    logoView: {
        flex: 4.5,
        marginTop: '5%',
    },
    iView: {
        flex: 5.5,
    }
});

export default HomeScreen;