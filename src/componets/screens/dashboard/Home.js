// import React, { useCallback, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Alert, BackHandler, Image } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Geocoder from 'react-native-geocoding';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Parking from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Fonts } from '../style';
// import axios from 'react-native-axios';
// import DetailSlider from '../../allDynamicsComponets/DetailsVerticalCom';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geolocation from '@react-native-community/geolocation';
// import Skeleton from "@thevsstech/react-native-skeleton";
// import { useFocusEffect } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { addLocation } from '../../../redux/locationSlice';
// import ParkingIcon from '../../../assets/image 2.png'

// Geocoder.init('AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s');
// // const ApiUrl = 'https://backend.washta.com/api/customer/shop';
// const ApiUrl ="https://backend.washta.com/api/customer/NearShop?long=24.959507&lat=67.099260&radius=2000"
// const Home = ({ navigation }) => {
//   const [name, setName] = useState('');
//   // const [currentLocation, setCurrentLocation] = useState({ 
//   //   latitude: 25.276987, 
//   //   longitude: 55.296249, 
//   //   latitudeDelta: 0.0922, 
//   //   longitudeDelta: 0.0421, 
//   // });
//   console.log('nameaa',name)
//   const [currentLocation, setCurrentLocation] = useState({ 
//     latitude: 24.4539,  // Abu Dhabi Latitude
//     longitude: 54.3773, // Abu Dhabi Longitude
//     latitudeDelta: 0.0922, 
//     longitudeDelta: 0.0421, 
//   });
//   console.log('currentLocation',currentLocation)
//   const [ParkingData,setParkingData] = useState([])
//   const fetchParkingData = async (latitude, longitude) => {
//     const apiKey = 'AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s';
//     const radius = 1000; // Search within 1000 meters
//     const type = 'parking'; // Search for parking locations
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
  
//     try {
//       const response = await axios.get(url);
//       console.log("API Response:", response.data); // Log the full API response for debugging
  
