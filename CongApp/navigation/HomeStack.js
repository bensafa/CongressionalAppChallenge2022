import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/screens/main/HomeScreen';
import SurveyScreen from '../src/screens/main/SurveyScreen';
import SurveyRedirectScreen from '../src/screens/main/SurveyRedirectScreen';
import CommsScreen from '../src/screens/main/CommsScreen';
import IMScreen from '../src/screens/main/IMScreen';
import SettingScreen from '../src/screens/main/SettingScreen';
import ResultScreen from '../src/screens/main/ResultScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function SurveyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Survey' component={SurveyScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='SurveyRedirect' component={SurveyRedirectScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Result' component={ResultScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

function CommStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Comms' component={CommsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='IM' component={IMScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default function HomeStack() {
    return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'SurveyStack') {
                  iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                } else if (route.name === 'CommStack') {
                  iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }

                size = focused ? 34 : 30;
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'rgb(102, 187, 106)',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {height: "9%"},
              tabBarLabelStyle: {fontSize: 0},
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="SurveyStack" component={SurveyStack} options={{ headerShown: false }}/>
            <Tab.Screen name="CommStack" component={CommStack} options={{ headerShown: false }}/>
            <Tab.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
      )
}

const styles = StyleSheet.create({
  navFooter: {
    height: "10%",
  }
});