
// import React, { useEffect } from 'react';
// import Routes from './src/componets/routes/Routes';
// import { ToastProvider } from 'react-native-toast-notifications';
// import { Alert, PermissionsAndroid, Platform, StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import store from './src/redux/store';
// import { Provider } from 'react-redux';
// import { SocketProvider } from './Socket';
// import notifee, { AndroidImportance } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { navigationRef,navigate } from './src/navigationRef';

// // Request notification permissions and get FCM token
// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFCMToken(); // Get FCM token
//   }
// }

// // Request permission for iOS
// async function requestPermissionForiOS() {
//   if (Platform.OS === 'ios') {
//     const authStatus = await messaging().requestPermission({
//       alert: true,
//       badge: true,
//       sound: true,
//     });
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Notification permission granted.');
//       getFCMToken(); // Get FCM token for iOS
//     }
//   }
// }

// // Get FCM token
// // async function getFCMToken() {
// //   try {
// //     const fcmToken = await messaging().getToken();
// //     if (fcmToken) {
// //       console.log('FCM Token:', fcmToken);
// //       AsyncStorage.setItem('deviceid',fcmToken)
// //       // You can store the FCM token to send notifications later
// //     } else {
// //       console.log('Failed to get FCM token');
// //     }
// //   } catch (error) {
// //     console.log('Error getting FCM token:', error);
// //   }
// // }
// export const getFCMToken = async () => {
//   try {
//     const fcmToken = await messaging().getToken();
//     if (fcmToken) {
//       console.log('FCM Token:', fcmToken);
//       await AsyncStorage.setItem('deviceid', fcmToken);
//       return fcmToken;
//     } else {
//       console.log('Failed to get FCM token');
//       return null;
//     }
//   } catch (error) {
//     console.log('Error getting FCM token:', error);
//     return null;
//   }
// };
// // Display notification
// async function onDisplayNotification(title, body) {
//   // Create a channel (required for Android)
//   await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     importance: AndroidImportance.HIGH,
//   });

//   // Display a notification with the passed title and body
//   await notifee.displayNotification({
//     title: title || 'New Notification',
//     body: body || 'This is a test notification',
//     android: {
//       channelId: 'default',
//       smallIcon: 'ic_launcher', // Ensure this is set in your drawable folder
//     },
//   });
// }

// // Background message handler
// async function onMessageReceived(message) {
//   console.log('FCM Message received in background!', message);
//   const { title, body } = message.notification || message.data; // Get the title and body from FCM message
//   onDisplayNotification(title, body); // Display the notification with FCM data
// }

// const App = () => {
//   useEffect(() => {
//     // Request notification permissions
//     if (Platform.OS === 'ios') {
//       requestPermissionForiOS();
//     } else {
//       requestUserPermission();
//     }

//     // Listen to foreground messages
//     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//       console.log('A new FCM message arrived!', remoteMessage);
//       const { title, body } = remoteMessage.notification || remoteMessage.data; // Use the correct notification data
//       onDisplayNotification(title, body); // Display the notification with FCM data
//     });

//     // Handle background notifications
//     messaging().setBackgroundMessageHandler(onMessageReceived);

//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
//       ).then((res) => {
//         if (res === 'granted') {
//           requestUserPermission();
//         } else {
//           console.log('POST_NOTIFICATIONS permission denied');
//         }
//       });
//     }
//   }, []);

//   return (
//     <NavigationContainer ref={navigationRef}>
//       <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
//       <SocketProvider>
//         <ToastProvider>
//           <Provider store={store}>
//             <Routes />
//           </Provider>
//         </ToastProvider>
//       </SocketProvider>
//     </NavigationContainer>
//   );
// };

// export default App;
import React, { useEffect, useState } from 'react';
import Routes from './src/componets/routes/Routes';
import { ToastProvider } from 'react-native-toast-notifications';
import { Alert, PermissionsAndroid, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import { SocketProvider } from './Socket';
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef, navigate } from './src/navigationRef';

// Request notification permissions and get FCM token
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken(); // Get FCM token
  }
}

// Request permission for iOS
async function requestPermissionForiOS() {
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
      console.log('Notification permission granted.');
      getFCMToken(); // Get FCM token for iOS
    } else {
      console.log('Notification permission denied');
    }
  }
}

// Get FCM token
export const getFCMToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('deviceid');
    if (!fcmToken) {
      // If the token is not available in AsyncStorage, fetch a new one
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        await AsyncStorage.setItem('deviceid', fcmToken);
      } else {
        console.log('Failed to get FCM token');
      }
    }
    return fcmToken;
  } catch (error) {
    console.log('Error getting FCM token:', error);
    return null;
  }
};

// Display notification
async function onDisplayNotification(title, body) {
  // Create a channel (required for Android)
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification with the passed title and body
  await notifee.displayNotification({
    title: title || 'New Notification',
    body: body || 'This is a test notification',
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', // Ensure this is set in your drawable folder
    },
  });
}

// Background message handler
async function onMessageReceived(message) {
  console.log('FCM Message received in background!', message);
  const { title, body } = message.notification || message.data; // Get the title and body from FCM message
  onDisplayNotification(title, body); // Display the notification with FCM data
}

const App = () => {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    // Fetch device ID when the app starts
    const fetchDeviceId = async () => {
      const storedDeviceId = await AsyncStorage.getItem('deviceid');
      if (storedDeviceId) {
        setDeviceId(storedDeviceId);
      } else {
        const newDeviceId = await getFCMToken();
        setDeviceId(newDeviceId);
      }
    };

    fetchDeviceId();

    // Request notification permissions
    if (Platform.OS === 'ios') {
      requestPermissionForiOS();
    } else {
      requestUserPermission();
    }

    // Listen to foreground messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', remoteMessage);
      const { title, body } = remoteMessage.notification || remoteMessage.data; // Use the correct notification data
      onDisplayNotification(title, body); // Display the notification with FCM data
    });

    // Handle background notifications
    messaging().setBackgroundMessageHandler(onMessageReceived);

    // Listen for token refresh on iOS (in case the token is updated)
    const unsubscribeToken = messaging().onTokenRefresh(async (fcmToken) => {
      console.log('FCM Token refreshed:', fcmToken);
      await AsyncStorage.setItem('deviceid', fcmToken);
      setDeviceId(fcmToken); // Update the deviceId state when the token is refreshed
    });

    return () => {
      unsubscribe();
      unsubscribeToken(); // Cleanup token refresh listener on unmount
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      ).then((res) => {
        if (res === 'granted') {
          requestUserPermission();
        } else {
          console.log('POST_NOTIFICATIONS permission denied');
        }
      });
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <SocketProvider>
        <ToastProvider>
          <Provider store={store}>
            <Routes />
          </Provider>
        </ToastProvider>
      </SocketProvider>
    </NavigationContainer>
  );
};

export default App;
