import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../../components'
import Firebase from '../../../config/firebase'
import { getFirestore, setDoc, doc } from "firebase/firestore";

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');
  const db = getFirestore(Firebase);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '' && fName !== '' && lName !== '') {

          auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
              setDoc(doc(db, 'patients', cred.user.uid), {
                firstName: fName,
                lastName: lName,
              });
            })
            .catch((e) => {
              console.log("Error:", e);
            });
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.inputView}>
        <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 16,
            borderWidth: 2,
            flex: 1,
            marginRight: 5,
          }}
          leftIcon='rename-box'
          placeholder='First Name'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='givenName'
          autoFocus={false}
          value={fName}
          onChangeText={text => setFName(text)}
        />
        <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 16,
            borderWidth: 2,
            flex: 1,
            marginLeft: 5,
          }}
          leftIcon='rename-box'
          placeholder='Last Name'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='familyName'
          autoFocus={false}
          value={lName}
          onChangeText={text => setLName(text)}
        />
      </View>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 16,
          borderWidth: 2,
        }}
        leftIcon='email'
        placeholder='E-mail'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={false}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 16,
          borderWidth: 2,
        }}
        leftIcon='lock'
        placeholder='Password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <Button
        onPress={onHandleSignup}
        backgroundColor='rgb(160, 200, 210)'
        title='Sign up'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 14
        }}
      />
      <RNButton
        onPress={() => navigation.navigate('Login')}
        title='Go to Login'
        color='rgb(120, 120, 120)'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 245, 255)',
    paddingTop: 40,
    paddingHorizontal: 12
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
  inputView: {
    flexDirection: 'row',
  },
});