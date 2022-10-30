import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from "expo-checkbox";

import { getFirestore, getDoc, doc } from 'firebase/firestore';
import Firebase from '../../../config/firebase'

function SurveyRedirectScreen ({ navigation, route: { params } }) {

    const { id, name, questions } = params;

    const [dummyQuestions, setDummyQuestions] = useState(questions);

    // useEffect(() => {
    //     // for(let item of questions) {
    //     //     console.log("item:", item);
    //     //     setCheckedArr(checkedArr.concat(item.checked));
    //     // }
    //     // console.log('checked array:', checkedArr);
    // }, [checkedArr])

    const [results, setResults] = useState([]);

    const db = getFirestore(Firebase);
    const docRef = doc(db, 'surveys', name);

    const check = (item, index) => {
        const newData = [...dummyQuestions];
        newData[index].checked = !item.checked;
        setDummyQuestions(newData);
        //console.log("newdata: ", newData);
        // console.log("checked array", checkedArr);
        // let list = checkedArr;
        // console.log("index:", index);
        // console.log("list before set:", list);
        // list[index] = !list[index];
        // console.log("list after set:", list);
        // setCheckedArr(list);
    }

    const submit = () => {
        let checkedArr = dummyQuestions.map(x => x.checked);
        console.log('checkedArr:', checkedArr);
        navigation.navigate('Result', { checkedArr: checkedArr });
    }

    return (
        <View style={containerStyles.mainView}>
            <View style={containerStyles.titleView}>
                <Text style={textStyles.titleText}>{name}</Text>
            </View>
            <FlatList
                keyExtractor={(item) => item.question}
                data={dummyQuestions}
                horizontal={false}
                ListFooterComponent={
                    <View style={containerStyles.submitView}>
                        <Pressable onPress={() => submit()}>
                            <Text style={textStyles.submit}>Submit</Text>
                        </Pressable>
                    </View>
                }
                renderItem={({ item }) => {
                    return(
                        <View style={containerStyles.questionView}>
                            <Text style={textStyles.bodyText}>{item.question}</Text>
                            <CheckBox
                                style={textStyles.check}
                                value={item.checked || false}
                                onValueChange={() => check(item, item.id)}
                            />
                        </View>
                    )
                }}
            />
            <Pressable style={textStyles.back} onPress={() => navigation.goBack()}>
                <Ionicons style={textStyles.arrow} name='arrow-back-outline' color='black'/>
            </Pressable>
        </View>
    );
}

const textStyles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: '3%',
        marginHorizontal: '7%',
        fontFamily: 'sans-serif-light',
    },
    bodyText: {
        fontSize: 18,
        marginVertical: '3%',
        marginHorizontal: '4%',
        fontFamily: 'sans-serif-condensed',
        flex: 9,
    },
    submit: {
        fontSize: 31,
        marginVertical: '3%',
        marginHorizontal: '7%',
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
    },
    arrow: {
        marginVertical: '10%',
        marginLeft: '13%',
        textAlignVertical: 'center',
        fontSize: 37,
    },
    back: {
        position: 'absolute',
    },
    check: {
        width: '7%',
        aspectRatio: 1,
        alignSelf: 'center',
        backgroundColor: '#ceebc5',
        flex: 1,
        marginRight: '4%',
    }
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
    },
    titleView: {
        backgroundcolor: '#f2f2f2',
        flexDirection: 'row',
        borderBottomWidth: 2,
        justifyContent: 'center',
    },
    questionView: {
        backgroundColor: '#ceebc5',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    submitView: {
        backgroundColor: '#84e084',
        borderBottomWidth: 1,
    }
});

const itemStyles = StyleSheet.create({
    button: {
        width: '70%',
        height: '80%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(220, 240, 240)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#0f3022',
        marginRight: '5%',
    },
    list: {
        borderWidth: 1,
    },
});

export default SurveyRedirectScreen;