import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/screens/main/HomeScreen';
import MessagingScreen from '../src/screens/main/MessagingScreen';
import AppointScreen from '../src/screens/main/AppointScreen';
import SettingScreen from '../src/screens/main/SettingScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Messenger') {
                  iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                } else if (route.name === 'Appointments') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'rgb(102, 187, 106)',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Messenger" component={MessagingScreen}/>
            <Tab.Screen name="Appointments" component={AppointScreen}/>
            <Tab.Screen name="Settings" component={SettingScreen}/>
        </Tab.Navigator>
      )
}