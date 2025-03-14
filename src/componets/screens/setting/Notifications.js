import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { FontsGeneral } from '../style';
import { useToast } from 'react-native-toast-notifications';

const { width, height } = Dimensions.get('window');

const Notifications = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // ✅ Get notification status from AsyncStorage on mount
  useEffect(() => {
    const getNotificationStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('notification');
        if (status !== null) {
          setIsActive(status === 'true');
        }
      } catch (error) {
        console.log('Error reading notification from AsyncStorage:', error);
      }
    };

    getNotificationStatus();
  }, []);

  // ✅ Function to handle toggle & call API with access token
  const handleToggle = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus); // Update UI immediately
    setLoading(true);

    try {
      // Get accessToken from AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        Alert.alert('Error', 'Access token not found!');
        setIsActive(!newStatus); // revert toggle
        return;
      }

      // Call API with access token in headers
      const response = await axios.patch(
        'https://backend.washta.com/api/customer/toggleNotification',
        { status: newStatus },
        {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
      );
      
      const toastMessage = newStatus
      ? 'Notifications turned ON successfully'
      : 'Notifications turned OFF successfully';

    toast.show(toastMessage, {
      type: 'success',
      animationType: 'zoom-in',
      duration: 3000, // optional: duration in ms
    });
    navigation.goBack()
      if (response.status === 200) {
        // Save the updated notification status in AsyncStorage
        await AsyncStorage.setItem('notification', newStatus.toString());
      } else {
        Alert.alert('Error', 'Failed to update notification setting.');
        setIsActive(!newStatus); // revert toggle back
      }
    } catch (error) {
      console.log('API error:', error);
      Alert.alert('Error', 'Something went wrong!');
      setIsActive(!newStatus); // revert toggle back
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainNotifcation}>
      <ToggleSwitch
        isOn={isActive}
        onColor="#747EEF"
        offColor="#cccccc"
        label="General Notification"
        labelStyle={styles.labelStyle}
        size="medium"
        onToggle={handleToggle}
        disabled={loading} // disable toggle during API call
      />

     
    </View>
  );
};

const styles = StyleSheet.create({
  mainNotifcation: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  labelStyle: {
    color: 'black',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.75,
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: width * 0.04,
  },
  toggleContainer: {
    marginTop: height * 0.03,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    left: 0,
    right: 0,
    paddingHorizontal: width * 0.05,
  },
});

export default Notifications;
