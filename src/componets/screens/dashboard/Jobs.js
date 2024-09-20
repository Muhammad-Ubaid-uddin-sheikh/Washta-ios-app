import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Fonts, FontsGeneral } from '../style';
import Arrow from 'react-native-vector-icons/MaterialIcons'
import Dot from 'react-native-vector-icons/Entypo'
import JobsNavigation from '../job/Jobs'
const Jobs = ({ navigation }) => {

  return (

  
      <View style={styles.MainContainer}>
   <JobsNavigation/>
          </View>
  )
}
const styles = StyleSheet.create({
    MainContainer:{
        flex:1,
        width:'100%'
    },

})


export default Jobs
