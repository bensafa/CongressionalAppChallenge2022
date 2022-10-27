import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthenticatedUserContext } from '../../../navigation/AuthenticatedUserProvider';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, orderBy, query, addDoc, onSnapshot, getDoc, doc } from 'firebase/firestore';
import Firebase from '../../../config/firebase'

function IMScreen({ navigation, route: { params } }) {
    
    const { firstName, lastName } = params;

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')

    const [messages, setMessages] = useState([]);

    const { user } = useContext(AuthenticatedUserContext);

    const db = getFirestore(Firebase);
    const chatKey = firstName + lastName
    const collectionRef = collection(db, chatKey);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const docRef = doc(db, 'patients', user.uid);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            );
            console.log('messages:', messages);
        });

        getDoc(docRef).then(docSnap => {
            console.log("Document data:", docSnap.data());
            setFName(docSnap.data().firstName);
            setLName(docSnap.data().lastName);
        }).catch((e) => {
            console.log('Error:',e)
        });

        return () => unsubscribe();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, chatKey), {
            _id,
            createdAt,
            text,
            user,
        });
    }, []);

    return (
        <View style={containerStyles.mainView}>
            <View style={containerStyles.titleView}>
                <Text style={textStyles.titleText}>Dr. {firstName} {lastName}</Text>
            </View>
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    avatar: 'https://i.pravatar.cc/300',
                }}
            />
            <Pressable style={textStyles.back} onPress={() => navigation.goBack()}>
                <Ionicons style={textStyles.bodyText} name='arrow-back-outline' color='black'/>
            </Pressable>
        </View>
    );
    console.log('messages:', messages);
}

const textStyles = StyleSheet.create({
    titleText: {
        fontSize: 32,
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
    },
    bodyText: {
        fontSize: 37,
        fontFamily: 'sans-serif-light',
    },
    back: {
        position: 'absolute',
    },
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    titleView: {
        backgroundcolor: '#f2f2f2',
        flexDirection: 'row',
        borderBottomWidth: 2,
        justifyContent: 'center',
    },
});

export default IMScreen;