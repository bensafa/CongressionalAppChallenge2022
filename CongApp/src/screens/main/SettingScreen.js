import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import Firebase from '../../../config/firebase'

const auth = Firebase.auth();

function SettingScreen() {

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={containerStyles.mainView}>
            <View style={containerStyles.buttonContainer}>
                <Pressable style={itemStyles.button} onPress={handleSignOut}>
                    <Text style={textStyles.bodyText}>Log Out</Text>
                </Pressable>
            </View>
        </View>
    );
}

const textStyles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    bodyText: {
        fontSize: 19,
        textAlign: 'left',
        marginLeft: '4%',
        color: 'rgb(240, 40, 40)',
        fontWeight: 'bold',
    },
});

const containerStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
    },
    buttonContainer: {
        height: '9%',
        width: '100%',
    }
});

const itemStyles = StyleSheet.create({
    button: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
    }
});

export default SettingScreen;