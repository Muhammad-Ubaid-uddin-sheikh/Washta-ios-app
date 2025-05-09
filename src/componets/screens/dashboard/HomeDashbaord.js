import React, { useEffect } from 'react';
import { View, StyleSheet,} from 'react-native'
import DashboardBottom from './Dashboard'
import { requestNotificationPermissionAndFetchToken } from '../../allDynamicsComponets/NotificationUtils';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';

const Dashboard = ({navigation}) => {
  const toast = useToast();
  useEffect(() => {
    const fetchDeviceId = async () => {
      const storedDeviceId = await AsyncStorage.getItem('deviceId');  // Get from local storage

      if (storedDeviceId) {
        // If deviceId is already stored, no need to hit the API
        console.log('Device ID already stored:', storedDeviceId);
        
      } else {
        // If deviceId is not stored, request permission and fetch it
        const deviceId = await requestNotificationPermissionAndFetchToken();

        if (deviceId) {
          console.log('Fetched Device ID:', deviceId);

          try {
            const accessToken = await AsyncStorage.getItem('accessToken'); // Get the access token

            const response = await axios.patch(
              'https://backend.washta.com/api/customer/allowDisallowNotification', 
              { deviceId },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,  // Pass the access token in the headers
                },
              }
            );

            if (response.status === 200) {
              // If the API call is successful, save the deviceId to AsyncStorage
              await AsyncStorage.setItem('deviceId', deviceId);
              console.log('Device ID saved to AsyncStorage');
              toast.show('Notification has been successfully enabled on your device!', { type: 'success',duration:500 });
            } else {
              
            }
          } catch (error) {
            console.error('Error during API call:', error);
            
          }
        } else {
          console.log('No Device ID (permission denied or error)');
        }
      }
    };

    fetchDeviceId();
  }, []);
    
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