import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Button from '../../allDynamicsComponets/Button';
import StarIcons from 'react-native-vector-icons/Entypo';
import { Fonts, FontsGeneral } from '../style';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ParticularCarScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
const toast = useToast()
  const toggleLocation = () => {
      setIsExpanded(!isExpanded); // Toggle the expanded state
  };  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return(
        num);
    }
  }
  const handleNavigationWithAuthCheck = async (item) => {
    console.log('hire',item.item)

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        // Navigate to the StepOne screen with item data if authenticated
        navigation.navigate('StepOne', { item:item?.item });
      } else {
        // Show a toast message if not authenticated
        toast.show(
          'Please Register. You need to sign in to access this feature.'
        ); // Pass the message as a string directly
        // Navigate to the Home screen
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
    }
  };
  const handleNavigationWithAuthCheckReviewId = async (item) => {
    console.log('itemads',item.item._id)
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        // Navigate to the StepOne screen with item data if authenticated
        navigation.navigate('ParticularReview', { item:item?.item?._id });
      } else {
        // Show a toast message if not authenticated
        toast.show(
          'Please Register. You need to sign in to access this feature.'
        ); // Pass the message as a string directly
        // Navigate to the Home screen
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.imageconta}></View>
        <Image
          source={{ uri: item?.coverImage && item.coverImage.includes('/media/image/cover-image.jpeg')
          ? 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'
          : item.coverImage || 'https://centralca.cdn-anvilcms.net/media/images/2022/03/15/images/Car_wash_pix_3-16-22.max-1200x675.jpg'}}
          style={styles.backgroundImage}
        />
        <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 16, width: '100%', alignItems: 'center', position: 'absolute', top: 25 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius:50,backgroundColor:'white'}} >
            <BackIcon name="arrowleft" size={21} color='#747EEF' style={{  padding: 5, borderRadius: '100%' }} />
          </TouchableOpacity>
          <TouchableOpacity >
          </TouchableOpacity>
        </View>
        <View style={styles.TitleGroundDiv}>
          <Text style={styles.textGroundTitle}>{item?.shopName}</Text>
          <TouchableOpacity  onPress={()=>navigation.navigate('ParticularReview',{item:item._id})}>
          <Text style={[styles.buttonText, { color: 'black', flexDirection: 'row', alignItems: 'center' }]}>
           
            <StarIcons name='star' style={{ color: '#F39D00' }} size={20} />
            <Text> {item.reviewsSummary.averageRating|| '0.0'} ({formatNumber(item?.totalNoOfJobs)}) </Text>
         
          </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.locationTextContainer}>
          <Text style={styles.textLocation}>{formatNumber(item?.totalNoOfJobs)} jobs done</Text>
        </View>
        <View style={{ paddingHorizontal: 10, paddingRight: 15, borderBlockColor: '#747474', borderBottomWidth: 0.2, paddingBottom: 30 }}>
          <Text style={styles.textGroundTitle}> Job Information</Text>
          <View style={styles.RowMainParticular}>
            <Text style={styles.textLocation}> Cost</Text>
            <Text style={[styles.textLocation, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15 }]}>AED {item?.cost}</Text>
          </View>
          
          <View style={styles.RowMainParticular}>
            <Text style={styles.textLocation}> Location</Text>
    <TouchableOpacity onPress={toggleLocation} style={{paddingHorizontal:20,width:'90%'}}>
                <Text
                    numberOfLines={isExpanded ? undefined : 1} 
                    style={[
                        styles.textLocation,
                        { 
                            fontFamily: FontsGeneral.MEDIUMSANS,
                            fontSize: 15,
                            // width: '80%',
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap' ,
                            paddingLeft:25
                        }
                    ]}
                >
                    {item.location.text || 'NO address on this shop'}
                </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{ paddingHorizontal: 10, paddingRight: 15, borderBlockColor: '#747474', borderBottomWidth: 0.2, paddingBottom: 10, paddingTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.textGroundTitle}> Check Reviews</Text>
          <TouchableOpacity onPress={()=> handleNavigationWithAuthCheckReviewId({item})} >
            <BackIcon name="arrowright" size={26} color='#747EEF' style={{ backgroundColor: 'white', padding: 5, borderRadius: 50 }} />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Hire Now" Link={()=>handleNavigationWithAuthCheck({item})} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  RowMainParticular: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5
  },
  locationTextContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBlockColor: '#747474',
    borderBottomWidth: 0.2,
    paddingBottom: 20
  },
  textLocation: {
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    color: 'black',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Fonts.MEDIUM
  },
  TitleGroundDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  textGroundTitle: {
    fontSize: 19,
    color: 'black',
    letterSpacing: 0.1,
    lineHeight: 36,
    fontFamily: FontsGeneral.MEDIUMSANS,
    paddingTop: 5
  },
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 0,
    padding: 0,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: "100%",
    height: 250,
    objectFit: 'cover'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  }
});

export default ParticularCarScreen;
