import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../src/screens/auth/LoginScreen';
import SignupScreen from '../src/screens/auth/SignupScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}