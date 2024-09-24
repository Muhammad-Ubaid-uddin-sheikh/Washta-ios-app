// import React, { useCallback, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Alert, BackHandler } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Geocoder from 'react-native-geocoding';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Fonts } from '../style';
// import axios from 'react-native-axios';
// import DetailSlider from '../../allDynamicsComponets/DetailsVerticalCom';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geolocation from '@react-native-community/geolocation';
// import Skeleton from "@thevsstech/react-native-skeleton";
// import CustomMarker from './CustomMarker';
// import { useFocusEffect } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { addLocation } from '../../../redux/locationSlice';

// Geocoder.init('AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s');
// const ApiUrl = 'https://backend.washta.com/api/customer/shop';

// const Home = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [currentLocation, setCurrentLocation] = useState({ latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,});
//   const [areaName, setAreaName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [mapReady, setMapReady] = useState(false);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (areaName) {
//       dispatch(addLocation(areaName));
//     }
//   }, [areaName]);
//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         Alert.alert(
//           'Exit App',
//           'Are you sure you want to exit?',
//           [
//             { text: 'Cancel', onPress: () => null, style: 'cancel' },
//             { text: 'OK', onPress: () => BackHandler.exitApp() },
//           ],
//           { cancelable: false }
//         );
//         return true;
//       };

//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () =>
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [])
//   );

//   const getUserFromStorage = async () => {
//     try {
//       const userString = await AsyncStorage.getItem('user');
//       if (userString) {
//         const user = JSON.parse(userString);
//         setName(user);
//         return user;
//       } else {
//         console.log('No user data found');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       return null;
//     }
//   };

//   const reverseGeocode = async (latitude, longitude) => {
//     try {
//       const res = await Geocoder.from({ latitude, longitude });
//       if (res.results.length > 0) {
//         const addressComponents = res.results[0].address_components;
//         const relevantComponents = addressComponents.filter(component =>
//           component.types.includes('route') ||
//           component.types.includes('locality') ||
//           component.types.includes('sublocality') ||
//           component.types.includes('administrative_area_level_2') ||
//           component.types.includes('administrative_area_level_1')
//         );
  
//         const formattedAddress = relevantComponents.map(component => component.short_name).join(', ');
//         setAreaName(formattedAddress);
//       } else {
//         console.log('No results found for the given coordinates.');
//       }
//     } catch (error) {
//       console.log('Error getting area name:', error.message);
//     }
//   };
  

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken');
//       const response = await axios.get(ApiUrl, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
  
//       if (response.data.status) {
//         setData(response.data.data);
//       } else {
//         console.log('Failed to fetch data');
//       }
//     } catch (error) {
//       console.log('Error fetching user data:', error);
  
//       if (error.response) {
//         if (error.response.status === 401) {
//           // Token is invalid or expired
//           await AsyncStorage.clear(); // Clear all AsyncStorage data
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Home' }], // Reset navigation stack and navigate to Home
//           });
//         } else if (error.response.status === 500) {
//           // Server error
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Home' }], // Navigate to Home page
//           });
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('ParticularCarScreen', { item })}>
//       <DetailSlider
//         rating={item.reviewsSummary.averageRating}
//         imageUrl={item.coverImage && item.coverImage.includes('/media/image/cover-image.jpeg')
//           ? 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'
//           : item.coverImage || 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'}
//         name={item.shopName}
//         time={item.estimatedServiceTime}
//         reviews={item.cost}
//         km={item.location.String}
//         margin={false}
//       />
//     </TouchableOpacity>
//   );

