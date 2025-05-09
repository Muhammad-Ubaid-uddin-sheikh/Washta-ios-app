import React, {  useState, useCallback } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import BookingCompeleted from '../../allDynamicsComponets/BookingComplted';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { useFocusEffect } from '@react-navigation/native';
import { FontsGeneral } from '../style';
import Nobokking from '../../../assets/washtacencel.png';

const Completed = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log('datacencel', data);

  const fetchUserData = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get('https://backend.washta.com/api/customer/bookingbyStatus?status=cancelled', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.data.status) {
        setData(response.data.data.reverse());
      } else {
        toast.show('Failed to fetch data', { type: 'danger', animationType: 'zoom-in', duration:1000});
        setData([]);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.show(errorMessage, { type: 'danger', animationType: 'zoom-in', duration:1000});
    } finally {
      setLoading(false);
      setRefreshing(false);
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

  // ✅ Filtered Data Example (in case you need to filter specific conditions)
  const filteredData = [
    ...data.filter(item => item.billingStatus !== "non-paid") // optional filter, based on requirement
  ];

  return (
    <View style={styles.MainContainer}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#747EEF" />
        </View>
      ) : filteredData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image style={styles.imageWidthongoing} source={Nobokking} />
          <Text style={styles.noDataText}>No Cancelled Booking</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <BookingCompeleted
                order={item}
                showButton={false}
                ReviewBtn={() => console.log('Review Button Pressed')}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#747EEF']}
            />
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
    height: 300,
    objectFit: 'contain',
  },
  itemContainer: {
    marginBottom: 10, // optional: adds spacing between list items
  },
});

export default Completed;
