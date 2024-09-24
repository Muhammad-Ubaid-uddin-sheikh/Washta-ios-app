import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../../allDynamicsComponets/Button';
import { Fonts, FontsGeneral } from '../style';
import { useToast } from 'react-native-toast-notifications';
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ApiUrl  = 'https://backend.washta.com/api/otp/verifyCode'

const OtpForget = ({navigation,route}) => {
  const {paylod} = route.params;
  console.log('payloasdasd',paylod.email)
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);
  const concatenatedString = otp?.join("");
  const toast = useToast()
  const payloads ={
    code: concatenatedString,
    email: paylod?.email
}
  const handleChangeText = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };
  const ButtonClick = async () => {
    if (!otp) {
      toast.show("Incomplete Details. Please fill OTP details", { type: "danger", animationType: "zoom-in" });
    } else {
      setLoading(true);
      try {
        const response = await axios.post(ApiUrl, payloads);
        if (response.data && response.data.data && response.data.data.token) {
          const { token } = response.data.data;
          await AsyncStorage.setItem('accessToken', token);
          await AsyncStorage.setItem('Token', token);
          navigation.navigate('setpassword');
          console.log(response.data.data);
        } else {
          toast.show("OTP validation failed. Please try again.", { type: "danger", animationType: "zoom-in" });
        }
      } catch (error) {
        console.log(JSON.stringify(error.response));
        const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
        toast.show(errorMessage, { type: "danger", animationType: "zoom-in" });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.heading}>Enter your verification code</Text>
        <Text style={styles.paragraph}>Enter 4 digit verification code sent to{'\n'}  your registered email.</Text>
        <View style={styles.inputContainer}>
        {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          onChangeText={(text) => handleChangeText(text, index)}
          value={value}
          maxLength={1}
          keyboardType="numeric"
          ref={(ref) => (inputs.current[index] = ref)}
          autoFocus={index === 0}
        />
      ))}
        
      </View>
      <Text style={styles.forgotPas}>Resend code</Text>
      </View>
      <View style={styles.bottomContent}>
        <Button loading={loading} text="Verify" Link={ButtonClick} />
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
    paddingTop: 50,
    // paddingBottom: 10,
    backgroundColor: '#fff',
  },
  topContent: {
    alignItems: 'center',
    width:'100%',
    paddingTop:20
  },
  bottomContent: {
    // alignItems: 'center',
    marginBottom: 15,
    width:'100%'
  },
  heading: {
    fontSize: 30,
    fontFamily: FontsGeneral.MEDIUMSANS,
    marginBottom: 12,
    color: 'black',
    textAlign: 'center'
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
    color: 'black',
    width:300
  },
  inputContainer: {
    width: '70%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:20
  },
  forgotPas: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'auto',
    fontFamily: FontsGeneral.REGULAR,
    paddingLeft: 12,
    color:'#747EEF'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    width: 50,
    height: 60,
    textAlign: 'center',
    fontSize: 20,
    color:'black'
  },
});

export default OtpForget;
