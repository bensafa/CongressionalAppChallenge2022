import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AppointScreen() {
    return (
        <View style={containerStyles.mainView}>
            <Text style={textStyles.titleText}>This is your appointments manager!</Text>
            <Text style={textStyles.bodyText}>Here, you can view and organize your upcomming appointments.</Text>
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
});

export default AppointScreen;