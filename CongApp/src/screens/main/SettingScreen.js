import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { styles } from 'styled-system';

import Firebase from '../../../config/firebase'
import { AuthenticatedUserContext } from '../../../navigation/AuthenticatedUserProvider';
import { getFirestore, getDoc, doc } from "firebase/firestore";

const auth = Firebase.auth();

function SettingScreen() {

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
        }
    };

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
    }, []);

    return (
        <View style={containerStyles.mainView}>
            <View style={containerStyles.profileView}>
                <View style={containerStyles.imageView}>
                    <Image
                        style={textStyles.image}
                        source={require('../../../assets/profile.png')}
                    />
                </View>
                <View style={containerStyles.infoView}>
                    <Text style={textStyles.profileText}>{fName} {lName}</Text>
                </View>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={() => {}}>
                    <Text style={textStyles.bodyText}>Account Info</Text>
                </Pressable>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={() => {}}>
                    <Text style={textStyles.bodyText}>Preferences</Text>
                </Pressable>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={() => {}}>
                    <Text style={textStyles.bodyText}>About</Text>
                </Pressable>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={() => {}}>
                    <Text style={textStyles.bodyText}></Text>
                </Pressable>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={() => {}}>
                    <Text style={textStyles.bodyText}></Text>
                </Pressable>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={() => {}}>
                    <Text style={textStyles.bodyText}></Text>
                </Pressable>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={() => {}}>
                    <Text style={textStyles.bodyText}></Text>
                </Pressable>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={() => {}}>
                    <Text style={textStyles.bodyText}></Text>
                </Pressable>
            </View>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={handleSignOut}>
                    <Text style={textStyles.logOutText}>Log Out</Text>
                </Pressable>
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
        marginHorizontal: '7%',
        fontFamily: 'sans-serif',
    },
    logOutText: {
        fontSize: 21,
        textAlign: 'center',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif',
        color: 'red',
    },
    profileText: {
        marginTop: '13%',
        fontSize: 31,
        marginHorizontal: '12%',
        fontFamily: 'sans-serif',
    },
    image: {
        height: null,
        width: null,
        aspectRatio: 1,
        flex: 1,
        alignSelf: 'center',
        margin: '5%',
    }
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#afd1f0',
    },
    buttonContainer: {
        height: '9.1%',
        width: '100%',
        backgroundColor: 'white',
    },
    profileView: {
        flexDirection: 'row',
        height: '18%',
        width: '100%',
        backgroundColor: '#afd1f0',
        borderBottomWidth: 2,
    },
    infoView: {
        flex: 3,
    },
    imageView: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 40,
        margin: '3%',
    }
});

const itemStyles = StyleSheet.create({
    button: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 2,
        alignItems: 'center',
    }
});

export default SettingScreen;