//       if (response.data.results && Array.isArray(response.data.results)) {
//         const parkingData = response.data.results
//           .filter(
//             result =>
//               result.geometry && // Check if geometry exists
//               result.geometry.location && // Check if location exists
//               result.place_id && // Check if place_id exists
//               result.name // Ensure the name exists
//           )
//           .map(result => ({
//             id: result.place_id,
//             latitude: result.geometry.location.lat,
//             longitude: result.geometry.location.lng,
//             title: result.name,
//           }));
//         return parkingData;
//       } else {
//         console.warn("No results or invalid results format in API response");
//         return [];
//       }
//     } catch (error) {
//       console.error('Error fetching parking data:', error.message);
//       return [];
//     }
//   };
//   const [areaName, setAreaName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [mapReady, setMapReady] = useState(false);

 
// console.log('areaname',areaName)
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (areaName) {
//       dispatch(addLocation(areaName));
//       AsyncStorage.setItem('currentlocationlat',JSON.stringify(currentLocation))
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
//         return true; // Prevent default behavior (going back)
//       };

//       // Add event listener for back button press
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       // Cleanup function to remove event listener
//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, [])
//   );

//   // const getUserFromStorage = async () => {
//   //   try {
//   //     const userString = await AsyncStorage.getItem('user');
//   //     if (userString) {
//   //       const user = JSON.parse(userString);
//   //       setName(user);
//   //       return user;
//   //     } else {
//   //       console.log('No user data found');
//   //       return null;
//   //     }
//   //   } catch (error) {
//   //     console.error('Error parsing user data:', error);
//   //     return null;
//   //   }
//   // };
//   const getUserFromStorage = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken');
//       const response = await axios.get('https://backend.washta.com/api/Customer/Profile', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
// console.log('response.data.data',response.data.data)
//       if (response.data.status) {
//         setName(response.data.data || {});
//         const userInfo = {
//           fullName: response.data.data.fullName,
//           email: response.data.data.email,
//           username: response.data.data.username,
//         };
      
//         await AsyncStorage.setItem('FullName', JSON.stringify(userInfo));
//       } else {
//         Alert.alert('Failed to fetch user data');
//       }
//     } catch (error) {
//       console.log('Error fetching user data:', error);
  
//       if (error.response) {
//         if (error.response.status === 401) {
//           // Token is invalid or expired
//           await AsyncStorage.clear(); // Clear all AsyncStorage data
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Home' }],
//           });
          
//         } else if (error.response.status === 500) {
//           // Server error
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Home' }], // Navigate to Home page
           
//           });
          
//         }
//       }
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
  

//   // const fetchUserData = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const accessToken = await AsyncStorage.getItem('accessToken');
//   //     const response = await axios.get(`https://backend.washta.com/api/customer/NearShop?long=${currentLocation?.latitude}&lat=${currentLocation?.longitude}&radius=2000`,
//   //     );
//   // setData(response.data.data)

//   //     if (response.data.status) {
//   //       setData(response.data.data)
//   //     } else {
//   //       console.log('Failed to fetch data');
//   //     }
//   //   } catch (error) {
//   //     console.log('Error fetching user data:', error);
  
//   //     if (error.response) {
//   //       if (error.response.status === 401) {
//   //         await AsyncStorage.clear(); 
//   //         navigation.reset({
//   //           index: 0,
//   //           routes: [{ name: 'Home' }], 
//   //         });
//   //       } else if (error.response.status === 500) {
//   //         navigation.reset({
//   //           index: 0,
//   //           routes: [{ name: 'Home' }],
//   //         });
//   //       }
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const fetchUserData = async (location) => {
//     setLoading(true);
//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken');
//       const response = await axios.get(
//         `https://backend.washta.com/api/customer/NearShop?long=${location.longitude}&lat=${location.latitude}&radius=50`
//       );
  
//       if (response.data.status) {
//         setData(response.data.data);
//         console.log('Fetched shop data:', response.data.data);
//       } else {
//         console.log('Failed to fetch shop data');
//       }
//     } catch (error) {
//       console.log('Error fetching user data:', error);
  
//       if (error.response) {
//         if (error.response.status === 401) {
//           await AsyncStorage.clear();
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Home' }],
//           });
//         }

//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const loadLocationAndFetchData = async () => {
//     try {
//       const storedLocation = await AsyncStorage.getItem('currentlocationlat');
//       if (storedLocation) {
//         const location = JSON.parse(storedLocation);
//         setCurrentLocation(location); // optional: update state if needed
//         fetchUserData(location); // use stored location
//       } else {
//         console.log('No stored location found');
//       }
//     } catch (error) {
//       console.log('Error loading stored location:', error);
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
//         km={item.location?.text || "Unknown"}
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


//   // const getCurrentLocation = () => {
//   //   Geolocation.getCurrentPosition(
//   //     async position => {
//   //       const { latitude, longitude } = position.coords;
//   //       console.log('Current location:', latitude, longitude);
//   //       setCurrentLocation({ latitude, longitude });
//   //       reverseGeocode(latitude, longitude);
  
//   //       // Fetch parking data
//   //       const parkingData = await fetchParkingData(latitude, longitude);
//   //       setParkingData(parkingData); // Assuming you have a state for parkingData
//   //     },
//   //     error => console.log('Error getting current location:', error.message),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };
//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       async position => {
//         const { latitude, longitude } = position.coords;
//         console.log('Current location:', latitude, longitude);
  
//         const location = { latitude, longitude };
//         setCurrentLocation(location);
  
//         // Save to AsyncStorage
//         try {
//           await AsyncStorage.setItem('currentlocationlat', JSON.stringify(location));
//           console.log('Location saved to AsyncStorage');
//         } catch (e) {
//           console.log('Failed to save location:', e.message);
//         }
  
//         reverseGeocode(latitude, longitude);
  
//         // Fetch parking data
//         const parkingData = await fetchParkingData(latitude, longitude);
//         setParkingData(parkingData);
//       },
//       error => console.log('Error getting current location:', error.message),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };
  

//   const requestLocationPermission = async () => {
//     fetchUserData()
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
//     getUserFromStorage();
//   }, []);
//   // useFocusEffect(
    
//   //   useCallback(() => {
//   //     fetchUserData();
//   //     requestLocationPermission()
//   //   }, [])
//   // );
//   useFocusEffect(
//     useCallback(() => {
//       getUserFromStorage();
//       requestLocationPermission()
//       loadLocationAndFetchData(); // fetch data using stored location
//     }, [])
//   );


//   return (
//     <View style={styles.container}>
//       <View style={styles.mapContainer}>
//         {/* <MapView
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
//           showsUserLocation={true}
//           showsMyLocationButton={true}
//           followsUserLocation={true}
//           onMapReady={() => setMapReady(true)}
//         >
//           {mapReady && currentLocation && (
//             <>
//               <Circle
//                 center={{
//                   latitude: currentLocation.latitude,
//                   longitude: currentLocation.longitude,
//                 }}
//                 radius={1000}
//                 strokeWidth={2}
//                 strokeColor="rgba(74,144,226,1)"
//                 fillColor="rgba(74,144,226,0.2)"
//               />
//               <Marker
//                 coordinate={currentLocation}
//                 title={'Current Location'}
//                 description={areaName}
//               >
//                 <Ionicons name="location-sharp" size={50} color="#0080FF" />
//               </Marker>
//               {parkingData.map(parking => (
//                 <Marker
//                   key={parking.id}
//                   coordinate={{ latitude: parking.latitude, longitude: parking.longitude }}
//                   title={parking.title}
//                 >
//                   <Ionicons name="car-sport" size={30} color="red" />
//                 </Marker>
//               ))}
//             </>
//           )}
//         </MapView> */}
//        <MapView
//         // provider={PROVIDER_GOOGLE}
//         mapType="mutedStandard"
//   style={styles.map}
//   region={currentLocation ? {
//     latitude: currentLocation.latitude,
//     longitude: currentLocation.longitude,
//     latitudeDelta: 0.02,
//     longitudeDelta: 0.02,
//   } : {
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   }}
//   showsUserLocation={true}
//   showsMyLocationButton={true}
//   followsUserLocation={true}
//   onMapReady={() => setMapReady(true)}
// >
  