//   const renderSkeleton = () => (
//     <>
//       {Array(1).fill(0).map((_, index) => (
//         <Skeleton
//           key={index}
//           width={'100%'}
//           height={100}
//           highlightColor={'#747eef57'}
//           backgroundColor={'#747eef6e'}
//           borderRadius={12}
//           visible={false}
//           style={{ marginHorizontal: 10, marginVertical: 20 }}
//         >
//           <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 15, width: '100%' }}>
//             <View style={{ width: '50%' }}>
//               <Skeleton.Item
//                 width={'100%'}
//                 height={110}
//                 borderRadius={8}
//                 marginTop={6}
//               />
//               <Skeleton.Item
//                 width={'100%'}
//                 height={10}
//                 borderRadius={8}
//                 marginTop={5}
//               />
//               <Skeleton.Item
//                 width={'20%'}
//                 height={10}
//                 borderRadius={5}
//                 marginTop={5}
//               />
//             </View>
//             <View style={{ width: '50%' }}>
//               <Skeleton.Item
//                 width={'100%'}
//                 height={110}
//                 borderRadius={8}
//                 marginTop={6}
//               />
//               <Skeleton.Item
//                 width={'100%'}
//                 height={10}
//                 borderRadius={8}
//                 marginTop={5}
//               />
//               <Skeleton.Item
//                 width={'20%'}
//                 height={10}
//                 borderRadius={5}
//                 marginTop={5}
//               />
//             </View>
//           </View>
//         </Skeleton>
//       ))}
//     </>
//   );

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         console.log('Current location:', latitude, longitude); // Debugging log
//         setCurrentLocation({ latitude, longitude });
//         reverseGeocode(latitude, longitude);
//       },
//       error => console.log('Error getting current location:', error.message),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   }

//   const requestLocationPermission = async () => {
//     try {
//       let permission;
//       if (Platform.OS === 'android') {
//         permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//       } else if (Platform.OS === 'ios') {
//         permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//       }

//       const result = await request(permission);

//       if (result === RESULTS.GRANTED) {
//         getCurrentLocation();
//       } else {
//         console.log('Location permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   }

//   useEffect(() => {
//     requestLocationPermission();
//     fetchUserData();
//     getUserFromStorage();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.mapContainer}>
//         <MapView
//           style={styles.map}
//           region={currentLocation ? {
//             latitude: currentLocation.latitude,
//             longitude: currentLocation.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           } : {
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//           // provider={PROVIDER_GOOGLE}
//           showsUserLocation={true}
//           showsMyLocationButton={true}
//           followsUserLocation={true}
//           onMapReady={() => setMapReady(true)}
//         >
//          {/* <MapView
//         style={{ width: '100%', height: '100%' }}
//         // region={region}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//       > */}
//         {/* <Marker coordinate={region} />
//       </MapView> */}
//           {mapReady && currentLocation && (
//             <>
//               <Circle
//                 center={{
//                   latitude: currentLocation.latitude,
//                   longitude: currentLocation.longitude,
//                 }}
//                 radius={1000} // Radius in meters
//               />
//                {data.map((shop, index) => (
//   <Marker
//     key={index}
//     coordinate={{
//       latitude: shop.location.coordinates[1],
//       longitude: shop.location.coordinates[0],
//     }}
//     title={shop.shopName}
//     description={shop.shopDetails}
//     onPress={() => navigation.navigate('ParticularCarScreen', { item: shop })}
//   >
//     <CustomMarker image={shop?.coverImage && shop.coverImage.includes('/media/image/cover-image.jpeg')
//      ? 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'
//       : shop?.coverImage || 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'
//     }/>
//   </Marker>
// ))}
//             </>
//           )}
//         </MapView>
//       </View>
//       <View style={styles.topBar}>
//        <Text style={styles.MainHeading}>Hi there, {name?.username}</Text>
//          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
//            <Ionicons name="location-sharp" color={'#747EEF'} size={20} />
//            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.LocationSubHeading,{width:'90%'}]}>{areaName}</Text>
//          </View>
//        </View>
//        <View style={styles.dataContainer}>
//          {loading ? (
//           renderSkeleton()
//         ) : (
//           <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => item._id + index.toString()}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 10 }}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//      MainHeading: {
//     fontFamily: Fonts.BOLD,
//     fontSize: 25,
//     color: 'black',
//     paddingTop: 10,
//   },
//     LocationSubHeading: {
//     fontFamily: Fonts.MEDIUM,
//     fontSize: 14,
//     color: 'black',
//   },
//   container: {
//     flex: 1,
//     backgroundColor:'white'
//   },
//   mapContainer: {
//     flex: 5.5,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: 'gray',
//   },
//   topBar: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   areaName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginRight: 10,
//     fontFamily: Fonts.headingFont,
//   },
//   areaButton: {
//     backgroundColor: 'lightgray',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   areaButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   dataContainer: {
//     flex: 2,
//     paddingVertical: 10,
//   },

// });

// export default Home;
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Alert, BackHandler } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../style';
import axios from 'react-native-axios';
import DetailSlider from '../../allDynamicsComponets/DetailsVerticalCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import Skeleton from "@thevsstech/react-native-skeleton";
import CustomMarker from './CustomMarker';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addLocation } from '../../../redux/locationSlice';

