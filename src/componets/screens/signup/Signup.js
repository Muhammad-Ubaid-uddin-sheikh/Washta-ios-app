
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
// import InputFeilds from '../../allDynamicsComponets/inputFeilds';
// import Button from '../../allDynamicsComponets/Button';
// import { Fonts, FontsGeneral } from '../style';
// import InputPassword from '../../allDynamicsComponets/InputPassowrd';
// import { useToast } from 'react-native-toast-notifications';
// import Spinner from 'react-native-loading-spinner-overlay';
// import axios from 'react-native-axios';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // New import

// const ApiUrl = 'https://backend.washta.com/api/auth/Signup';

// const SignUp = ({ navigation }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();
//   const handleCheckBoxToggle = () => {
//     setIsChecked(!isChecked);
//   };

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     carName: '',
//     carType: '',
//     number: '',
//     carPlateNumber: '',
//     CarManufacturer: ''
//   });

//   const paylod = {
//     username: formData?.fullName,
//     password: formData?.password,
//     name: formData?.fullName,
//     email: formData?.email,
//     phone: formData?.number,
//     role: 'customer',
//     car: {
//       vehicleManufacturer: formData?.CarManufacturer,
//       vehiclePlateNumber: formData?.carPlateNumber,
//       vehicleName: formData?.carName,
//       vehicleType: formData?.carType
//     }
//   };

//   const ButtonClick = async () => {
//     if (!formData.fullName || !formData.email || !formData.carName || !formData.password || !formData.carType || !formData.number || !formData.carPlateNumber) {
//       toast.show('Incomplete Details. Please fill all details.', { type: 'danger', animationType: 'zoom-in' });
//     } else {
//       setLoading(true);
//       try {
//         const response = await axios.post(ApiUrl, paylod);
//         if (response.data.status) {
//           const { accessToken, user } = response.data.data;
//           navigation.navigate('OtpScreen', { paylod });
//         }
//       } catch (error) {
//         toast.show(error.response.data.error, { type: 'danger', animationType: 'zoom-in' });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <>
//       <KeyboardAwareScrollView 
//         showsVerticalScrollIndicator={false} 
//         style={styles.container}
//         contentContainerStyle={styles.scrollContent} // Added for inner content styling
//         extraHeight={250} // Adjust this value as necessary for keyboard height
//       >
//         <View style={styles.topContent}>
//           <Text style={styles.heading}>We’re glad to have you!</Text>
//           <Text style={styles.paragraph}>
//             Get the best service available in the UAE{'\n'} from the most professional Sellers.
//           </Text>
//           <View style={styles.inputContainer}>
//             <InputFeilds
//               keyboardType="default"
//               labelName="Full Name"
//               value={formData.fullName}
//               onChangeText={(value) => setFormData({ ...formData, fullName: value })}
//             />
//             <InputFeilds
//               keyboardType="email-address"
//               labelName="Email"
//               value={formData.email}
//               onChangeText={(value) => setFormData({ ...formData, email: value })}
//             />
//             <InputFeilds
//               keyboardType="numeric"
//               labelName="Phone Number"
//               value={formData.number}
//               onChangeText={(value) => setFormData({ ...formData, number: value })}
//             />
//             <InputPassword
//               labelName="Password"
//               value={formData.password}
//               onChangeText={(value) => setFormData({ ...formData, password: value })}
//             />
//             <InputFeilds
//               keyboardType="default"
//               labelName="Car Name"
//               value={formData.carName}
//               onChangeText={(value) => setFormData({ ...formData, carName: value })}
//             />
//             <InputFeilds
//               keyboardType="default"
//               labelName="Car Plate Number"
//               value={formData.carPlateNumber}
//               onChangeText={(value) => setFormData({ ...formData, carPlateNumber: value })}
//             />
//             <InputFeilds
//               keyboardType="default"
//               labelName="Car Type"
//               value={formData.carType}
//               onChangeText={(value) => setFormData({ ...formData, carType: value })}
//             />
//             <InputFeilds
//               keyboardType="default"
//               labelName="Car Manufacturer"
//               value={formData.CarManufacturer}
//               onChangeText={(value) => setFormData({ ...formData, CarManufacturer: value })}
//             />
//           </View>
//           <TouchableOpacity  style={[styles.checkboxContainer,{marginLeft:20}]} onPress={handleCheckBoxToggle} activeOpacity={0.8}>
//             <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
//               {isChecked && <View style={styles.checkboxInner} />}
//             </View>
//             <View style={{width:'100%',flexDirection:"row"}}>
//             <Text style={styles.paragraphText}>
//             I agree with the{' '}
//               </Text>
//               <TouchableOpacity onPress={() => Linking.openURL('https://washta.com/PrivacyPolicy')}>
//               <Text style={styles.linkText}>terms of service</Text>
//               </TouchableOpacity>
//               <Text style={styles.paragraphText}> and{' '}</Text>
//               <TouchableOpacity onPress={() => Linking.openURL('https://washta.com/PrivacyPolicy')}>
//               <Text style={styles.linkText}>privacy policy</Text>
//               </TouchableOpacity>
//             </View>
            
