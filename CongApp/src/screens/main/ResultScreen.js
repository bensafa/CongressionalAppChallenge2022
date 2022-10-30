//(DEMO) This screen is currently only for use of the Cold, Covid, Flu, or Allergies survey

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Firebase from '../../../config/firebase'
import { AuthenticatedUserContext } from '../../../navigation/AuthenticatedUserProvider';
import { getFirestore, getDoc, doc } from "firebase/firestore";

function ResultScreen({ navigation, route: { params } }) {

    const { checkedArr } = params;

    const { user } = useContext(AuthenticatedUserContext);
    const db = getFirestore(Firebase);
    const docRef = doc(db, 'patients', user.uid);

    const [ dummyMap, setDummyMap ] = useState([
        {id: 0, condition: 'Allergies', probability: ''},
        {id: 1, condition: 'A Cold', probability: ''},
        {id: 2, condition: 'COVID', probability: ''},
        {id: 3, condition: 'The Flu', probability: ''}
    ]);

    const [ sickMap, setSickMap ] = useState([
        {id: 0, condition: '...', probability: ''},
        {id: 1, condition: '...', probability: ''},
        {id: 2, condition: '...', probability: ''},
        {id: 3, condition: '...', probability: ''},
    ]);

    const [ fetchURL, setFetchURL ] = useState('https://us-east4-orbital-ethos-366920.cloudfunctions.net/ccfa');
    const http = async () => {
        try {
            const response = await fetch(fetchURL, { 
                method: 'POST', 
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }), 
                body: JSON.stringify({
                    "results": checkedArr,
                })
            });
            //setResult(await response.json());
            let json = await response.json();
            let jsonArray = json.output[0]
            let sickMapCopy = dummyMap.map(({id, condition, probability}) => ({id, condition, probability: jsonArray[id]}));
            console.log('sickmapcopy:', sickMapCopy);

            const jsonSorted = [...sickMapCopy].sort((a, b) => b.probability - a.probability);
            console.log('sorted json:', jsonSorted);
            setSickMap(jsonSorted);

            //console.log('json:', json);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect (() => {
        http();
    }, []);

    return (
        <View style={containerStyles.mainView}>
            <Image style={textStyles.image} source={require('../../../assets/CongAppLogo.png')}/>
            <View style={containerStyles.miniView}>
                <Text style={textStyles.titleText}>Results:</Text>
                <Text style={textStyles.bodyText}>You most likely have:</Text>
                <Text style={textStyles.resultText}>{sickMap[0].condition}!</Text>
            </View>
            <Pressable style={textStyles.back} onPress={() => navigation.goBack()}>
                <Ionicons style={textStyles.arrow} name='arrow-back-outline' color='black'/>
            </Pressable>
        </View>
    );
}

const textStyles = StyleSheet.create({
    titleText: {
        fontSize: 34,
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-medium',
    },
    resultText: {
        fontSize: 50,
        textAlign: 'center',
        marginTop: '20%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-medium',
    },
    arrow: {
        marginVertical: '10%',
        marginLeft: '13%',
        textAlignVertical: 'center',
        fontSize: 37,
    },
    bodyText: {
        fontSize: 21,
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-light',
    },
    back: {
        position: 'absolute',
    },
    image: {
        width: null,
        height: null,
        aspectRatio: 1,
        flex: 2,
        alignSelf: 'center',
        marginTop: '5%',
        marginLeft: '5%',
    }
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3f80ab',
    },
    miniView: {
        marginVertical: '8%',
        marginBottom: '26%',
        backgroundColor: 'white',
        marginHorizontal: '3%',
        borderWidth: 3,
        borderRadius: 15,
        flex: 5,
    },
});

export default ResultScreen;