import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Fonts, FontsGeneral } from '../style';
import InputFeild from '../../allDynamicsComponets/inputFeilds';
import Button from '../../allDynamicsComponets/Button';
import TransparentBtn from '../../allDynamicsComponets/TransparentBtn';
import { useToast } from 'react-native-toast-notifications';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckIcon from 'react-native-vector-icons/SimpleLineIcons'
import { useDispatch, useSelector } from 'react-redux';
import { setPromoCode, clearPromoCode } from '../../../redux/promoCodeSlice'; // assuming you have clearPromoCode
const ApiUrl = 'https://backend.washta.com/api/customer/Selectcar';

const HireNowStepOne = ({ navigation, route }) => {
    const { item } = route.params;
    const [loading, setLoading] = useState(true);
    const [seletedata, setseletedata] = useState('');
    const [location, setlocation] = useState('');
    const [promocode, setPromocode] = useState('');
    const [discountedCost, setDiscountedCost] = useState(item?.cost); // Initial cost
    const [discountAmount, setDiscountAmount] = useState(0); // Total di
    const dispatch = useDispatch();
    const toast = useToast();
    const appliedPromo = useSelector((state) => state.promoCode.appliedPromo); // Get applied promo from Redux
useEffect(() => {
    if (appliedPromo) {
        const { Discounttype, discount } = appliedPromo; // Destructure discount data
        let discountAmount = 0;

        if (Discounttype === 'fixed') {
            discountAmount = parseFloat(discount); // Fixed discount amount
        } else if (Discounttype === 'percentage') {
            discountAmount = (parseFloat(discount) / 100) * item?.cost; 
        }

        setDiscountAmount(discountAmount);
        setDiscountedCost(item.cost - discountAmount); // Final cost after applying the discount
    }

    setLoading(false);
}, [appliedPromo]);
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
                console.log(response.data.data);
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

    
    const applyPromoCode = async () => {
        if (!promocode || promocode === '0') {
            toast.show('Please add a promo code', { type: 'danger', animationType: 'zoom-in' });
            return; // Exit early if no promo code is provided
        }
    
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get(`https://backend.washta.com/api/customer/promoCode?promoCode=${promocode}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            console.log('Full response:', response.data); // Log full response for debugging
    
            if (response.data?.status) {  // Assuming the response has a status property
                toast.show('Promo code applied successfully!', { type: 'success', animationType: 'zoom-in' });
                dispatch(setPromoCode(response.data.data)); // Set the promo code in your store
            } else {
                console.log('Response data on failure:', response);
                toast.show('Invalid promo code', { type: 'danger', animationType: 'zoom-in' });
            }
        } catch (error) {
            console.log('Error object:', error); // Log full error object for debugging
    
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data?.message || 'An error occurred. Please try again.';
    console.log('error.response',error.response.data.error)
                // Handle specific status codes
                if (status === 400) {
                    toast.show('Invalid Promo Code', { type: 'danger', animationType: 'zoom-in' });
                } else {
                    toast.show(errorMessage, { type: 'danger', animationType: 'zoom-in' });
                }
            } else {
                toast.show('Network error: Please check your internet connection.', { type: 'danger', animationType: 'zoom-in' });
            }
        }
    };
    

    const removePromoCode = () => {
        setDiscountAmount('0')
        setDiscountedCost(item?.cost)
        dispatch(clearPromoCode()); // Clear promo code from Redux
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
                       <InputFeild keyboardType='default' focus={true} labelName='Car Manufacturer*' value={seletedata?.vehicleManufacturer} onChangeText={(value) => setFormData({ ...formData, carManufactor: value })} />
                       <InputFeild keyboardType='default' focus={true} labelName='Car Name*' value={seletedata?.vehicleName} onChangeText={(value) => setFormData({ ...formData, carname: value })} />
                       <InputFeild keyboardType='numeric' focus={true} labelName='Car Plate Number' value={seletedata?.vehiclePlateNumber} onChangeText={(value) => setFormData({ ...formData, carPlateNo: value })} />
                       <InputFeild keyboardType='default' focus={true} labelName='Car Type' value={seletedata?.vehicleType} onChangeText={(value) => setFormData({ ...formData, carType: value })} />
                       <InputFeild keyboardType='default'  labelName='Car Parked Location ' value={location} onChangeText={(text) => setlocation(text)}  />
                   </View>
                </View>
                <Text style={styles.textGroundTitle}> Summary</Text>
                <View style={{ paddingHorizontal: 10, paddingRight: 15, paddingBottom: 30 }}>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Estimated Service Time</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> {item.serviceTime || '30 minutes'}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Distance from you</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> {item.time || "5 mins away"}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Location</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> {item.Location || 'Dubai Mall Parking B1'}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Cost</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> AED {item?.cost + ".00"}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Discount</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}>
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
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> {" AED " + discountAmount + ".00"}</Text>
                    </View>
                    <View style={styles.RowMainParticular}>
                        <Text style={styles.textLocation}> Estimated Total</Text>
                        <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> AED {discountedCost || item?.cost}.00</Text>
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