//           </TouchableOpacity>
//         </View>
//       </KeyboardAwareScrollView>
//       <Spinner
//         visible={loading}
//         textContent={'Loading...'}
//         textStyle={styles.loaderText}
//         animation="fade"
//         overlayColor="rgba(0, 0, 0, 0.7)"
//         color="white"
//       />
//       <View style={styles.bottomContent}>
//         <Button loading={loading} text="Sign Up" Link={ButtonClick} />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContent: { // Added for consistent scroll content spacing
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   topContent: {
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 30,
//     fontFamily: FontsGeneral.MEDIUMSANS,
//     marginBottom: 12,
//     color: 'black',
//     textAlign: 'center',
//   },
//   paragraph: {
//     fontSize: 14,
//     marginBottom: 20,
//     textAlign: 'center',
//     fontFamily: Fonts.REGULAR,
//     color: 'black',
//     width: '100%',
//   },
//   inputContainer: {
//     width: '100%',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#747EEF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   checkboxChecked: {
//     backgroundColor: '#747EEF',
//   },
//   checkboxInner: {
//     width: 7,
//     height: 7,
//     borderRadius: 50,
//     backgroundColor: 'white',
//   },
//   paragraphText: {
//     fontFamily: Fonts.REGULAR,
//     fontSize: 13,
//     color: 'black',
//   },
//   linkText: {
//     color: '#747EEF',
//     textDecorationLine: 'underline',
//   },
//   bottomContent: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//   },
//   loaderText: {
//     color: 'white',
//   },
// });

// export default SignUp;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import InputFeilds from '../../allDynamicsComponets/inputFeilds';
import Button from '../../allDynamicsComponets/Button';
import { Fonts, FontsGeneral } from '../style';
import InputPassword from '../../allDynamicsComponets/InputPassowrd';
import { useToast } from 'react-native-toast-notifications';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'react-native-axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window'); // Get device width and height

const ApiUrl = 'https://backend.washta.com/api/auth/Signup';

