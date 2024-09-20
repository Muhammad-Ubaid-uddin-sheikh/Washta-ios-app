import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, } from 'react-native';
import { Fonts, FontsGeneral } from '../style';
import Button from '../../allDynamicsComponets/Button';
import Popup  from './Modalpopup'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ApiUrl = 'https://backend.washta.com/api/customer/booking';
import axios from 'react-native-axios';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { formatDate, formatTimeInTimezone } from '../../../../DaterightFunction';
import moment from 'moment-timezone';

const HireNowStepThree = ({ navigation ,route}) => {
  const toast = useToast();

  const [popupVisible, setPopupVisible] = useState(false);
  const [userid,setuserid] = useState('')
  const { item,carId,location } = route.params;
  const [loading,setLoading] = useState(false)
  const [discountedCost, setDiscountedCost] = useState(item.cost); // Initial cost
  const [discountAmount, setDiscountAmount] = useState(0); // Total di
  const locations = useSelector((state) => state.locations.location);
  const appliedPromo = useSelector((state) => state.promoCode.appliedPromo); // Get applied promo from Redux
  console.log('redux',appliedPromo)
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
  const getCurrentDateTime = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return moment().tz(userTimezone).format('YYYY-MM-DD HH:mm:ss');
  };

  const getUserFromStorage = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setuserid(user.id)
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

  const hidePopup = () => {
    setPopupVisible(false);
    navigation.navigate('Jobs')
  };
//   const payload = {
//     customerId: userid,
//     vehicleId: carId?._id,
//     shopId: item._id,
//     cost: item?.cost,
//     paymentId: "12343134567890",
//     location:{
//       text: locations,
//       lat: 67.0999638,
//       long: 24.9214989
//   }
// }
const payload = {
  vehicleId: carId?._id,
  shopId: item._id,
  cost: item?.cost,
  paymentId: "12343134567890",
  promoCode: appliedPromo
    ? {
        id: appliedPromo?._id,
        promoCode: appliedPromo?.promoCode || '',
        Discounttype: appliedPromo?.Discounttype || '',
        discount: appliedPromo?.discount || '0'
      }
    : null,
  location: {
    text: locations,
    lat: 67.0999638,
    long: 24.9214989
  }
};

  const ButtonClick = async () => {
   
        setLoading(true)
          try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.post(ApiUrl, payload, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
        setLoading(true);
        if (response) {
          toast.show('your request has been send ', { type: "success", animationType: "zoom-in" });
          setPopupVisible(true);
          console.log("asdasd",payload,'paylod',response.data)
        }
      } 
      catch (error) {
        console.log(error);
          const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
          toast.show(errorMessage, { type: "danger", animationType: "zoom-in" });
      }finally{
        setLoading(false);
    
  }
  };
  useEffect(()=>{getUserFromStorage()},[])
  return (
    <View style={styles.container}>
     
      <View style={styles.progressContainer} >
        <View style={styles.completedStep}>
          <Text style={styles.stepText}>1</Text>
        </View>
        <View style={[styles.line,{backgroundColor:'#747EEF'}]} />
        <View style={[styles.step,{backgroundColor:'#747EEF',borderColor:'#747EEF',borderWidth:1}]}>
          <Text style={[styles.stepText,{color:'white'}]}>2</Text>
        </View>
        <View style={[styles.line,{backgroundColor:'#747EEF'}]} />
        <View style={[styles.step,{backgroundColor:'#747EEF',borderColor:'#747EEF',borderWidth:1}]}>
          <Text style={[styles.stepText,{color:'white'}]}>3</Text>
        </View>
      </View>
     <ScrollView>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10,marginTop:20,borderBlockColor: '#747474', borderBottomWidth: 0.2,paddingBottom:20}}>
      <Image source={{ uri: item?.coverImage && item.coverImage.includes('/media/image/cover-image.jpeg')
          ? 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'
          : item.coverImage || 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'}} style={{width:70,height:70,objectFit:'cover',borderRadius:12}}/>
      
      <View style={{width:'80%'}}>
      <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:18,width:'80%',paddingLeft:10}}> {item?.shopName} </Text>
      <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,paddingLeft:12,fontSize:13,color:'black'}}> 8 min away </Text>
        </View>
      </View>
      <Text style={styles.textGroundTitle} > Summary</Text>
      <View style={{ paddingHorizontal: 10, paddingRight: 15, borderBlockColor: '#747474', borderBottomWidth: 0.2, paddingBottom: 30 }}>
          <View style={styles.RowMainParticular}>
            <Text style={styles.textLocation}> Booking Date</Text>
            <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> {formatDate(getCurrentDateTime())} | {formatTimeInTimezone(new Date())} </Text>
          </View>
          <View style={styles.RowMainParticular}>
            <Text style={styles.textLocation}> Car Plate Number</Text>
            <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> {carId?.vehiclePlateNumber} </Text>
          </View>
          <View style={styles.RowMainParticular}>
            <Text style={styles.textLocation}> Car Type</Text>
            <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> {carId?.vehicleType} </Text>
          </View>
          <View style={styles.RowMainParticular}>
            <Text style={styles.textLocation}> Service</Text>
            <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> Car Wash & Full Cleaning </Text>
          </View>
          <View style={styles.RowMainParticular}>
            <Text style={styles.textLocation}> Estimated Duration</Text>
            <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}> 1hr</Text>
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
                 
        </View>
        
        <View style={[styles.RowMainParticular,{paddingHorizontal:10}]}>
            <Text style={styles.textLocation}> Estimated Total</Text>
            <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 17 }]}> AED {discountedCost || item?.cost}.00</Text>
          </View>
          <Popup 
        visible={popupVisible} 
        onClose={hidePopup} 
        message="Please wait for John Doe to accept your hiring request" 
      />
     </ScrollView>
     <View style={styles.buttonContainer}>
        <Button loading={loading} text="Complete Booking" Link={ButtonClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
   
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  textGroundTitle: {
    fontSize: 19,
    color: 'black',
    letterSpacing: 0.1,
    lineHeight: 36,
    fontFamily: FontsGeneral.MEDIUMSANS,
    paddingTop: 5,
    textAlign:'left',
    paddingHorizontal:10
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
    marginHorizontal:10,
    backgroundColor: '#a6a6a6',
  },
  stepText: {
    color: '#fff',
    fontFamily:FontsGeneral.MEDIUMSANS,
    fontSize:16
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
});

export default HireNowStepThree;