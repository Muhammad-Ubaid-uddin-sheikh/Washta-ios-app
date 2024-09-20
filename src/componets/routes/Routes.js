import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {  useNavigation } from '@react-navigation/native';
import Home from '../screens/home/Home';
import SplashScreen from '../screens/splash/Splash';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { FontsGeneral } from '../screens/style';
import LoginScreen from '../screens/login/Login';
import SignUp from '../screens/signup/Signup';
import OtpForget from '../screens/forget/OtpCode';
import SetPassword from '../screens/forget/SetPassword';
import OtpScreen from '../screens/otpscreen/OtpScreen';
import Forget from '../screens/forget/Forget';
import EnableLocation from '../screens/locationEnable/LocationEnable';
import Dashboard from '../screens/dashboard/HomeDashbaord'
const Stack = createStackNavigator();

const Routes = () => {
    const navigation = useNavigation();
  return (
     <Stack.Navigator
      initialRouteName='SplashScreen'
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width * 2, 0], // Adjusted from layouts.screen.width
                  }),
                },
              ],
            },
          };
        },
        headerStyle: {
          borderBottomWidth: 0, // Remove bottom border
          elevation: 0,
          borderColor:'white',
          backgroundColor:'white' // Remove box shadow for Android
        },
      }}
    >
        <Stack.Screen options={{ headerShown: false }}  name="SplashScreen" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="OtpScreen" component={OtpScreen} />
      <Stack.Screen options={{ headerShown: false }} name="EnableLocation" component={EnableLocation} />
      <Stack.Screen options={{ headerShown: false }} name="Dashbaord" component={Dashboard} />
      {/* <Stack.Screen options={{ headerShown: false }} name="ParticularCarScreen" component={ParticularCarScreen} /> */}
      <Stack.Screen options={{ headerShown: false }} name="OtpForget" component={OtpForget} />
      <Stack.Screen options={{ headerShown: false }} name="setpassword" component={SetPassword} />
      <Stack.Screen
        name="Forget"
        component={Forget}
        options={{
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Forget Passowrd</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: 'white', 
                borderBottomWidth: 0, 
                shadowOpacity: 0, 
                elevation: 0, 
              },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Login</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      name="Login" component={LoginScreen} />
        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: 'white', 
                borderBottomWidth: 0, 
                shadowOpacity: 0, 
                elevation: 0, 
              },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Sign Up</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}name="SignUp" component={SignUp} />
      </Stack.Navigator>
   
  );
};
const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    backicontext: {
      color: '#212121',
      fontSize: 18,
      fontFamily: FontsGeneral.MEDIUMSANS,
    },
  });
export default Routes;