//   {mapReady && currentLocation && (
//   <>
//     <Circle
//       center={{
//         latitude: currentLocation.latitude,
//         longitude: currentLocation.longitude,
//       }}
//       radius={1000}
//       strokeWidth={2}
//       strokeColor="rgba(74,144,226,1)"
//       fillColor="rgba(74,144,226,0.2)"
//     />
//     <Marker
//       coordinate={currentLocation}
//       title={'Current Location'}
//       description={areaName}
//     >
//       {/* <Ionicons name="location-sharp" size={50} color="#0080FF" /> */}
//     </Marker>
//     {ParkingData.map(parking => (
//       <Marker
//         key={parking.id}
//         coordinate={{ latitude: parking.latitude, longitude: parking.longitude }}
//         title={parking.title}
//       >
//         <View
//           style={{
//             width: 30,
//             height: 30,
//             backgroundColor: '#747EEF', // Circle background color
//             borderRadius: 20, // To make it round
//             borderWidth: 2, // Border thickness
//             borderColor: 'white', // Border color
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: 1, // To create padding for the inner content
//           }}
//         >
         
//           <Image source={ParkingIcon} style={{objectFit:'contain',width:20,height:40,justifyContent:'center',textAlign:'center',padding: 3,}}/>
//         </View>
//       </Marker>
//     ))}
//   </>
// )}

// </MapView>
//         </View>
//          <View style={styles.locationInfoContainer}>
//           <TouchableOpacity
//             onPress={requestLocationPermission}
//             style={styles.refreshButton}
//           >
//             <Ionicons name="refresh" size={24} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.contentParahgrph}>
     
//              <View style={styles.topBar}>
//        <Text style={styles.MainHeading}>Hi there, {name?.fullName || name?.username}</Text>
//          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
//            <Ionicons name="location-sharp" color={'#747EEF'} size={20} />
//            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.LocationSubHeading,{width:'90%'}]}>{areaName}</Text>
//          </View>
//        </View>
//       {/* <Text style={styles.dataHeading}>Nearby Shops</Text> */}
//       {loading ? (
//   renderSkeleton()
// ) : data?.length === 0 ? (
//   <View style={styles.noDataContainer}>
//     <Image
//      style={{objectFit:'contain',width:'100%',height:80,justifyContent:'center',textAlign:'center'}}
//       source={require('../../../assets/nodataShop.jpg')} // Replace with your image path
//     />
//     <Text style={[styles.noDataText,{textAlign:'center',paddingBottom:10,fontSize:15}]}>No Shop Available</Text>
//   </View>
// ) : (
//   <FlatList
//     data={data}
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     renderItem={renderItem}
//     keyExtractor={(item, index) => index.toString()}
//     contentContainerStyle={{ paddingHorizontal: 10 }}
//   />
// )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   // mapContainer: {
//   //   height: 370,
//   //   backgroundColor: '#EFEFEF',
//   // },
//     mapContainer: {
//     flex: 5.5,
//     backgroundColor: '#EFEFEF'
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   locationInfoContainer: {
//     position: 'absolute',
//     top: 20,
//     // left: 10,
//     right:0,    flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 10,
//   },
//   areaNameText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: Fonts.MEDIUM,
//     marginRight: 10,
//   },
//   refreshButton: {
//     backgroundColor: '#747EEF',
//     borderRadius: 50,
//     padding: 8,
//   },
//   dataHeading: {
//     fontSize: 20,
//     fontFamily: Fonts.BOLD,
//     color: '#333333',
//     margin: 15,
//   },
//     topBar: {
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
//        MainHeading: {
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
// });

// export default Home;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Alert, BackHandler, Image } from 'react-native';
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
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addLocation } from '../../../redux/locationSlice';
import ParkingIcon from '../../../assets/image 2.png'
import { AppState } from 'react-native';


