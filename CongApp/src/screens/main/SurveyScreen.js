import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../components/SearchBar';

import { getFirestore, collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import Firebase from '../../../config/firebase'

function SurveyScreen( {navigation} ) {

    const db = getFirestore(Firebase);
    const collectionRef = collection(db, 'surveys');
    const q = query(collectionRef, orderBy('name', 'desc'));

    const [term, setTerm] = useState('');

    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const [masterDataSource, setMasterDataSource] = useState([]);

    const search = () => {
        if (term) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = term.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredDataSource(newData);
        } else {
            setFilteredDataSource(masterDataSource);
        }
    }

    const debug = () => {
        console.log('collection: ' + collectionRef)
        console.log('data: ' + filteredDataSource)
        console.log('questions: ' + filteredDataSource.questions)
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(q, querySnapshot => {
            setFilteredDataSource(
                querySnapshot.docs.map(doc => ({
                    name: doc.data().name,
                    questions: doc.data().questions,
                }))
            );
            setMasterDataSource(
                querySnapshot.docs.map(doc => ({
                    name: doc.data().name,
                    questions: doc.data().questions,
                }))
            );
            console.log('collection: ' + collectionRef)
            console.log('data: ' + filteredDataSource)
            console.log('questions: ' + filteredDataSource.questions)
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={containerStyles.mainView}>
            <View style={containerStyles.searchView}>
                <SearchBar term={term} onTermChange={setTerm} onTermSubmit={search}/>
            </View>
            <View style={containerStyles.listView}>
                <FlatList
                    data={filteredDataSource}
                    renderItem={({ item }) => {
                        return (
                            <View style={containerStyles.buttonContainer}>

                                <View style={containerStyles.listTextContainer}>
                                    <Text style={textStyles.listText}>{item.name}</Text>
                                </View>

                                <View style={containerStyles.listButtonContainer}>
                                    <Pressable style={itemStyles.button} onPress={() => navigation.navigate('SurveyRedirect', { id: item.id, name: item.name, questions: item.questions })}>
                                        <Text style={textStyles.buttonText}>Go</Text>
                                        <Ionicons style={textStyles.arrow} name="arrow-forward-outline" size={22} color='#0f3022' />
                                    </Pressable>
                                </View>

                            </View>
                        )
                    }}
                    keyExtractor={(filteredDataSource) => Math.random()*1000}
                    showsVerticalScrollIndicator={true}
                />
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
        fontSize: 24,
        textAlign: 'center',
        marginVertical: '3%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-light',
    },
    listText: {
        fontSize: 27,
        marginVertical: '5%',
        marginLeft: '5%',
        fontFamily: 'Zag-Regular',
    },
    buttonText: {
        fontSize: 24,
        marginVertical: '5%',
        marginHorizontal: '7%',
        fontFamily: 'Zag-Regular',
        textAlignVertical: 'center',
    },
    arrow: {
        marginVertical: '5%',
        textAlignVertical: 'center',
    },
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#afd1f0',
    },
    listView: {
        height: '50%',
        flex: 1,
        margin: '2%',
        borderTopWidth: 3,
        borderColor: '#3e76a8',
    },
    buttonContainer: {
        width: '100%',
        height: 80,
        backgroundColor: '#8ac7ff',
        borderTopWidth: 1,
        borderColor: '#6da4d6',
        flexDirection: 'row',
    },
    listTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flex: 2,
    },
    listButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    searchView: {
        marginTop: '2%',
    }
});

const itemStyles = StyleSheet.create({
    button: {
        width: '70%',
        height: '80%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#0f3022',
        marginRight: '5%',
    },
    list: {
        borderWidth: 1,
    },
});

export default SurveyScreen;