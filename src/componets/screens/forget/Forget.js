import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import InputFeilds from '../../allDynamicsComponets/inputFeilds';
import Button from '../../allDynamicsComponets/Button';
import { Fonts, FontsGeneral } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import axios from 'react-native-axios'
const ApiUrl  = 'https://backend.washta.com/api/otp/sendOTP'

const Forget = ({navigation}) => {
  const [email, setemail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const paylod = {
    email: email,
    role : "customer"
}
const ButtonClick = async () => {
  if (!email ) {
    toast.show("Please enter the email address",{type: "danger",animationType:"zoom-in"}); 
    }  else{
      setLoading(true)
        try {
      const response = await axios.post(ApiUrl, {
        ...paylod
      });
      setLoading(true);
      if (response.data.status) {
        //   const { accessToken, user, } = response.data.data;
        //   await AsyncStorage.setItem('accessToken', accessToken);
        //   await AsyncStorage.setItem('Token',accessToken);
        //   await AsyncStorage.setItem('user', JSON.stringify(user));
        //   navigation.navigate('OtpForget')
        navigation.navigate('OtpForget', { paylod });
        console.log(paylod,'paylod')
      }
    } 
    catch (error) {
      console.log(JSON.stringify(error.response));
        const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
        toast.show(errorMessage, { type: "danger", animationType: "zoom-in",duration: 2000 });
    }finally{
      setLoading(false);
  }
}
};
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.heading}>Forget Passowrd</Text>
        <Text style={styles.paragraph}>Enter your email address below, and we'll send Otp on your email  to reset your password.</Text>
        <View style={styles.inputContainer}>
      <InputFeilds focus={true} labelName='Email' value={email} onChangeText={(text) => setemail(text)} />
      </View>
      </View>
      <View style={styles.bottomContent}>
        <Button loading={loading} text="Sign In" Link={ButtonClick} />
      </View>
    </View>
      </TouchableWithoutFeedback >

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
    width:'100%',
    bottom:20
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
    width: '100%',
    height:100
  },
  forgotPas: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'auto',
    fontFamily: FontsGeneral.REGULAR,
    paddingLeft: 12,
    color:'#aaa'
  },
});

export default Forget;