Geocoder.init('AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s');
const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ 
    latitude: 24.4539,  
    longitude: 54.3773, 
    latitudeDelta: 0.0922, 
    longitudeDelta: 0.0421, 
  });
  const [shopMarkers, setShopMarkers] = useState([]);
  console.log('currentLocation',currentLocation)
  const [ParkingData,setParkingData] = useState([])
  const fetchParkingData = async (latitude, longitude) => {
    const apiKey = 'AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s';
    const radius = 1000; 
    const type = 'parking'; 
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      console.log("API Response:", response.data); // Log the full API response for debugging
  
      if (response.data.results && Array.isArray(response.data.results)) {
        const parkingData = response.data.results
          .filter(
            result =>
              result.geometry && 
              result.geometry.location && 
              result.place_id && 
              result.name 
            )
          .map(result => ({
            id: result.place_id,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            title: result.name,
          }));
        return parkingData;
      } else {
        console.warn("No results or invalid results format in API response");
        return [];
      }
    } catch (error) {
      console.error('Error fetching parking data:', error.message);
      return [];
    }
  };
  const [areaName, setAreaName] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mapReady, setMapReady] = useState(false);

 console.log('shopMarkers',shopMarkers)

  const dispatch = useDispatch();
  useEffect(() => {
    if (areaName) {
      dispatch(addLocation(areaName));
      AsyncStorage.setItem('currentlocationlat',JSON.stringify(currentLocation))
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
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get('https://backend.washta.com/api/Customer/Profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
console.log('response.data.data',response.data.data)
      if (response.data.status) {
        setName(response.data.data || {});
        const userInfo = {
          fullName: response.data.data.fullName,
          email: response.data.data.email,
          username: response.data.data.username,
        };
      
        await AsyncStorage.setItem('FullName', JSON.stringify(userInfo));
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
            routes: [{ name: 'Home' }],
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

  // const fetchUserData = async (location) => {
  //   setLoading(true);
  //   try {
  //     const accessToken = await AsyncStorage.getItem('accessToken');
  //     const response = await axios.get(
  //       `https://backend.washta.com/api/customer/NearShop?long=${location.longitude}&lat=${location.latitude}&radius=50`
  //     );
  
  //     if (response.data.status) {
  //       setData(response.data.data);
  //       console.log('Fetched shop data:', response.data.data);
  //     } else {
  //       console.log('Failed to fetch shop data');
  //     }
  //   } catch (error) {
  //     console.log('Error fetching user data:', error);
  
  //     if (error.response) {
  //       if (error.response.status === 401) {
  //         await AsyncStorage.clear();
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: 'Home' }],
  //         });
  //       }

  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchUserData = async (location) => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(
        `https://backend.washta.com/api/customer/NearShop?long=${location.longitude}&lat=${location.latitude}&radius=50`
      );
  
      if (response.data.status) {
        const shops = response.data.data;
        setData(shops);
        console.log('Fetched shop data:', shops);
  
        const formattedShops = shops.map(shop => ({
          id: shop._id,
          latitude: shop.location.coordinates[1], // [longitude, latitude]
          longitude: shop.location.coordinates[0],
          title: shop.shopName,
        }));
        setShopMarkers(formattedShops);
      } else {
        console.log('Failed to fetch shop data');
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const loadLocationAndFetchData = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('currentlocationlat');
      if (storedLocation) {
        const location = JSON.parse(storedLocation);
        setCurrentLocation(location);
          fetchUserData(location);
      } else {
        console.log('No stored location found');
      }
    } catch (error) {
      console.log('Error loading stored location:', error);
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
        km={item.location?.text || "Unknown"}
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
      async position => {
        const { latitude, longitude } = position.coords;
        console.log('Current location:', latitude, longitude);
  
        const location = { latitude, longitude };
        setCurrentLocation(location);
  
        // Save to AsyncStorage
        try {
          await AsyncStorage.setItem('currentlocationlat', JSON.stringify(location));
          console.log('Location saved to AsyncStorage');
        } catch (e) {
          console.log('Failed to save location:', e.message);
        }
  
        reverseGeocode(latitude, longitude);
          const parkingData = await fetchParkingData(latitude, longitude);
        setParkingData(parkingData);
      },
      error => console.log('Error getting current location:', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  

  const requestLocationPermission = async () => {
    fetchUserData()
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
    getUserFromStorage();
  }, []);
  useFocusEffect(
    useCallback(() => {
      getUserFromStorage();
      requestLocationPermission()
      loadLocationAndFetchData(); 
    }, [])
  );

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        requestLocationPermission();  // Fetch location + parking again
        loadLocationAndFetchData();   // Fetch shops again
      }
      appState.current = nextAppState;
    });
  
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        
    
{/* <MapView
  mapType="mutedStandard"
  style={styles.map}
  region={currentLocation ? {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.005, 
    longitudeDelta: 0.005,
  } : {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005, 
    longitudeDelta: 0.005,
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
      radius={200} 
      strokeWidth={2}
      strokeColor="rgba(74,144,226,1)"
      fillColor="rgba(74,144,226,0.2)"
    />
    <Marker
      coordinate={currentLocation}
      title={'Current Location'}
      description={areaName}
    >
          </Marker>
        {shopMarkers?.map(shop => (
      <Marker
        key={shop.id}
        coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
        title={shop.title}
      >
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#747EEF', 
            borderRadius: 20, 
            borderWidth: 2,
            borderColor: 'white', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: 1,
          }}
        >
          <Image source={ParkingIcon} style={{objectFit:'contain',width:20,height:40,justifyContent:'center',textAlign:'center',padding: 3,}}/>
        </View>
      </Marker>
    ))}
  </>
)}

</MapView> */}
<MapView
  mapType="mutedStandard"
  style={styles.map}
  region={currentLocation ? {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.002, // <-- CHANGE HERE: Aur zyada zoom ke liye value ko kam kiya gaya hai (e.g., 0.005 se 0.002)
    longitudeDelta: 0.002, // <-- CHANGE HERE: Aur zyada zoom ke liye value ko kam kiya gaya hai (e.g., 0.005 se 0.002)
  } : {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.002, // <-- CHANGE HERE: Default view bhi aur zyada zoom kar diya hai
    longitudeDelta: 0.002, // <-- CHANGE HERE: Default view bhi aur zyada zoom kar diya hai
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
      radius={100} // <-- CHANGE HERE: Zoom level ke hisab se radius ko adjust kiya hai (e.g., 100 meters)
      strokeWidth={2}
      strokeColor="rgba(74,144,226,1)"
      fillColor="rgba(74,144,226,0.2)"
    />
    <Marker
      coordinate={currentLocation}
      title={'Current Location'}
      description={areaName}
    >
      {/* Is Marker ko aap default chhod sakte hain ya custom icon de sakte hain */}
    </Marker>
    
    {/* Aapke shop markers ka code */}
    {shopMarkers?.map(shop => (
      <Marker
        key={shop.id}
        coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
        title={shop.title}
      >
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#747EEF', 
            borderRadius: 20, 
            borderWidth: 2,
            borderColor: 'white', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: 1,
          }}
        >
          <Image source={ParkingIcon} style={{objectFit:'contain',width:20,height:40,justifyContent:'center',textAlign:'center',padding: 3,}}/>
        </View>
      </Marker>
    ))}
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
     
             <View style={styles.topBar}>
       <Text style={styles.MainHeading}>Hi there, {name?.fullName || name?.username}</Text>
         <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
           <Ionicons name="location-sharp" color={'#747EEF'} size={20} />
           <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.LocationSubHeading,{width:'90%'}]}>{areaName}</Text>
         </View>
       </View>
      {loading ? (
  renderSkeleton()
) : data?.length === 0 ? (
  <View style={styles.noDataContainer}>
    <Image
     style={{objectFit:'contain',width:'100%',height:80,justifyContent:'center',textAlign:'center'}}
      source={require('../../../assets/nodataShop.jpg')} // Replace with your image path
    />
    <Text style={[styles.noDataText,{textAlign:'center',paddingBottom:10,fontSize:15}]}>No Shop Available</Text>
  </View>
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