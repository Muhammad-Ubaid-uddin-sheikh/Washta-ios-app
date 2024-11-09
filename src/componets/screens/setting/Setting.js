// import React, { useRef, useState } from 'react'
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import IconBtnArrow from '../../allDynamicsComponets/IconBtnArrow'
// import EditProfile from '../../../assets/EditProfileIcon.png'
// import Bell from '../../../assets/Bell.png'
// import Ticket from '../../../assets/Ticket.png'
// import ShieldUser from '../../../assets/ShieldUser.png'
// import QuestionCircle from '../../../assets/QuestionCircle.png'
// import Logout from '../../../assets/Logout2.png'
// import ShieldWarning from '../../../assets/ShieldWarning.png'
// import BottomSheet from "react-native-gesture-bottom-sheet";
// import { Fonts, FontsGeneral } from '../style'
// import Button from '../../allDynamicsComponets/Button'
// import { useNavigation } from '@react-navigation/native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import Spinner from 'react-native-loading-spinner-overlay'

// const Setting = () => {
//   const bottomSheet = useRef();
//   const deactivationSheet = useRef(); // New ref for deactivate bottom sheet
//   const navigation = useNavigation();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const [isDeactivating, setIsDeactivating] = useState(false); // New state for deactivation

//   // Handle Token Removal
//   const handleTokenConform = async () => {
//     try {
//       await AsyncStorage.removeItem('user');
//       await AsyncStorage.removeItem('accessToken');
//       await AsyncStorage.clear();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }],
//       });
//     } catch (error) {
//       console.error('Error deleting data:', error);
//     }
//   }

//   // Handle Logout
//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     setTimeout(() => {
//       setIsLoggingOut(false);
//       bottomSheet.current.close();
//       handleTokenConform();
//     }, 500);
//   };

//   // Handle Deactivation (similar to logout)
//   const handleDeactivateAccount = async () => {
//     setIsDeactivating(true);
//     setTimeout(() => {
//       setIsDeactivating(false);
//       deactivationSheet.current.close();
//       handleTokenConform(); // You might want to handle additional logic here for deactivation
//     }, 500);
//   };

//   return (
//     <ScrollView style={styles.mainsettingcon} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
//       <IconBtnArrow HandleClick={() => navigation.navigate('EditProfileInfor')} Imagess={EditProfile} Name="Edit profile information" />
//       <IconBtnArrow HandleClick={() => navigation.navigate('Notifications')} Imagess={Bell} Name="Notifications" />
//       <IconBtnArrow HandleClick={() => navigation.navigate('promocodeScreen')} Imagess={Ticket} Name="Promo Codes" />
//       <IconBtnArrow HandleClick={() => navigation.navigate('Security')} Imagess={ShieldUser} Name="Security" />
//       <IconBtnArrow HandleClick={() => navigation.navigate('HelpAndSupport')} Imagess={QuestionCircle} Name="Help & Support" />
//       <IconBtnArrow HandleClick={() => navigation.navigate('PrivacyAndPolicy')} Imagess={ShieldWarning} Name="Privacy policy" />

//       <View style={{ paddingBottom: 10 }}>
//       <IconBtnArrow HandleClick={() => deactivationSheet.current.show()} Imagess={ShieldWarning} Name="Deactivate Account" />
//         <IconBtnArrow HandleClick={() => bottomSheet.current.show()} Imagess={Logout} Name="Log Out" />
//       </View>

//       <SafeAreaView style={styles.container}>
//         {/* Logout Bottom Sheet */}
//         <BottomSheet hasDraggableIcon ref={bottomSheet} height={250} onRequestClose={() => bottomSheet.current.close()}>
//           <View style={styles.bottomSheetContent}>
//             <Text style={styles.bottomSheetText}>Logout</Text>
//             <Text style={styles.bottomSheetSubText}>Are you sure you want to log out?</Text>
//             <View style={{ paddingTop: 20, paddingBottom: 10 }}>
//               <TouchableOpacity onPress={handleLogout}>
//                 <Button Link={handleLogout} text='Yes, Logout' />
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => bottomSheet.current.close()} style={styles.cancelButton}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>

//               <Spinner visible={isLoggingOut} textContent={'Logout...'} textStyle={styles.loaderText} animation="fade" overlayColor="rgba(0, 0, 0, 0.7)" color="white" />
//             </View>
//           </View>
//         </BottomSheet>

