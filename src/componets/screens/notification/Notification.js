import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from "@thevsstech/react-native-skeleton";
import { Fonts } from '../style';
import { formatDate, formatTimeInTimezone } from '../../../../DaterightFunction';

const APIRUL = 'https://backend.washta.com/api/customer/Notifications';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch(APIRUL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setNotifications(responseData.data.reverse());
        console.log('responseData.data.reverse',responseData.data)

      } else {
        console.error('API Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <View style={{width:'10%'}}>
      <Image style={{width:50,height:50,borderRadius:5,}} source={require('../../../assets/app.logo.jpeg')}/>
      </View>
      
      <View style={{width:'90%'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
      <Text style={[styles.title,{width:'55%'}]}>{item.notification.title}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.body,{width:'45%',fontSize:10,padding:0,margin:0,textAlign:'right',paddingRight:30}]}>{formatDate(item?.createdAt)} || {formatTimeInTimezone(item?.createdAt)} </Text>
      </View>
     
      <Text style={styles.body}>{item.notification.body}</Text>
      </View>
     
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {loading ? (
         <FlatList
         data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
         renderItem={() => (
           <Skeleton
           highlightColor={'#747eef57'} 
           backgroundColor={'#747eef6e'} 
             borderRadius={'20'}
             visible={false}
           >
             <View style={{ height: 60, borderRadius: 10,}} />
             <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginTop: 10 }}>
             </View>
           </Skeleton>
         )}
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
       />
      ) : notifications.length === 0 ? (
        <View style={styles.noMessagesContainer}>
          <Image source={require('../../../assets/noNotification.jpg')} style={styles.emptyIcon} />
          <Text style={styles.noMessagesText}>No notifications available</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.scrollcontainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title:{
    fontFamily:Fonts.MEDIUM,
    color:'black',
    paddingBottom:5,
    fontSize:15
  },
  body:{
    fontFamily:Fonts.REGULAR,
    fontSize:13,
    color:'black'
  },
  notificationContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:30,
    borderWidth:1,
    width:'100%',
    padding:5,
    marginBottom:10,
    backgroundColor:'#747eef57',
    borderRadius:10,
    justifyContent:'space-between',
    borderColor:'#747eef6e',
  }, 
  scrollcontainer: {
    flexGrow: 1,
    justifyContent: 'start',
    alignItems: 'start',
    paddingLeft: 5,
    paddingRight: 5,
    width:'100%'
    
  },
  row: {
    flexDirection: 'row', // Arrange points and text horizontally
    alignItems: 'center', // Center content vertically
    justifyContent: 'space-between',
  },
  MainContainer: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    width:'100%',
    paddingHorizontal:10,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
  },
  noMessagesText: {
    fontSize: 16,
    color: 'black',
    letterSpacing: 0.1, 
    fontFamily: Fonts.MEDIUM,
    flexDirection:'row',justifyContent:'center',alignItems:'center'
  },
  noMessagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // paddingTop: 20,
    height: '100%',
  },
  emptyIcon: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default NotificationsScreen;
