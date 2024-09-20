import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import {  Fonts, FontsGeneral } from '../screens/style';
const Home = ({text,Link,loading}) => {
  
  return (
    <View  >
        <TouchableOpacity style={styles.container} onPress={Link}>
        <Text  style={styles.text}>
        {loading ? 'Loading...' : text}
      </Text>
        </TouchableOpacity>
      
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    width:'100%',
    backgroundColor:'#747EEF',
    borderRadius:100,
    paddingVertical:5
  },
  text: {
    width: 250,
    fontFamily:Fonts.MEDIUM,
    textAlign:'center',
    color:'white',
    fontSize:15,
    padding:10,
  }
});

export default Home;
