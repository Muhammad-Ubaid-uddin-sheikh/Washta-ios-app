import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import INputPasword from '../../allDynamicsComponets/InputPassowrd'
import Button from '../../allDynamicsComponets/Button';
import { Fonts, FontsGeneral } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import axios from 'react-native-axios'
const ApiUrl  = 'https://backend.washta.com/api/otp/setPassword'

const SetPassword = ({navigation}) => {
  const [email, setemail] = useState('');
  const [Feildpassword, setFeildpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('accessToken');
        if (savedToken !== null) {
          setToken(savedToken);
          console.log('accessToken', savedToken);
        }
      } catch (error) {
        console.error('Failed to fetch the token from storage', error);
      }
    };

    getToken();
  }, []);

  const paylod = {
    newPassword:Feildpassword,
    token: token,
    role : "customer"
}
const ButtonClick = async () => {
    if (!Feildpassword) {
      toast.show("Please enter the password", { type: "danger", animationType: "zoom-in" });
    } else {
      setLoading(true);
      try {
        const response = await axios.post(ApiUrl, paylod);
        if (response) {
        //   const { token } = response.data;
        //   await AsyncStorage.setItem('accessToken', token);
        //   await AsyncStorage.setItem('Token', token);
        console.log(response.data)
          toast.show("Password Successfully Changed", { type: "success", animationType: "zoom-in" });
          navigation.navigate('Login')
        } else {
          toast.show("An error occurred. Please try again.", { type: "danger", animationType: "zoom-in" });
        }
      } catch (error) {
        console.log(JSON.stringify(error.response));
        const errorMessage = error.response?.data?.error?.name || "An error occurred. Please try again.";
        toast.show(errorMessage, { type: "danger", animationType: "zoom-in" });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.heading}>Forget Passowrd</Text>
        <Text style={styles.paragraph}>Enter your email address below, and we'll send you instructions to reset your password.</Text>
        <View style={styles.inputContainer}>
      <INputPasword focus={true} labelName='Password' value={Feildpassword} onChangeText={(text) => setFeildpassword(text)} />

      </View>
      </View>
      <View style={styles.bottomContent}>
        <Button loading={loading} text="Sign In" Link={ButtonClick} />
      </View>
    </View>
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
    width: '100%',
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

export default SetPassword;
