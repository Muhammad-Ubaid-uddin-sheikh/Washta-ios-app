
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../../allDynamicsComponets/Button';
import { Fonts, FontsGeneral } from '../style';
import INputPasword from '../../allDynamicsComponets/InputPassowrd';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import axios from 'react-native-axios';
import InputFeilds from '../../allDynamicsComponets/inputFeilds';
import { getFCMToken } from '../../../../App';
import { useFocusEffect } from '@react-navigation/native';

const ApiUrl = 'https://backend.washta.com/api/auth/login';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [Feildpassword, setFeildpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [deviceid ,setDeviceid] =useState(null)
  console.log('deviceid',deviceid)
  
  const toast = useToast();
  const ButtonClick = async () => {
    if (!email || !Feildpassword) {
      toast.show('Incomplete Details. Please fill all details', { type: 'danger', animationType: 'zoom-in' });
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(ApiUrl, {
        identifier: email,
        password: Feildpassword,
        role: 'customer',
      deviceId: deviceid | "123456321123"
      });

      if (response.data.status) {
        const { accessToken, user } = response.data.data;
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('Token', accessToken);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('Dashbaord');
      }
    } catch (error) {
      console.log(JSON.stringify(error.response));
      const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
      toast.show(errorMessage, { type: 'danger', animationType: 'zoom-in' });
    } finally {
      setLoading(false);
    }
  };
  const getdeviceid = async ()=>{
    const deviceid = await AsyncStorage.getItem('deviceid')
    setDeviceid(deviceid)
  }
  // getFCMToken()
  // useEffect(()=>{getdeviceid()},[])
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await getFCMToken();      // ✅ First call
        getdeviceid();            // ✅ Then call this after
      };
  
      fetchData();
  
      // Optional: cleanup function if you need it
      return () => {
        // Clean up here if necessary
      };
    }, [])
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.heading}>Welcome back!</Text>
          <Text style={styles.paragraph}>
            Get the best service available in the UAE{'\n'} from the most professional Sellers.
          </Text>
          <View style={styles.inputContainer}>
            <InputFeilds 
              focus={true} 
              labelName="Email" 
              value={email} 
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <INputPasword 
              focus={true} 
              labelName="Password" 
              value={Feildpassword} 
              onChangeText={(text) => setFeildpassword(text)} 
            />
            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.forgotPas}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContent}>
          <Button loading={loading} text="Sign In" Link={ButtonClick} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  topContent: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  bottomContent: {
    marginBottom: 15,
    width: '100%',
    bottom: 10,
  },
  heading: {
    fontSize: 30,
    fontFamily: FontsGeneral.MEDIUMSANS,
    marginBottom: 12,
    color: 'black',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
    color: 'black',
    width: 300,
  },
  inputContainer: {
    width: '100%',
    height: 180,
  },
  forgotPas: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'auto',
    fontFamily: FontsGeneral.REGULAR,
    paddingLeft: 12,
    color: '#747EEF',
  },
});

export default LoginScreen;
