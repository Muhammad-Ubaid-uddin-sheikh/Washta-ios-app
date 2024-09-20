import React, { useRef, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconBtnArrow from '../../allDynamicsComponets/IconBtnArrow'
import EditProfile from '../../../assets/EditProfileIcon.png'
import Bell from '../../../assets/Bell.png'
import Ticket from '../../../assets/Ticket.png'
import ShieldUser from '../../../assets/ShieldUser.png'
import QuestionCircle from '../../../assets/QuestionCircle.png'
import Logout from '../../../assets/Logout2.png'
import ShieldWarning from '../../../assets/ShieldWarning.png'
import BottomSheet from "react-native-gesture-bottom-sheet";
import { Fonts, FontsGeneral } from '../style'
import Button from '../../allDynamicsComponets/Button'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
const Setting = () => {
  const bottomSheet = useRef();
  const navigation = useNavigation()
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleTokenConform= async () => {
   
    try {
  
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  const handleLogout = async () => { 
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      bottomSheet.current.close()
      handleTokenConform()
    }, 500);
   
   
  };
  return (
   
      <ScrollView style={styles.mainsettingcon} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <IconBtnArrow HandleClick={()=>navigation.navigate('EditProfileInfor')} Imagess = {EditProfile} Name="Edit profile information"/>
        <IconBtnArrow HandleClick={()=>navigation.navigate('Notifications')} Imagess = { Bell} Name="Notifications"/>
        <IconBtnArrow HandleClick={()=>navigation.navigate('promocodeScreen')}  Imagess = { Ticket} Name="Promo Codes"/>
        <IconBtnArrow HandleClick={()=>navigation.navigate('Security')} Imagess = { ShieldUser} Name="Security"/>
        <IconBtnArrow HandleClick={()=>navigation.navigate('HelpAndSupport')} Imagess = { QuestionCircle} Name="Help & Support"/>
        <IconBtnArrow HandleClick={()=>navigation.navigate('PrivacyAndPolicy')} Imagess = { ShieldWarning} Name="Privacy policy"/>
        <View style={{paddingBottom:10}}>
        <IconBtnArrow  HandleClick={() => bottomSheet.current.show()} Imagess = { Logout} Name="Log Out"/>
        </View>
        <SafeAreaView style={styles.container}>
       
       <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={250}

        onRequestClose={() => bottomSheet.current.close()}
      >
        {/* Content of the Bottom Sheet */}
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetText}>Logout</Text>
          <Text style={{fontFamily:Fonts.MEDIUM,textAlign:'center',paddingTop:10,fontSize:15,color:'black'}}>Are you sure you want to log out?</Text>
       <View style={{paddingTop:20,paddingBottom:10}}>
        <TouchableOpacity onPress={handleLogout}>
        <Button Link={handleLogout} text='Yes, Logout'/>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={() => bottomSheet.current.close()} style={{width:'100%',borderWidth:1,textAlign:'center',borderRadius:50,marginTop:10}}>
          <Text style={{textAlign:'center',fontFamily:FontsGeneral.MEDIUMSANS,fontSize:16,color:'black',paddingVertical:13}}>Cancel</Text>
        </TouchableOpacity>
        <Spinner
        visible={isLoggingOut}
        textContent={'Logout...'}
        textStyle={styles.loaderText}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.7)"
        color="white" 
      />
        </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
        </ScrollView>
 
  )
}
const styles = StyleSheet.create({
  loaderText:{
    color:'white',
    opacity:1,
    fontFamily:FontsGeneral.MEDIUMSANS,
    fontSize:20
  },  mainsettingcon:{
    paddingHorizontal:15,
    backgroundColor:'white',
    paddingBottom:10
  },
  bottomSheetContent:{
    paddingTop:10,
    paddingHorizontal:20
  },
  bottomSheetText:{
textAlign:'center',
fontFamily:FontsGeneral.MEDIUMSANS,
fontSize:25,
color:'black',

  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
export default Setting