import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, StyleSheet, Text, Image } from 'react-native';
import BookingComp from '../../allDynamicsComponets/BookingComponet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { useToast } from 'react-native-toast-notifications';
import { useFocusEffect } from '@react-navigation/native';
import { FontsGeneral } from '../style';
import { formatDate, formatTimeInTimezone } from '../../../../DaterightFunction';
import Nobokking from '../../../assets/nobokking.png'
const Profile = ({ navigation }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [onProgressData, setOnProgressData] = useState([]);
  const [ongoingData, setOngoingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFetched = useRef(false);

  const cancelButton = async (item) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.patch(`https://backend.washta.com/api/customer/booking/${item._id}`, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.data.status) {
        toast.show('Booking canceled successfully', { type: 'success', animationType: 'zoom-in' });
        fetchUserData(); // Refresh the data after successful cancellation
      } else {
        toast.show('Failed to cancel booking', { type: 'danger', animationType: 'zoom-in' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.show(errorMessage, { type: 'danger', animationType: 'zoom-in' });
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const [onProgressResponse, ongoingResponse] = await Promise.all([
        axios.get('https://backend.washta.com/api/customer/bookingbyStatus?status=inprocess', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        axios.get('https://backend.washta.com/api/customer/bookingbyStatus?status=ongoing', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      ]);

      if (onProgressResponse.data.status) {
        setOnProgressData(onProgressResponse.data.data.reverse());
      } else {
        setOnProgressData([]);
      }

      if (ongoingResponse.data.status) {
        setOngoingData(ongoingResponse.data.data);
      } else {
        setOngoingData([]);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.show(errorMessage, { type: 'danger', animationType: 'zoom-in' });
    } finally {
      setLoading(false);
      setRefreshing(false);
      isFetched.current = true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const onRefresh = () => {
    fetchUserData();
  };

  return (
    <View style={styles.MainContainer}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#747EEF" />
        </View>
      ) : onProgressData.length === 0 && ongoingData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image
            style={styles.imageWidthongoing}
            source={Nobokking}
          />
          <Text style={styles.noDataText}>No On-Going Booking</Text>
        </View>
      ) : (
        <FlatList
          data={[...onProgressData, ...ongoingData]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookingComp
            date={formatDate(item?.date)}
            time={formatTimeInTimezone(item?.date)}
              colorBtntext="Track Progress"
              transparentBtn="Cancel"
              CencelBtn={() => cancelButton(item)}
              TrackBtn={() => navigation.navigate('TrackProgess', { item })}
              data={item}
              showCancelBtn={item.status === 'ongoing'}
              showTimer={item.status === 'ongoing'}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#747EEF']} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 15,
    color: 'black',
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
  imageWidthongoing: {
    width: '100%',
    height: 320,
    objectFit: 'contain',
  },
});

export default Profile;
