import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid } from 'react-native';

// API function to send token (replace with your actual API call)
const sendFCMTokenToServer = async (token) => {
  try {
    // Replace this with your API call
    console.log('Sending FCM Token to server:', token);
    // Example:
    // await axios.post('https://your-api-url.com/api/send-token', { token });
  } catch (error) {
    console.log('Error sending FCM Token to server:', error);
  }
};

// Function to request notification permission, get FCM token and call API
export const requestNotificationPermissionAndFetchToken = async () => {
  try {
    // First check if we already have the FCM token
    let fcmToken = await AsyncStorage.getItem('deviceid');
    if (!fcmToken) {
      // If not available, request notification permission and fetch token
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission({
          alert: true,
          badge: true,
          sound: true,
        });
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Notification permission granted for iOS');
          fcmToken = await messaging().getToken();
        } else {
          console.log('Notification permission denied for iOS');
          return null; // No token
        }
      } else {
        // For Android or other platforms
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Notification permission granted for Android');
          fcmToken = await messaging().getToken();
        } else {
          console.log('Notification permission denied for Android');
          return null; // No token
        }
      }
    }

    // If token is obtained, save to AsyncStorage and send to server
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      await AsyncStorage.setItem('deviceid', fcmToken);
      sendFCMTokenToServer(fcmToken); // Call API to send token to server
      return fcmToken; // Return token
    }
    return null;
  } catch (error) {
    console.log('Error in requesting permission and fetching token:', error);
    return null; // Return null in case of error
  }
};
