import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

const SearchBar = ({ navigation, term, onTermChange, onTermSubmit }) => {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
            <View style={styles.iconContainer}>
            <AntDesign name="search1" size={26} color="black" />
            </View>
            <TextInput
                style={styles.text}
                autoCapitalize='none'
                placeholder='Search'
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
      </View>
    );
  
  };
  
  const styles = StyleSheet.create({
    text: {
      fontSize: 30,
      marginLeft: '1.5%',
      fontFamily: 'sans-serif-light',
      width: '87%',
    },
    container: {
      flexDirection: 'row',
    },
    searchContainer: {
      borderWidth: 3,
      borderColor: 'black',
      flex: 1,
      margin: '3%',
      backgroundColor: '#F0EEEE',
      borderRadius: 10,
      flexDirection: 'row',
    },
    iconContainer: {
      marginTop: '2%',
      marginLeft: '3%',
      marginRight: '1%',
    },
  });
  
  export default SearchBar;