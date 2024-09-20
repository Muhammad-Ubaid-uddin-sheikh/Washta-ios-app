// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

// const Profile = () => {
//   // Sample data for explore items
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Jobs</Text>
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   card: {
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//     marginBottom: 20,
//     overflow: 'hidden',
//     elevation: 2, // For Android shadow effect
//   },
//   cardImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//   },
//   cardText: {
//     fontSize: 18,
//     color: '#333',
//     padding: 10,
//     textAlign: 'center',
//   },
// });

// export default Profile;
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import ImageEdit from '../../allDynamicsComponets/ImageAdd';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontsGeneral } from '../style';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Dot from 'react-native-vector-icons/Entypo';
import BokingCompleted from '../../allDynamicsComponets/BookingComplted';
import axios from 'react-native-axios';
import { useToast } from 'react-native-toast-notifications';

const ApiUrl = 'https://backend.washta.com/api/customer/Selectcar';

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [seletedata, setseletedata] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();

  const getUserFromStorage = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setName(user);
        return user;
      } else {
        console.log('No user data found');
        return null;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };
  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(ApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.status) {
        setseletedata(response.data.data);
        console.log(response.data.data)
      } else {
        toast.show('Failed to fetch data', { type: 'danger', animationType: 'zoom-in' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.show(errorMessage, { type: 'danger', animationType: 'zoom-in' });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getUserFromStorage();
    fetchUserData();
  }, []);

  const bookingData = [
    {
      type: 'booking',
      data: {
        Name: 'John Doe Car Hub',
        orderId: 'CS-1095',
        OrderDate: '20 FEB',
        Cost: 'AED 20',
        transparentBtn: 'Cancel',
        colorBtntext: 'Track Progress',
      },
    },
    {
      type: 'booking',
      data: {
        Name: 'John ',
        orderId: 'SS-1295',
        OrderDate: '10 FEB',
        Cost: 'ABD 40',
        transparentBtn: 'Cancel',
        colorBtntext: 'Track Progress',
      },
    },
  ];

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.row}>
        <View style={{ width: '25%' }}>
          <ImageEdit />
        </View>
        <View style={[styles.ShoeConText, { width: '75%', marginBottom: 10 }]}>
          <Text style={[styles.textPoints, { width: 230 }]} numberOfLines={1} ellipsizeMode="tail">
            {name?.username}
          </Text>
          <Text style={[styles.paragraph, { width: 230 }]} numberOfLines={1} ellipsizeMode="tail">
            {name?.email}
          </Text>
        </View>
      </View>

      <View style={[styles.secondDivTitle,{padding:0}]}>
        <Text style={styles.textPoints}>Vehicle </Text>
        <View style={styles.mainBoxCarNameSelect}>
          <View>
            <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 14, color: 'black' }}>
              {seletedata?.vehicleManufacturer} {seletedata?.vehicleName}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: FontsGeneral.REGULARSANS, fontSize: 13, color: 'black' }}>
                {seletedata?.vehicleType}
              </Text>
              <Dot name="dot-single" size={20} color={'black'} />
              <Text style={{ fontFamily: FontsGeneral.REGULARSANS, fontSize: 13, color: 'black' }}>
                {seletedata?.vehiclePlateNumber}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectCar')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#747EEF',
                paddingHorizontal: 6,
                paddingVertical: 3,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 13, color: 'white' }}>Change</Text>
              <Arrow name="keyboard-arrow-right" size={24} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.secondDivTitle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor:'white' }]}>
        <Text style={styles.textPoints}>Job Bookings </Text>
        <Text style={styles.ViewallText}>view all </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    if (item.type === 'booking') {
      return <BokingCompleted showButton={false} data={item.data} />;
    }
    return null;
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#747EEF" />
      </View>
    );
  }

  return (
    <FlatList
      data={[{ type: 'header' }, ...bookingData]} // Prepend a header item
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={renderHeader}
      renderItem={renderItem}
      style={{backgroundColor:'white',paddingHorizontal:18}}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor:'white'
  },
  mainBoxCarNameSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  ViewallText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 16,
    color: '#747EEF',
  },
  secondDivTitle: {
    paddingTop: 20,
  },
  rowtopFeild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    flexDirection: 'row',
    gap: 10,
  },
  mainContent: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    width: '100%',
    backgroundColor:'white'
  },
  textPoints: {
    fontSize: 20,
    lineHeight: 24,
    color: '#000',
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
  ShoeCon: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  ShoeContainer: {
    marginTop: 5,
  },
  MainContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonContainer: {
    marginTop: 30,
  },
  paragraph: {
    fontSize: 16,
    color: '#61646B',
    letterSpacing: 0.1,
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Profile;
