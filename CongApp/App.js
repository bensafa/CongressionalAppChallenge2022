import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './navigation';
import { useFonts } from 'expo-font';  

let customFonts = {
    'Zag-Bold': require('./assets/fonts/ZagBold.otf'),
    'Zag-Regular': require('./assets/fonts/ZagRegular.otf'),
};

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }
  return (
    Routes()
  );
}
