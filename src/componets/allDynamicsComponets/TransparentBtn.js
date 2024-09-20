import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import {  Fonts, FontsGeneral } from '../screens/style';
import { TouchableOpacity } from 'react-native-gesture-handler';
const TransparentBtn = ({text,Link,loading,TextColor}) => {
  
  return (
    <View  >
        <TouchableOpacity style={styles.container} onPress={Link}>
        <Text  style={[styles.text,{color:TextColor||'#CA1306'}]}>
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
    // backgroundColor:'',
    background:'transparent',
    width:'100%',
    // backgroundColor:'#747EEF',
    paddingVertical:5
  },
  text: {
    width: 100,
    fontFamily:Fonts.BOLD,
    textAlign:'center',
    color:'#CA1306',
    fontSize:15,
    padding:2,
  }
});

export default TransparentBtn;
