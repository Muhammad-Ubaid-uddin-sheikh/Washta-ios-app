import React from 'react';
import { View, StyleSheet,} from 'react-native'
import DashboardBottom from './Dashboard'

const Dashboard = ({navigation}) => {

    
  return (
    
    <View style={styles.MainContainer}>
        <DashboardBottom/>
    </View>
  
  )
}
const styles = StyleSheet.create({
    MainContainer:{
        backgroundColor:'white',
   height:"100%"

       
    },
    
})

export default Dashboard