// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

// const Explore = () => {
//   // Sample data for explore items
//   const exploreData = [
//     { id: '1', title: 'Beautiful Beach', image: require('../../../assets/complted.png') },
//     { id: '2', title: 'Mountain Adventure', image: require('../../../assets/complted.png') },
//     { id: '3', title: 'City Lights', image: require('../../../assets/complted.png') },
//     { id: '4', title: 'Forest Trails', image: require('../../../assets/complted.png') },
//   ];

//   const renderExploreItem = ({ item }) => (
//     <TouchableOpacity style={styles.card}>
//       <Image source={item.image} style={styles.cardImage} />
//       <Text style={styles.cardText}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Explore</Text>
//       <FlatList
//         data={exploreData}
//         renderItem={renderExploreItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.list}
//         showsVerticalScrollIndicator={false}
//       />
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

// export default Explore;
import React, { useEffect, useState, useCallback } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  ScrollView, 
  PermissionsAndroid, 
  TouchableOpacity, 
  Platform, 
  TextInput, 
  FlatList, 
  RefreshControl 
} from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import axios from 'react-native-axios';
import Search from 'react-native-vector-icons/EvilIcons';
import Map from 'react-native-vector-icons/FontAwesome5';
import DetailSlider from '../../allDynamicsComponets/DetailsVerticalCom';
import { Fonts } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from "@thevsstech/react-native-skeleton";
import { useSelector } from 'react-redux';

const ApiUrl  = 'https://backend.washta.com/api/customer/shop';

const Explore = ({ navigation }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const location = useSelector((state) => state.locations.location);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (granted === 'authorized') {
        console.log('Location permission granted');
      } 
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(ApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.status) {
        setData(response.data.data);
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
    fetchUserData().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    requestLocationPermission();
    fetchUserData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ParticularCarScreen', { item })}>
      <DetailSlider
        rating={item.reviewsSummary.averageRating}
        imageUrl={item.coverImage && item.coverImage.includes('/media/image/cover-image.jpeg')
          ? 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'
          : item.coverImage || 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'}
        name={item.shopName}
        time={item.estimatedServiceTime}
        reviews={item.cost}
        km={item.location.String}
        margin={false}
      />
    </TouchableOpacity>
  );

  const renderSkeleton = () => (
    <>
      {Array(1).fill(0).map((_, index) => (
        <Skeleton 
          key={index}
          width={'28%'} 
          height={100} 
          highlightColor={'#747eef57'} 
          backgroundColor={'#747eef6e'} 
          borderRadius={12} 
          visible={false}
          style={{ marginHorizontal: 10,marginVertical:20,flexDirection:'row'}}
        >
          <View style={{ flexDirection: 'row', paddingHorizontal: 10,gap:15 }}>
          <View style={{width:'50%'}}>
          <Skeleton.Item 
            width={'100%'} 
            height={110} 
            borderRadius={8} 
            marginTop={6} 
          />
          <Skeleton.Item 
            width={'100%'} 
            height={10} 
            borderRadius={8} 
            marginTop={5} 
          />
          <Skeleton.Item 
            width={'20%'} 
            height={10} 
            borderRadius={5} 
            marginTop={5} 
          />
          </View>
          <View style={{width:'50%'}} >
          <Skeleton.Item 
            width={'100%'} 
            height={110} 
            borderRadius={8} 
            marginTop={6} 
          />
          <Skeleton.Item 
            width={'100%'} 
            height={10} 
            borderRadius={8} 
            marginTop={5} 
          />
          <Skeleton.Item 
            width={'20%'} 
            height={10} 
            borderRadius={8} 
            marginTop={5} 
          />
          </View>
          </View>
        </Skeleton>
      ))}
      </>
  );

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false} 
      backgroundColor={'white'}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.rowContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, paddingHorizontal: 10 }}>
            <Ionicons name="location-sharp" color={'#747EEF'} size={20} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.LocationSubHeading,{width:'82%'}]}> {location || 'no location find'}</Text>
          </View>
          <View style={styles.RowStyle}>
            <View style={styles.searchbarContainer}>
              <Search name='search' style={styles.Searchicon} size={30} />
              <TextInput
                style={styles.input}
                placeholder="Search Service"
                placeholderTextColor="rgba(33, 33, 33, 0.60)"
              />
            </View>
            <View style={{ width: '16%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Map name="map-marked-alt" size={22} color={'black'} style={{ borderWidth: 1, borderRadius: 50, padding: 10, borderColor: '#b3b3b3' }} />
            </View> 
          </View>
        </View>
        
        <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
          <Image source={require('../../../assets/bannerexplore.png')} style={{ width: '100%', height: 160, objectFit: 'contain' }} />
        </View>
        <Text style={[styles.headingSubMain, { fontSize: 19, paddingTop: 12, paddingBottom: 10 }]}>Studios Near you</Text>
        {loading ? renderSkeleton() : (
          <FlatList
            data={data}  
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
          />
        )}
        <Text style={[styles.headingSubMain, { fontSize: 19, paddingTop: 12, paddingBottom: 10 }]}>Car Detailing Studios</Text>
        {loading ? renderSkeleton() : (
          <FlatList
            data={data}  
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
          />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 15,
  },
  headingSubMain: {
    color: 'black',
    fontFamily: Fonts.MEDIUM,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  RowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 15,
    width: '100%',
  },
  searchbarContainer: {
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    height: 48,
    borderColor: '#b3b3b3',
    paddingHorizontal: 5,
    width: '84%',
  },
  Searchicon: {
    color: 'black',
    paddingTop: 9,
  },
  LocationSubHeading: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 14,
    color: 'black',
  },
})

export default Explore;