Geocoder.init('AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s');
const ApiUrl = 'https://backend.washta.com/api/customer/shop';

const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,});
  const [areaName, setAreaName] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mapReady, setMapReady] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (areaName) {
      dispatch(addLocation(areaName));
    }
  }, [areaName]);
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true; // Prevent default behavior (going back)
      };

      // Add event listener for back button press
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup function to remove event listener
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

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

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const res = await Geocoder.from({ latitude, longitude });
      if (res.results.length > 0) {
        const addressComponents = res.results[0].address_components;
        const relevantComponents = addressComponents.filter(component =>
          component.types.includes('route') ||
          component.types.includes('locality') ||
          component.types.includes('sublocality') ||
          component.types.includes('administrative_area_level_2') ||
          component.types.includes('administrative_area_level_1')
        );
  
        const formattedAddress = relevantComponents.map(component => component.short_name).join(', ');
        setAreaName(formattedAddress);
      } else {
        console.log('No results found for the given coordinates.');
      }
    } catch (error) {
      console.log('Error getting area name:', error.message);
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
        console.log('Failed to fetch data');
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
  
      if (error.response) {
        if (error.response.status === 401) {
          await AsyncStorage.clear(); 
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], 
          });
        } else if (error.response.status === 500) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('ParticularCarScreen', { item })}>
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
          width={'100%'}
          height={100}
          highlightColor={'#747eef57'}
          backgroundColor={'#747eef6e'}
          borderRadius={12}
          visible={false}
          style={{ marginHorizontal: 10, marginVertical: 20 }}
        >
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 15, width: '100%' }}>
            <View style={{ width: '50%' }}>
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
            <View style={{ width: '50%' }}>
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
          </View>
        </Skeleton>
      ))}
    </>
  );

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log('Current location:', latitude, longitude); 
        setCurrentLocation({ latitude, longitude });
        reverseGeocode(latitude, longitude);
      },
      error => console.log('Error getting current location:', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  const requestLocationPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      } else if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      }

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestLocationPermission();
    fetchUserData();
    getUserFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={currentLocation ? {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          } : {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          onMapReady={() => setMapReady(true)}
        >
          {mapReady && currentLocation && (
            <>
              <Circle
                center={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                radius={1000}
                strokeWidth={2}
                strokeColor="rgba(74,144,226,1)"
                fillColor="rgba(74,144,226,0.2)"
              />
              <Marker
                coordinate={currentLocation}
                title={'Current Location'}
                description={areaName}
              >
                <Ionicons name="location-sharp" size={50} color="#0080FF" />
              </Marker>
            </>
          )}
        </MapView>
        </View>
         <View style={styles.locationInfoContainer}>
          <TouchableOpacity
            onPress={requestLocationPermission}
            style={styles.refreshButton}
          >
            <Ionicons name="refresh" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentParahgrph}>
        {/* <View style={styles.locationInfoContainer}>
          <Text style={styles.areaNameText}>{areaName}</Text>
          <TouchableOpacity
            onPress={requestLocationPermission}
            style={styles.refreshButton}
          >
            <Ionicons name="refresh" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View> */}
             <View style={styles.topBar}>
       <Text style={styles.MainHeading}>Hi there, {name?.username}</Text>
         <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
           <Ionicons name="location-sharp" color={'#747EEF'} size={20} />
           <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.LocationSubHeading,{width:'90%'}]}>{areaName}</Text>
         </View>
       </View>
      {/* <Text style={styles.dataHeading}>Nearby Shops</Text> */}
      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
       
        />
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // mapContainer: {
  //   height: 370,
  //   backgroundColor: '#EFEFEF',
  // },
    mapContainer: {
    flex: 5.5,
    backgroundColor: '#EFEFEF'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationInfoContainer: {
    position: 'absolute',
    top: 20,
    // left: 10,
    right:0,    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  areaNameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    marginRight: 10,
  },
  refreshButton: {
    backgroundColor: '#747EEF',
    borderRadius: 50,
    padding: 8,
  },
  dataHeading: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: '#333333',
    margin: 15,
  },
    topBar: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  areaName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: Fonts.headingFont,
  },
  areaButton: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  areaButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
       MainHeading: {
    fontFamily: Fonts.BOLD,
    fontSize: 25,
    color: 'black',
    paddingTop: 10,
  },
    LocationSubHeading: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 14,
    color: 'black',
  },
});

export default Home;
