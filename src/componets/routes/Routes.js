import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {  useNavigation ,useRoute} from '@react-navigation/native';
import Home from '../screens/home/Home';
import SettingIcon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from '../screens/splash/Splash';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import Setting from '../screens/setting/Setting';
import Security from '../screens/setting/Security';
import Notifications from '../screens/setting/Notifications';
import EditProfileInfor from '../screens/setting/EditProfileInfor';
import PrivacyAndPolicy from '../screens/setting/PrivacyAndPolicy';
import HelpandSupport from '../screens/setting/HelpandSupport';
import PromoCodesScreen from '../screens/setting/PromoCodesScreen';
import Password from '../screens/setting/Password';
import NotificationsScreen from '../screens/notification/Notification';
import ChatScreen from '../screens/setting/chats/ChatsScreen';
import Receipt from '../screens/cencel&TrackProgress/Receipt';
import Cencel from '../screens/cencel&TrackProgress/Cencel';
import TrackProgress from '../screens/cencel&TrackProgress/TrackProgress';
import SelectCarScreen from '../screens/dashboard/AddCarNameScreen/SelectCarNameScr';
import AddCarScreen from '../screens/dashboard/AddCarNameScreen/AddCard';
import ParticularCarScreen from '../screens/particularCarScreen/ParticularCarScreen';
import HireNowStepOne from '../screens/particularCarScreen/HireNowStepOne';
import HireNowStepTwo from '../screens/particularCarScreen/HireNowStepTwo';
import HireNowStepThree from '../screens/particularCarScreen/HireNowStepThree';
import ParticularReview from '../screens/particularCarScreen/ParticularReview';
import Chat from '../screens/setting/chats/Chats';
import { useSocket } from '../../../Socket';
const Stack = createStackNavigator();

const Routes = ({route}) => {
    const navigation = useNavigation();
    const socket = useSocket();

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
      <Stack.Screen options={{ headerShown: false }} name="ParticularCarScreen" component={ParticularCarScreen} />
      <Stack.Screen options={{ headerShown: false }} name="OtpForget" component={OtpForget} />
      <Stack.Screen options={{ headerShown: false }} name="setpassword" component={SetPassword} />
      <Stack.Screen
        name="Forget"
        component={Forget}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Forget Passowrd</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
       <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Settings</Text>
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
         <Stack.Screen
        name="EditProfileInfor"
        component={EditProfileInfor}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Profile Information</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Notifications</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
       <Stack.Screen
        name="Security"
        component={Security}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Security</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
      <Stack.Screen
        name="PrivacyAndPolicy"
        component={PrivacyAndPolicy}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Privacy Policy</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
      <Stack.Screen
        name="HelpAndSupport"
        component={HelpandSupport}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Help & Support</Text>
            </TouchableOpacity>
          ),
          title: null,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -5 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <SettingIcon name="chat" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Password"
        component={Password}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Password</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Chat</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
       <Stack.Screen
        name="promocodeScreen"
        component={PromoCodesScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Promo Codes</Text>
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
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Notifcation</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      
      name="Notifcationscreen" component={NotificationsScreen} />
   <Stack.Screen
  options={({ navigation, route }) => ({
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
    headerLeft: () => (
      <TouchableOpacity
        style={{ flexDirection: 'row', marginLeft: 13 }}
        onPress={() => {
          const chatRoomId = route?.params?.chatRoomId;  // Access chatRoomId properly from route params
          console.log("Back button pressed, chatRoomId:", chatRoomId);

          if (chatRoomId && socket) {
            socket.emit('leave', { ticketId: chatRoomId });
            console.log(`Left chat for ticketId: ${chatRoomId}`);
          } else {
            console.log("chatRoomId not found or socket is not defined");
          }

          navigation.goBack();
        }}
      >
        <BackIcon name="arrowleft" size={23} color="#747EEF" style={{ marginRight: 18 }} />
        <Text style={[styles.backicontext, { marginLeft: -10 }]}>Chats</Text>
      </TouchableOpacity>
    ),
    title: null,
  })}
  name="chat-screen"
  component={ChatScreen}
/>


       <Stack.Screen
        name="TrackProgess"
        component={TrackProgress}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Track Progress</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
       <Stack.Screen
        name="CencelTracking"
        component={Cencel}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Cancel Booking</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
      <Stack.Screen
        name="Receipt"
        component={Receipt}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Receipt</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
       <Stack.Screen
        name="AddCar"
        component={AddCarScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Add Vehicle</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
      <Stack.Screen
        name="SelectCar"
        component={SelectCarScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Select Vehicle</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -5 }}>
              <TouchableOpacity onPress={() => navigation.navigate('AddCar')}>
                <BackIcon name="plus" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          title: null,
        }}
      />
       <Stack.Screen
        name="StepOne"
        component={HireNowStepOne}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Hire Now</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
       <Stack.Screen
        name="StepTwo"
        component={HireNowStepTwo}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Hire Now</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
       <Stack.Screen
        name="StepThree"
        component={HireNowStepThree}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Hire Now</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
      <Stack.Screen
        name="ParticularReview"
        component={ParticularReview}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 13 }} onPress={() => navigation.goBack()}>
              <BackIcon name="arrowleft" size={23} color='#747EEF' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Seller Reviews</Text>
            </TouchableOpacity>
          ),
          title: null,
        }}
      />
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
