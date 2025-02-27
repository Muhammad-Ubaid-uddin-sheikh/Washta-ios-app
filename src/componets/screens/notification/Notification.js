import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from "@thevsstech/react-native-skeleton";
import { Fonts } from '../style';
import { formatDate, formatTimeInTimezone } from '../../../../DaterightFunction';

const APIRUL = 'https://backend.washta.com/api/customer/Notifications';
const { width } = Dimensions.get('window'); // Get screen width

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
        setNotifications(responseData.data);
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
      <Image  style={[styles.notificationImage,{ width: 43, height: 45, borderRadius: 8,borderWidth:0,borderColor:'white'}]}source={require('../../../assets/PurpleIcon.png')} />
      <View style={styles.notificationTextContainer}>
        <View style={styles.notificationHeader}>
          <Text style={styles.title}>{item.notification.title}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.dateText}>
            {formatDate(item?.createdAt)} || {formatTimeInTimezone(item?.createdAt)}
          </Text>
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
              <View style={styles.loadingSkeleton} />
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
  title: {
    fontFamily: Fonts.MEDIUM,
    color: 'black',
    paddingBottom: 5,
    fontSize: width > 400 ? 16 : 14, // Adjust size based on screen width
  },
  body: {
    fontFamily: Fonts.REGULAR,
    fontSize: width > 400 ? 14 : 12,
    color: 'black',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#747eef57',
    borderRadius: 10,
    borderColor: '#747eef6e',
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateText: {
    fontSize: 10,
    padding: 0,
    margin: 0,
    textAlign: 'right',
  },
  scrollcontainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  MainContainer: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  noMessagesText: {
    fontSize: 16,
    color: 'black',
    letterSpacing: 0.1,
    fontFamily: Fonts.MEDIUM,
  },
  noMessagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  emptyIcon: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  loadingSkeleton: {
    height: 60,
    borderRadius: 10,
  },
});

export default NotificationsScreen;
