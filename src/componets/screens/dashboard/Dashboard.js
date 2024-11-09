import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert } from 'react-native';
import SettingIcon from 'react-native-vector-icons/AntDesign';
import Bell from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/FontAwesome';
import Profile from './Profile';
import DashboardMain from './Home';
import Explore from './Explore';
import BackIcon from 'react-native-vector-icons/AntDesign';
import Location from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Fonts, FontsGeneral } from '../style';
import Jobs from './Jobs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';

const ApiUrl = 'https://backend.washta.com/api/Customer/Profile';
const Tab = createBottomTabNavigator();

function MyTabs() {
  const [name, setName] = useState('');

  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(ApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.status) {
        setName(response.data.data || {});
      } else {
        Alert.alert('Failed to fetch user data');
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
  
      if (error.response) {
        if (error.response.status === 401) {
          // Token is invalid or expired
          await AsyncStorage.clear(); // Clear all AsyncStorage data
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Reset navigation stack and navigate to Home
          });
        } else if (error.response.status === 500) {
          // Server error
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Navigate to Home page
          });
        }
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#747EEF',
        tabBarInactiveTintColor: '#808080',
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: Fonts.MEDIUM,
          marginTop: -5,
        },
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: Fonts.BOLD,
          marginLeft: 0,
        },
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          borderColor: 'white',
          backgroundColor: 'white',
        },
      })}
    >
      <Tab.Screen
        name="DashboardMain"
        component={DashboardMain}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" color={color} size={27} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          title: `Hi, ${name?.username}`,
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'white',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            borderTopColor: 'white',
            elevation: 0,
            borderBottomColor: 'white',
            borderBottomWidth: 0,
          },
          headerTitleAlign: 'left',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -5 }}>
              <TouchableOpacity onPress={() => navigation.navigate('EditProfileInfor')}>
                <Image source={require('../../../assets/Person.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Notifcationscreen')}>
                <Image source={require('../../../assets/Bell.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => <Location name="share-location" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 13 }} onPress={() => navigation.navigate('DashboardMain')}>
              <BackIcon name="arrowleft" size={23} color="#747EEF" style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Job Bookings</Text>
            </TouchableOpacity>
          ),
          title: null,
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ color }) => <SettingIcon name="calendar" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="PlayerProfile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 13 }} onPress={() => navigation.navigate('DashboardMain')}>
              <BackIcon name="arrowleft" size={23} color="#747EEF" style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext, { marginLeft: -10 }]}>Your Profile</Text>
            </TouchableOpacity>
          ),
          title: null,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -5 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <SettingIcon name="setting" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Entypo name="user-circle-o" color={color} size={25} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  backicontext: {
    color: '#212121',
    fontSize: 16,
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
});

export default MyTabs;