const SignUp = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    carName: '',
    carType: '',
    number: '',
    carPlateNumber: '',
    CarManufacturer: ''
  });

  const paylod = {
    username: formData?.fullName,
    password: formData?.password,
    name: formData?.fullName,
    email: formData?.email,
    phone: formData?.number,
    role: 'customer',
    car: {
      vehicleManufacturer: formData?.CarManufacturer,
      vehiclePlateNumber: formData?.carPlateNumber,
      vehicleName: formData?.carName,
      vehicleType: formData?.carType
    }
  };

  const ButtonClick = async () => {
    // if (!formData.fullName || !formData.email || !formData.carName || !formData.password || !formData.carType || !formData.number || !formData.carPlateNumber) {
    //   toast.show('Incomplete Details. Please fill all details.', { type: 'danger', animationType: 'zoom-in' });
    // } else {
    //   setLoading(true);
    //   try {
    //     const response = await axios.post(ApiUrl, paylod);
    //     if (response.data.status) {
    //       const { accessToken, user } = response.data.data;
    //       navigation.navigate('OtpScreen', { paylod });
    //     }
    //   } catch (error) {
    //     toast.show(error.response.data.error, { type: 'danger', animationType: 'zoom-in' });
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    navigation.navigate('OtpScreen', { paylod });
  };

  return (
    <>
      <KeyboardAwareScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        extraHeight={250}
      >
        <View style={styles.topContent}>
          <Text style={styles.heading}>We’re glad to have you!</Text>
          <Text style={styles.paragraph}>
            Get the best service available in the UAE{'\n'} from the most professional Sellers.
          </Text>
          <View style={styles.inputContainer}>
            <InputFeilds
              keyboardType="default"
              labelName="Full Name"
              value={formData.fullName}
              onChangeText={(value) => setFormData({ ...formData, fullName: value })}
            />
            <InputFeilds
              keyboardType="email-address"
              labelName="Email"
              value={formData.email}
              onChangeText={(value) => setFormData({ ...formData, email: value })}
            />
            <InputFeilds
              keyboardType="numeric"
              labelName="Phone Number"
              value={formData.number}
              onChangeText={(value) => setFormData({ ...formData, number: value })}
            />
            <InputPassword
              labelName="Password"
              value={formData.password}
              onChangeText={(value) => setFormData({ ...formData, password: value })}
            />
            <InputFeilds
              keyboardType="default"
              labelName="Car Name"
              value={formData.carName}
              onChangeText={(value) => setFormData({ ...formData, carName: value })}
            />
            <InputFeilds
              keyboardType="default"
              labelName="Car Plate Number"
              value={formData.carPlateNumber}
              onChangeText={(value) => setFormData({ ...formData, carPlateNumber: value })}
            />
            <InputFeilds
              keyboardType="default"
              labelName="Car Type"
              value={formData.carType}
              onChangeText={(value) => setFormData({ ...formData, carType: value })}
            />
            <InputFeilds
              keyboardType="default"
              labelName="Car Manufacturer"
              value={formData.CarManufacturer}
              onChangeText={(value) => setFormData({ ...formData, CarManufacturer: value })}
            />
          </View>
          <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckBoxToggle} activeOpacity={0.8}>
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <View style={styles.checkboxInner} />}
            </View>
            <View style={styles.checkboxTextContainer}>
              <Text style={styles.paragraphText}>I agree with the </Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://washta.com/PrivacyPolicy')}>
                <Text style={styles.linkText}>terms of service</Text>
              </TouchableOpacity>
              <Text style={styles.paragraphText}> and </Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://washta.com/PrivacyPolicy')}>
                <Text style={styles.linkText}>privacy policy</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.loaderText}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.7)"
        color="white"
      />
      <View style={styles.bottomContent}>
        <Button loading={loading} text="Sign Up" Link={ButtonClick} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: width * 0.05, // 5% padding horizontally
    paddingVertical: height * 0.02,  // 2% padding vertically
  },
  topContent: {
    alignItems: 'center',
  },
  heading: {
    fontSize: width * 0.07, // Responsive font size
    fontFamily: FontsGeneral.MEDIUMSANS,
    marginBottom: height * 0.02,
    color: 'black',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: width * 0.035, // Responsive paragraph size
    marginBottom: height * 0.025,
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
    color: 'black',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginLeft: 20,
  },
  checkbox: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.025,
    borderWidth: 1,
    borderColor: '#747EEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#747EEF',
  },
  checkboxInner: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: width * 0.01,
    backgroundColor: 'white',
  },
  checkboxTextContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paragraphText: {
    fontFamily: Fonts.REGULAR,
    fontSize: width * 0.03,
    color: 'black',
  },
  linkText: {
    color: '#747EEF',
    textDecorationLine: 'underline',
    fontSize: width * 0.03,
  },
  bottomContent: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#fff',
    bottom:10
  },
  loaderText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    color: 'white',
  },
});

export default SignUp;