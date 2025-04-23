
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../screens/style';
import Popup from '../screens/particularCarScreen/Modalpopup'
const PaymnetNavigation = ({ Paymnet}) => {
  const navigation = useNavigation();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    const socket = io('https://backend.washta.com/');
    socket.on('payment.complete', (status) => {
      console.log('paymentStatus',status)
      setPaymentStatus(status);
      setPopupVisible(true)
    });
    return () => {
      socket.off('payment.complete');
    };
  }, []);
  const hidePopup = () => {
    setPopupVisible(false);
    navigation.navigate('Jobs')
  };
  useEffect(() => {
    if (paymentStatus) {
      console.log('Payment status:', paymentStatus);
    }
  }, [paymentStatus, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView 
          source={{ uri: Paymnet }} 
          style={styles.webView}
          startInLoadingState={true}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          mixedContentMode="always"
          renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
          onLoad={() => console.log('WebView loaded')}
          onError={(error) => console.error('WebView error:', error)}
          onNavigationStateChange={(navState) => {
            console.log('WebView navigation state:', navState);
          }}
        />
          <Popup 
        visible={popupVisible} 
        onClose={hidePopup} 
        message='Please wait for the car washing company to review and accept your hiring request.'
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    color: '#212121',
    letterSpacing: 0.1,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
    marginVertical: 10,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%', // Ensures the WebView takes up full screen height
  },
  webView: {
    flex: 1,
  },
});

export default PaymnetNavigation;
