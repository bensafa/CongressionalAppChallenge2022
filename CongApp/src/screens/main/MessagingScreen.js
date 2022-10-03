import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';

function MessagingScreen() {

    const [dummyList, setDummyList] = useState([
        {id: 1, firstName: 'John', lastName: 'Chapin'},
        {id: 2, firstName: 'Rocky', lastName: 'Balboa'},
        {id: 3, firstName: 'Jane', lastName: 'Doe'},
    ]);

    return (
        <View style={containerStyles.mainView}>
            <Text style={textStyles.titleText}>This is your messenger!</Text>
            <Text style={textStyles.bodyText}>Here, you may securely communicate with medical personnel.</Text>
            <View style={containerStyles.listView}>
                <FlatList
                    data={dummyList}
                    renderItem={({ item }) => {
                        return (
                            <View style={containerStyles.buttonContainer}>
                                <Pressable style={itemStyles.button} onPress={() => {}}>
                                    <Text style={textStyles.bodyText}>{item.id}. {item.firstName} {item.lastName}</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                    keyExtractor={(dummyList) => dummyList.id}
                    showsVerticalScrollIndicator={true}
                    ListFooterComponent={() => {
                        return (
                            <View style={containerStyles.buttonContainer}>
                                <Pressable style={itemStyles.button} onPress={() => {}}>
                                    <Text style={textStyles.addText}>+ Add New Chat</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                />
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
        marginVertical: '5%',
        marginHorizontal: '7%',
    },
    addText: {
        fontSize: 19,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: '5%',
        marginHorizontal: '7%',
    },
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
    },
    listView: {
        height: '50%',
        flex: 1,
        margin: '2%',
        borderTopWidth: 2,
    },
    buttonContainer: {
        width: '100%',
    }
});

const itemStyles = StyleSheet.create({
    button: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        alignItems: 'center',
        backgroundColor: 'rgb(220, 240, 240)'
    },
    list: {
        borderWidth: 1,
    },
});

export default MessagingScreen;