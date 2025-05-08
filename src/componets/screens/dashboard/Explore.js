import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';

const ApiUrl  = 'https://backend.washta.com/api/customer/shop';
const NearbyApiUrl = 'https://backend.washta.com/api/customer/NearShop?';

const Explore = ({ navigation }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allshop,setallShop] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const location = useSelector((state) => state.locations.location);
  const [locationData, setLocationData] = useState(null); // To store the full location data
 console.log('data',data)
  const fetchLocationLat = async () => {
    try {
      const locationJson = await AsyncStorage.getItem('currentlocationlat');
      if (locationJson !== null) {
        const parsedLocation = JSON.parse(locationJson); // Parse the JSON string
        setLocationData(parsedLocation); // Store the full location data if needed
      } else {
        console.log('erorr')
      }
    } catch (error) {
      console.log('erorr')

    }
  }
  console.log('filteredData',filteredData)
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

  // const fetchNearbyShops = async () => {
  //   const accessToken = await AsyncStorage.getItem('accessToken');
  //   setLoading(true);
  //   try {
  //     const lat = locationData?.latitude || 24.959507;
  //     const long = locationData?.longitude || 67.099260;
  //     const radius = 2000;

  //     const response = await axios.get(`${NearbyApiUrl}long=${long}&lat=${lat}&radius=${radius}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`, // Correctly formatted Bearer token
  //       },
  //     });
  //     if (response.data.status) {
  //       setData(response.data.data);
        
  //     } else {
  //       toast.show('Failed to fetch nearby shops', { type: 'danger', animationType: 'zoom-in' });
  //     }
  //   } catch (error) {
  //     const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
  //     toast.show(errorMessage, { type: 'danger', animationType: 'zoom-in' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchNearbyShops = async (locationData) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    setLoading(true);
    try {
      const lat = locationData?.latitude || 24.959507; // fallback: Abu Dhabi
      const long = locationData?.longitude || 67.099260;
      const radius = 50;
  
      const response = await axios.get(
        `${NearbyApiUrl}long=${lat}&lat=${long}&radius=${radius}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data.data);
      if (response.data.status) {
        setData(response.data.data);
      } else {
        toast.show('Failed to fetch nearby shops', {
          type: 'danger',
          animationType: 'zoom-in',
        });
      }
    } catch (error) {
      
      console.log('errpr',error.response?.data)
    } finally {
      setLoading(false);
    }
  };
  
  const fetchUserData = async () => {
    setLoading(true); // Start loading
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      // Make sure the token exists before making the API call
      if (accessToken) {
        const response = await axios.get(ApiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Correctly formatted Bearer token
          },
        });
        if (response.data.status) {
          setallShop(response.data.data); // Set the received data
          setFilteredData(response.data.data);
        } else {
          toast.show('Failed to fetch data', { type: 'danger', animationType: 'zoom-in' });
        }
      } else {
        toast.show('No access token found', { type: 'danger', animationType: 'zoom-in' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.show("Nodata", { type: 'danger', animationType: 'zoom-in' });
    } finally {
      setLoading(false); // Stop loading after the API call completes
    }
  };
  const onSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = allshop.filter(shop =>
        shop.shopName.toLowerCase().includes(query.toLowerCase()) ||
        shop.location.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to full list when query is empty
    }
  }, [searchQuery]);
  const handleMapIconClick = () => {
    inputRef.current.focus(); // Focus the TextInput when the map icon is clicked
  };
  const loadLocationAndFetchShops = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('currentlocationlat');
      if (storedLocation) {
        const parsedLocation = JSON.parse(storedLocation);
        fetchNearbyShops(parsedLocation);
      } else {
        // fallback to Abu Dhabi if no stored location
        fetchNearbyShops({ latitude: 24.959507, longitude: 67.099260 });
      }
    } catch (error) {
      console.log('Error loading location:', error);
      // fallback to Abu Dhabi in case of error too
      fetchNearbyShops({ latitude: 24.959507, longitude: 67.099260 });
    }
  };
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadLocationAndFetchShops().then(() => setRefreshing(false));
  }, []);
  useFocusEffect(
    useCallback(() => {
      // Code to run when the screen is focused
      requestLocationPermission();
      loadLocationAndFetchShops();
      fetchUserData();
      fetchLocationLat();
    }, []) // Dependencies for the callback (leave empty if no dependencies)
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ParticularCarScreen', { item ,notlocation:""})}>
      <DetailSlider
        rating={item.reviewsSummary?.averageRating || 0}
        imageUrl={item.coverImage && item.coverImage.includes('/media/image/cover-image.jpeg')
          ? 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'
          : item.coverImage || 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'}
        name={item.shopName}
        time={item.estimatedServiceTime || "N/A"}
        reviews={item.cost || "N/A"}
        km={item.location?.text || "Unknown"}
        margin={false}
      />
    </TouchableOpacity>
  );
  const renderItemNotLocation = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ParticularCarScreen', { item ,notlocation:"notlocation"})}>
      <DetailSlider
        rating={item.reviewsSummary?.averageRating || 0}
        imageUrl={item.coverImage && item.coverImage.includes('/media/image/cover-image.jpeg')
          ? 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'
          : item.coverImage || 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'}
        name={item.shopName}
        time={item.estimatedServiceTime || "N/A"}
        reviews={item.cost || "N/A"}
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
console.log('location',location)
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
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.LocationSubHeading,{width:'82%'}]}>
              {location || 'No location found'}
            </Text>
          </View>
          <View style={styles.RowStyle}>
            <View style={styles.searchbarContainer}>
              <Search name='search' style={styles.Searchicon} size={30} />
              <TextInput
               ref={inputRef}
                style={styles.input}
                placeholder="Search Shop"
                placeholderTextColor="rgba(33, 33, 33, 0.60)"
                value={searchQuery}
                onChangeText={onSearch}
              />
            </View>
            <TouchableOpacity onPress={handleMapIconClick} >
            <View  style={{  flexDirection: 'row', justifyContent: 'center', alignItems: 'center',borderWidth:1,borderColor: '#b3b3b3',padding: 10,borderRadius: 100,marginRight:4  }}>
              <Map name="map-marked-alt" size={22} color={'black'}  />
            </View> 
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
          <Image source={require('../../../assets/bannerexplore.png')} style={{ width: '100%', height: 160, objectFit: 'contain' }} />
        </View>
       
      {searchQuery.length > 0 && (
  <>
    <Text style={[styles.headingSubMain, { fontSize: 19, paddingTop: 12, paddingBottom: 10 }]}>
      Search Results
    </Text>

    {loading ? (
      renderSkeleton()
    ) : (
      Array.isArray(filteredData) && filteredData.length === 0 ? (
        <View style={{textAlign:'center'}}>
 <Image source={require('../../../assets/nodataShop.jpg')} style={{objectFit:'contain',width:'100%',height:100,justifyContent:'center',textAlign:'center'}}/>
 <Text style={[styles.noDataText, { paddingTop: 20,paddingLeft:15,textAlign:'center',fontSize:15}]}>No shops available at the moment.</Text>
        </View>
       
      ) : (
        <FlatList
          data={Array.isArray(filteredData) ? filteredData : [filteredData]}
          renderItem={renderItemNotLocation}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
        />
      )
    )}
  </>
)}

          <Text style={[styles.headingSubMain, { fontSize: 19, paddingTop: 12, paddingBottom: 10 }]}>Nearby Shops</Text>
              
         {loading ? (
      renderSkeleton()
    ) : (
      Array.isArray(data) && data.length === 0 ? (
        <View style={{textAlign:'center'}}>
 <Image source={require('../../../assets/nodataShop.jpg')} style={{objectFit:'contain',width:'100%',height:100,justifyContent:'center',textAlign:'center'}}/>
 <Text style={[styles.noDataText, { paddingTop: 20,paddingLeft:15,textAlign:'center',fontSize:15}]}>No shops available at your location.</Text>
        </View>
       
      ) : (
        <FlatList
          data={Array.isArray(data) ? data : [data]} // Ensure it's an array
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
        />
      )
    )}
  

        <Text style={[styles.headingSubMain, { fontSize: 19, paddingTop: 12, paddingBottom: 10 }]}>Car Detailing Studios</Text>
        {loading ? renderSkeleton() : (
          <FlatList
            data={allshop}
            renderItem={renderItemNotLocation}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
          />
        )}
      </View>
    </ScrollView>
  );
};

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
    paddingTop: 11,
  },
  LocationSubHeading: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 14,
    color: 'black',
  },

});

export default Explore;