//         {/* Deactivate Account Bottom Sheet */}
//         <BottomSheet hasDraggableIcon ref={deactivationSheet} height={250} onRequestClose={() => deactivationSheet.current.close()}>
//           <View style={styles.bottomSheetContent}>
//             <Text style={styles.bottomSheetText}>Deactivate Account</Text>
//             <Text style={styles.bottomSheetSubText}>Are you sure you want to deactivate your account?</Text>
//             <View style={{ paddingTop: 20, paddingBottom: 10 }}>
//               <TouchableOpacity onPress={handleDeactivateAccount}>
//                 <Button Link={handleDeactivateAccount} text='Yes, Deactivate' />
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => deactivationSheet.current.close()} style={styles.cancelButton}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>

//               <Spinner visible={isDeactivating} textContent={'Deactivating...'} textStyle={styles.loaderText} animation="fade" overlayColor="rgba(0, 0, 0, 0.7)" color="white" />
//             </View>
//           </View>
//         </BottomSheet>
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   loaderText: {
//     color: 'white',
//     opacity: 1,
//     fontFamily: FontsGeneral.MEDIUMSANS,
//     fontSize: 20,
//   },
//   mainsettingcon: {
//     paddingHorizontal: 15,
//     backgroundColor: 'white',
//     paddingBottom: 10,
//   },
//   bottomSheetContent: {
//     paddingTop: 10,
//     paddingHorizontal: 20,
//   },
//   bottomSheetText: {
//     textAlign: 'center',
//     fontFamily: FontsGeneral.MEDIUMSANS,
//     fontSize: 25,
//     color: 'black',
//   },
//   bottomSheetSubText: {
//     fontFamily: Fonts.MEDIUM,
//     textAlign: 'center',
//     paddingTop: 10,
//     fontSize: 15,
//     color: 'black',
//   },
//   cancelButton: {
//     width: '100%',
//     borderWidth: 1,
//     textAlign: 'center',
//     borderRadius: 50,
//     marginTop: 10,
//   },
//   cancelButtonText: {
//     textAlign: 'center',
//     fontFamily: FontsGeneral.MEDIUMSANS,
//     fontSize: 16,
//     color: 'black',
//     paddingVertical: 13,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default Setting;
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import IconBtnArrow from '../../allDynamicsComponets/IconBtnArrow';
import EditProfile from '../../../assets/EditProfileIcon.png';
import Bell from '../../../assets/Bell.png';
import Ticket from '../../../assets/Ticket.png';
import ShieldUser from '../../../assets/ShieldUser.png';
import QuestionCircle from '../../../assets/QuestionCircle.png';
import Logout from '../../../assets/Logout2.png';
import ShieldWarning from '../../../assets/ShieldWarning.png';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { Fonts, FontsGeneral } from '../style';
import Button from '../../allDynamicsComponets/Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
// import axios from 'axios'; // Import Axios if using it for API calls

const Setting = () => {
  const bottomSheet = useRef();
  const deactivationSheet = useRef(); // Ref for deactivate bottom sheet
  const deletionSheet = useRef(); // New ref for delete bottom sheet
  const navigation = useNavigation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false); // State for deactivation
  const [isDeleting, setIsDeleting] = useState(false); // State for deletion

  // Handle Token Removal and Account Deletion
  const handleTokenConform = async () => {
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
  };

  // Handle Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      bottomSheet.current.close();
      handleTokenConform();
    }, 500);
  };

  // Handle Deactivation (similar to logout)
  const handleDeactivateAccount = async () => {
    setIsDeactivating(true);
    setTimeout(() => {
      setIsDeactivating(false);
      deactivationSheet.current.close();
      handleTokenConform();
      // Additional logic for deactivation if required
    }, 500);
  };

  // Handle Account Deletion (API call to delete account if applicable)
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Make API call to delete account
      // await axios.delete('YOUR_API_URL_FOR_ACCOUNT_DELETION');

      // After successful deletion:
      await handleTokenConform(); // Clear local data
      deletionSheet.current.close(); // Close bottom sheet
      Alert.alert("Account Deleted", "Your account has been permanently deleted.");
    } catch (error) {
      console.error('Erroaxr deleting account:', error);
      Alert.alert("Error", "There was a problem deleting your account.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ScrollView style={styles.mainsettingcon} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <IconBtnArrow HandleClick={() => navigation.navigate('EditProfileInfor')} Imagess={EditProfile} Name="Edit profile information" />
      <IconBtnArrow HandleClick={() => navigation.navigate('Notifications')} Imagess={Bell} Name="Notifications" />
      <IconBtnArrow HandleClick={() => navigation.navigate('promocodeScreen')} Imagess={Ticket} Name="Promo Codes" />
      <IconBtnArrow HandleClick={() => navigation.navigate('Security')} Imagess={ShieldUser} Name="Security" />
      <IconBtnArrow HandleClick={() => navigation.navigate('HelpAndSupport')} Imagess={QuestionCircle} Name="Help & Support" />
      <IconBtnArrow HandleClick={() => navigation.navigate('PrivacyAndPolicy')} Imagess={ShieldWarning} Name="Privacy policy" />

      <View style={{ paddingBottom: 10 }}>
        {/* <IconBtnArrow HandleClick={() => deactivationSheet.current.show()} Imagess={ShieldWarning} Name="Deactivate Account" /> */}
        <IconBtnArrow HandleClick={() => deletionSheet.current.show()} Imagess={ShieldWarning} Name="Delete Account" /> 
        <IconBtnArrow HandleClick={() => bottomSheet.current.show()} Imagess={Logout} Name="Log Out" />
      </View>

      <SafeAreaView style={styles.container}>
        {/* Logout Bottom Sheet */}
        <BottomSheet hasDraggableIcon ref={bottomSheet} height={250} onRequestClose={() => bottomSheet.current.close()}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetText}>Logout</Text>
            <Text style={styles.bottomSheetSubText}>Are you sure you want to log out?</Text>
            <View style={{ paddingTop: 20, paddingBottom: 10 }}>
              <TouchableOpacity onPress={handleLogout}>
                <Button Link={handleLogout} text='Yes, Logout' />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => bottomSheet.current.close()} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <Spinner visible={isLoggingOut} textContent={'Logout...'} textStyle={styles.loaderText} animation="fade" overlayColor="rgba(0, 0, 0, 0.7)" color="white" />
            </View>
          </View>
        </BottomSheet>

        {/* Deactivate Account Bottom Sheet */}
        {/* <BottomSheet hasDraggableIcon ref={deactivationSheet} height={250} onRequestClose={() => deactivationSheet.current.close()}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetText}>Deactivate Account</Text>
            <Text style={styles.bottomSheetSubText}>Are you sure you want to deactivate your account?</Text>
            <View style={{ paddingTop: 20, paddingBottom: 10 }}>
              <TouchableOpacity onPress={handleDeactivateAccount}>
                <Button Link={handleDeactivateAccount} text='Yes, Deactivate' />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deactivationSheet.current.close()} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <Spinner visible={isDeactivating} textContent={'Deactivating...'} textStyle={styles.loaderText} animation="fade" overlayColor="rgba(0, 0, 0, 0.7)" color="white" />
            </View>
          </View>
        </BottomSheet> */}

        {/* Delete Account Bottom Sheet */}
        <BottomSheet hasDraggableIcon ref={deletionSheet} height={250} onRequestClose={() => deletionSheet.current.close()}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetText}>Delete Account</Text>
            <Text style={styles.bottomSheetSubText}>Are you sure you want to delete your account? This action is permanent.</Text>
            <View style={{ paddingTop: 20, paddingBottom: 10 }}>
              <TouchableOpacity onPress={handleDeleteAccount}>
                <Button Link={handleDeleteAccount} text='Yes, Delete' />
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => deletionSheet.current.close()} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity> */}
                          <TouchableOpacity onPress={() => deactivationSheet.current.close()} style={styles.cancelButton}>
               <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <Spinner visible={isDeleting} textContent={'Deleting...'} textStyle={styles.loaderText} animation="fade" overlayColor="rgba(0, 0, 0, 0.7)" color="white" />
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderText: {
    color: 'white',
    opacity: 1,
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 20,
  },
  mainsettingcon: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  bottomSheetContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  bottomSheetText: {
    textAlign: 'center',
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 25,
    color: 'black',
  },
  bottomSheetSubText: {
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 15,
    color: 'black',
  },
  cancelButton: {
    width: '100%',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 50,
    marginTop: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 16,
    color: 'black',
    paddingVertical: 13,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Setting;
