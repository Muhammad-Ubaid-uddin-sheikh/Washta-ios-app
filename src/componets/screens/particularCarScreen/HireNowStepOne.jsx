import React, { useEffect, useState } from 'react';
import { 
    View, Text, StyleSheet, ScrollView, ActivityIndicator, 
    KeyboardAvoidingView, Alert, Platform, PermissionsAndroid, 
    BackHandler, Linking 
} from 'react-native';
import { Fonts, FontsGeneral } from '../style';
import InputFeild from '../../allDynamicsComponets/inputFeilds';
import Button from '../../allDynamicsComponets/Button';
import TransparentBtn from '../../allDynamicsComponets/TransparentBtn';
import { useToast } from 'react-native-toast-notifications';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setPromoCode, clearPromoCode } from '../../../redux/promoCodeSlice';
import Geolocation from '@react-native-community/geolocation';
import { addLocation } from '../../../redux/locationSlice';

const ApiUrl = 'https://backend.washta.com/api/customer/Selectcar';
const GOOGLE_MAPS_API_KEY = "AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s"
const HireNowStepOne = ({ navigation, route }) => {
    const { item } = route.params;
    const [loading, setLoading] = useState(true);
    const [location, setlocation] = useState('');  
      const [seletedata, setseletedata] = useState('')
    const [promocode, setPromocode] = useState('');
    const [discountedCost, setDiscountedCost] = useState(item?.cost);
    const [discountAmount, setDiscountAmount] = useState(0);
    const dispatch = useDispatch();
    const toast = useToast();
    const appliedPromo = useSelector((state) => state.promoCode.appliedPromo);
    useEffect(() => {
        checkAndRequestLocation();
    }, []);
    const checkAndRequestLocation = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    showEnableLocationAlert();
                    return;
                }
            }
            getCurrentLocation();
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };

    // Fetch user's current location
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;
                // setLatitude(latitude);
                // setLongitude(longitude);
                // setCurrentLocation({ latitude, longitude })
                console.log(`User's Location: Latitude: ${latitude}, Longitude: ${longitude}`);
                const locationData = { latitude, longitude };
                await AsyncStorage.setItem('currentlocationlat', JSON.stringify(locationData));
                // Fetch the address using Google Maps API
                await fetchAddress(latitude, longitude);
                setLoading(false);
            },
            error => {
                console.error('Error getting location:', error.message);
                showEnableLocationAlert();
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    // Fetch address using Google Maps API
    const fetchAddress = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
            );

            if (response.data.status === 'OK') {
                const formattedAddress = response.data.results[0].formatted_address;
                // setAddress(formattedAddress);
                console.log(`User's Address: ${formattedAddress}`);
                dispatch(addLocation(formattedAddress));
            } else {
                console.error('Error fetching address:', response.data.status);
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    // Prompt user to enable GPS
    const showEnableLocationAlert = () => {
        Alert.alert(
            "Location Required",
            "Location required to proceed with booking. To complete the process, please enable your location services. This helps us provide accurate and relevant options for your booking.",
            [
                {
                    text: "Go to Settings",
                    onPress: () => {
                        Linking.openSettings();
                        setTimeout(() => {
                            navigation.goBack(); // Navigate back instead of exiting
                        }, 1000);
                    },
                },
                {
                    text: "Go Back",
                    onPress: () => navigation.goBack(), // Navigate back instead of exiting
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        if (appliedPromo) {
            const { Discounttype, discount } = appliedPromo;
            let discountAmount = 0;

            if (Discounttype === 'fixed') {
                discountAmount = parseFloat(discount);
            } else if (Discounttype === 'percentage') {
                discountAmount = (parseFloat(discount) / 100) * item?.cost;
            }

            setDiscountAmount(discountAmount);
            setDiscountedCost(item.cost - discountAmount);
        }
        setLoading(false);
    }, [appliedPromo]);

    const fetchUserData = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get(ApiUrl, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (response.data.status) {
                setseletedata(response.data.data);
            } else {
                toast.show('Failed to fetch data', { type: 'danger' });
            }
        } catch (error) {
            toast.show('An error occurred. Please try again.', { type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    const applyPromoCode = async () => {
        if (!promocode || promocode === '0') {
            toast.show('Please add a promo code', { type: 'danger' });
            return;
        }

        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get(`https://backend.washta.com/api/customer/promoCode?promoCode=${promocode}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (response.data?.status) {
                toast.show('Promo code applied successfully!', { type: 'success' });
                dispatch(setPromoCode(response.data.data));
            } else {
                toast.show('Invalid promo code', { type: 'danger' });
            }
        } catch (error) {
            toast.show('Network error: Please check your internet connection.', { type: 'danger' });
        }
    };

    const removePromoCode = () => {
        setDiscountAmount(0);
        setDiscountedCost(item?.cost);
        dispatch(clearPromoCode());
    };

    useEffect(() => {
        fetchUserData();
    }, [appliedPromo]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#747EEF" />
            </View>
        );
    }

    return (
                <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust offset for iOS
>
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.progressContainer}>
                    <View style={styles.completedStep}>
                        <Text style={styles.stepText}>1</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={[styles.step, { backgroundColor: 'white', borderColor: '#a6a6a6', borderWidth: 1 }]}>
                        <Text style={[styles.stepText, { color: '#a6a6a6' }]}>2</Text>
                    </View>
                    <View style={[styles.line]} />
                    <View style={[styles.step, { backgroundColor: 'white', borderColor: '#a6a6a6', borderWidth: 1 }]}>
                        <Text style={[styles.stepText, { color: '#a6a6a6' }]}>3</Text>
                    </View>
                </View>
                <View style={{ textAlign: 'left', borderBottomWidth: 0.3, paddingBottom: 30, borderBlockColor: '#747474' }}>
                    <Text style={styles.textGroundTitle}> Your Car</Text>
                
                                       <View style={{ paddingHorizontal: 10 }}>
                       <InputFeild keyboardType='default' focus={false} labelName='Car Manufacturer*' value={seletedata?.vehicleManufacturer} onChangeText={(value) => setFormData({ ...formData, carManufactor: value })} />
                       <InputFeild keyboardType='default' focus={false} labelName='Car Name*' value={seletedata?.vehicleName} onChangeText={(value) => setFormData({ ...formData, carname: value })} />
                       <InputFeild keyboardType='numeric' focus={false} labelName='Car Plate Number' value={seletedata?.vehiclePlateNumber} onChangeText={(value) => setFormData({ ...formData, carPlateNo: value })} />
                       <InputFeild keyboardType='default' focus={false} labelName='Car Type' value={seletedata?.vehicleType} onChangeText={(value) => setFormData({ ...formData, carType: value })} />
                       <InputFeild keyboardType='default'  labelName='Car Parked Location ' value={location} onChangeText={(text) => setlocation(text)}  />
                   </View>
                </View>
                <Text style={styles.textGroundTitle}> Summary</Text>
                <View style={{ paddingHorizontal: 10, paddingRight: 15, paddingBottom: 30 }}>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Estimated Service Time</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 16 }]}> {item.serviceTime || '30 minutes'}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Distance from you</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 16 }]}> {item.time || "5 mins away"}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Location</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 16 }]}> {item.Location || 'Dubai Mall Parking B1'}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Price</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 16 }]}> AED {item?.cost + ".00"}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Discount</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 16 }]}>
    {appliedPromo ? (
        <>
            {appliedPromo.discount} {appliedPromo.Discounttype === 'fixed' ? 'AED' : '%'}
        </>
    ) : (
        'No discount'
    )}
</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Estimated Discount </Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 16 }]}> {" AED " + discountAmount + ".00"}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Total Price</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 16 }]}> AED {discountedCost || item?.cost}.00</Text>
                    </View>
                </View>
                <View style={[styles.summaryContainer, { paddingBottom: 40 }]}>
                    {appliedPromo ? (
                        <View style={styles.promoContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <CheckIcon name="check" style={{ color: '#00AF73', fontSize: 30 }} />
                                <View>
                                    <Text style={{ fontFamily: Fonts.BOLD, color: 'black' }}>{appliedPromo?.promoCode}</Text>
                                    <Text style={styles.promoText}> - AED {appliedPromo?.discount} ( {appliedPromo?.discount} {appliedPromo?.Discounttype === 'fixed' ? 'AED off' : '% off'})</Text>
                                </View>
                            </View>
               <TransparentBtn text="Remove" Link={removePromoCode} />
                        </View>
                    ) : (
                                                <View style={styles.promoInputContainer}>
                                                    <View style={{width:'80%',borderColor:'white'}}>
                                                    <InputFeild
                                                   borderWidth='0'
                                                    bordercolorVal={'white'}
                                                        keyboardType='default'
                                                        labelName='Promo Code'
                                                        value={promocode}
                                                        onChangeText={(text) => setPromocode(text)}
                                                    />
                                                    </View>
                                                   
                                                    <TransparentBtn TextColor={'#747FE8'} text="Apply" Link={applyPromoCode} />
                                                </View>
                                            )}
                </View>
            </ScrollView>
                        <View style={styles.buttonContainer}>
                 <Button
                    text="Select Payment Method"
                    Link={() => navigation.navigate('StepTwo', { item, carId: seletedata, location })}
                />
            </View>
        </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    promoInputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:15,
        borderBottomWidth:1,
        borderColor:'#aaa',
        paddingRight:10,
        marginBottom:60
    },
    promoContainer:{
flexDirection:'row',
alignItems:'center',
borderWidth:1,
marginBottom:60,
borderColor:"#95A4FC",
marginHorizontal:15,
paddingVertical:10,
borderRadius:8,
paddingHorizontal:14,
justifyContent:'space-between'
    },
    promoText:{
color:'#61646B',
fontFamily:FontsGeneral.REGULARSANS,
fontSize:12
    },
    container: {
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textGroundTitle: {
        fontSize: 19,
        color: 'black',
        letterSpacing: 0.1,
        lineHeight: 36,
        fontFamily: FontsGeneral.MEDIUMSANS,
        paddingTop: 5,
        textAlign: 'left',
        paddingHorizontal: 10
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center'
    },
    step: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#a6a6a6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedStep: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#747EEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        width: '28%',
        height: 1.5,
        marginHorizontal: 10,
        backgroundColor: '#a6a6a6',
    },
    stepText: {
        color: '#fff',
        fontFamily: FontsGeneral.MEDIUMSANS,
        fontSize: 16
    },
    RowMainParticular: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5
    },
    textLocation: {
        fontSize: 14,
        fontFamily: Fonts.REGULAR,
        color: 'black',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
    },
    container:{flex:1}
});

export default HireNowStepOne;
