import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../../components'
import Firebase from '../../../config/firebase'

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Log in</Text>
      <InputField
        inputStyle={{
          fontSize: 16,
          fontFamily: 'notoserif',
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 16,
          borderWidth: 2,
          borderRadius: 8,
        }}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 16,
          fontFamily: 'notoserif',
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 16,
          borderWidth: 2,
          borderRadius: 8,
        }}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Button
        onPress={onLogin}
        backgroundColor='#5adba5'
        title='Login'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <View style={styles.newUserView}>
        <Text style={styles.newUser}>New User?</Text>
        <RNButton
          onPress={() => navigation.navigate('Signup')}
          title='Sign Up'
          color='rgb(120, 120, 120)'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 245, 255)',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    color: 'black',
    paddingBottom: 20,
    fontFamily: 'notoserif',
    marginTop: '31%',
    marginHorizontal: '4%',
    paddingTop: '5%',
    borderTopWidth: 1,
  },
  newUser: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    paddingLeft: '3%',
    paddingBottom: '2%',
    fontFamily: 'sans-serif-light',
  },
  newUserView: {
    backgroundColor: 'white',
    padding: '4%',
    borderWidth: 2,
    borderRadius: 10,
  },
});