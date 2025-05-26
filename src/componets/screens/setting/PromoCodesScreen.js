import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { Fonts, FontsGeneral } from '../style';
import Tick from '../../../assets/Ticketpurple.png';
import Button from '../../allDynamicsComponets/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { useToast } from 'react-native-toast-notifications';
import { formatDate } from '../../../../DaterightFunction';
import { useDispatch } from 'react-redux';
import { setPromoCode } from '../../../redux/promoCodeSlice';
import DefaultImage from '../../../assets/noPromoCode.png'
const ApiUrl = 'https://backend.washta.com/api/customer/promoCode';
const PromoCodesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const bottomSheet = useRef();
  const toast = useToast();
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(ApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response && response.data) {
        setPromoCodes(response.data.data.reverse()); // Assuming the response contains an array of promo codes
      } else {
        toast.show("Error fetching promo codes", { type: "danger", animationType: "zoom-in",duration: 2000 });
      }
    } catch (error) {
      toast.show(error.message, { type: "danger", animationType: "zoom-in",duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const filterPromoCodes = () => {
    if (activeTab === 'All') {
      return promoCodes;
    } else if (activeTab === 'Amount') {
      return promoCodes.filter((item) => item.Discounttype === 'fixed');
    } else if (activeTab === 'Percentage') {
      return promoCodes.filter((item) => item.Discounttype === 'percentage');
    }
  };

  const showDetails = (promo) => {
    setSelectedPromo(promo);
    bottomSheet.current.show();
  };

  const applyPromoCode = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${ApiUrl}?promoCode=${selectedPromo.promoCode}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response && response.data) {
        console.log('responsePromo code', response.data)
        dispatch(setPromoCode(response.data.data));
        bottomSheet.current.close();
        toast.show("Promo code applied successfully!", { type: "success", animationType: "zoom-in" ,duration: 2000 });
      } else {
        toast.show("Error applying promo code", { type: "danger", animationType: "zoom-in",duration: 2000 });
      }
    } catch (error) {
      toast.show(error.message, { type: "danger", animationType: "zoom-in",duration: 2000 });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#747EEF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {/* {['All', 'Amount', 'Percentage'].map((tab) => ( */}
        {['All'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab ? styles.activeTab : styles.inactiveTab
            ]}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab ? styles.activeTabText : styles.inactiveTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {promoCodes.length === 0 ? (
        // Show default image when promoCodes is empty
        <View style={styles.defaultImageContainer}>
          <Image source={DefaultImage} style={styles.defaultImage} />
          {/* <Text style={styles.noPromoText}>No promo codes available</Text> */}
        </View>
      ) : (
      <FlatList
        data={filterPromoCodes()}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.promoCard}>
            <Image style={styles.Imagess} source={Tick} />
            <View style={styles.promoInfo}>
              <Text style={styles.promoCode}>{item.promoCode}</Text>
              <Text style={styles.expiryDate}>Valid Till {formatDate(item.duration?.endTime)} {item.duration?.endTime.slice(0, 4)}</Text>
            </View>
            <TouchableOpacity style={styles.detailsButton} onPress={() => showDetails(item)}>
              <Text style={styles.detailsText}>Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />)}
      {/* <Button text="Save" Link={() => navigation.goBack()} /> */}

      <BottomSheet style={styles.bottomSheet} hasDraggableIcon ref={bottomSheet} height={390}>
        {selectedPromo && (
          <View style={styles.sheetContainer}>
            <Text style={styles.sheetTitle}>Voucher details</Text>
            <Text style={styles.sheetSubtitle}>
        Welcome back with {selectedPromo.discount}
        {selectedPromo.Discounttype === 'fixed' ? ' AED off ' : '% off '}

      </Text>
                  <Text style={styles.sheetDescription}>New and existing customers</Text>
            <View style={styles.separator} />
            <Text style={styles.sheetTermsTitle}>Terms and Conditions</Text>
            <Text style={styles.sheetTermsText}>Valid till {formatDate(selectedPromo.duration?.endTime)} {selectedPromo.duration?.endTime.slice(0, 4)}</Text>
            <Text style={styles.sheetTermsText}>{selectedPromo.giveToAll ? 'Available to all users' : 'For selected users only'}</Text>
            <View style={{ width: '100%', marginTop: 20 }}>
              <TouchableOpacity onPress={() => applyPromoCode()}>
                <Button text='Apply Promo' Link={applyPromoCode} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => bottomSheet.current.close()} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
    </View>
  );
};



const styles = StyleSheet.create({
  defaultImageContainer:{
flex:1,
height:'100%',
width:'100%',
justifyContent:'center',
alignItems:'center'
  },

  defaultImage:{
    width:'100%',
    height:'70%',
    objectFit:'contain'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp('5%'),
    paddingTop: 0,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: hp('2%'),
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: wp('1.2%'),
    marginRight: wp('2%'),
    borderWidth: 1,
    borderColor: '#747EEF',
  },
  activeTab: {
    backgroundColor: '#747EEF',
    borderColor: '#747EEF',
  },
  inactiveTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontFamily: Fonts.MEDIUM,
  },
  activeTabText: {
    color: 'white',
  },
  inactiveTabText: {
    color: 'black',
  },
  promoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
    marginBottom: hp('2%'),
    borderRadius: wp('2%'),
    backgroundColor: '#F2F2F2',
  },
  promoInfo: {
    marginLeft: -20,
    width: '55%',
  },
  promoCode: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 14,
    color: 'black',
  },
  expiryDate: {
    fontSize: wp('3.5%'),
    color: '#555',
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 12,
  },
  detailsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1.2%'),
    backgroundColor: '#8692FF',
    width: '22%',
    paddingVertical: 5,
    height: 30,
    paddingHorizontal: 10,
  },
  detailsText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
  Imagess: {
    width: '11%',
    objectFit: 'contain',
    height: '100%',
  },
  sheetContainer: {
    paddingHorizontal: 15,
    width: '100%',
  },
  sheetTitle: {
    fontSize: 24,
    fontFamily: FontsGeneral.MEDIUMSANS,
    color: 'black',
    marginBottom: 10,
    textAlign: 'left',
    paddingTop: 20,
  },
  sheetSubtitle: {
    fontSize: 20,
    fontFamily: FontsGeneral.MEDIUMSANS,
    marginBottom: 5,
    color: 'black',
  },
  sheetDescription: {
    fontSize: 15,
    color: 'black',
    fontFamily: Fonts.REGULAR,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgrey',
    marginVertical: 12,
  },
  sheetTermsTitle: {
    fontSize: 20,
    fontFamily: FontsGeneral.MEDIUMSANS,
    color: 'black',
    marginBottom: 5,
  },
  sheetTermsText: {
    fontSize: 14,
    fontFamily: FontsGeneral.REGULARSANS,
    color: 'black',
    marginBottom: 10,
  },
  applyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1.2%'),
    backgroundColor: '#8692FF',
    width: '80%',
    paddingVertical: 10,
    marginBottom: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1.2%'),
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 50,
    marginTop: 10,
    borderColor: 'black',
    paddingVertical: 13,
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default PromoCodesScreen;
