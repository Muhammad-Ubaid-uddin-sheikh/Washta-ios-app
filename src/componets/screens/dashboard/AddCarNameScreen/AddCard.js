import React, { useState } from 'react';
import { View, Text, StyleSheet,  ActivityIndicator } from 'react-native';
import InputFeilds from '../../../allDynamicsComponets/inputFeilds'
import Button from '../../../allDynamicsComponets/Button'
import { useToast } from 'react-native-toast-notifications';
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const ApiUrl  = 'https://backend.washta.com/api/customer/vehicle'
const AddCarScreen = () => {
  const [carName, setCarName] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [cars, setCars] = useState('');
  const navigation = useNavigation()
const [Manufacturer, setManufacturer] = useState('')
const [loading,setLoading] = useState(false)
const toast = useToast()
const payload = {
  vehicleManufacturer:Manufacturer,
    vehiclePlateNumber: carPlate,
    vehicleName: carName,
    vehicleType:cars
}
const ButtonClick = async () => {
  if (!carName || !carPlate || !cars || !Manufacturer  ) {
    toast.show("Incomplete Details Plz fill All Details",{type: "danger",animationType:"zoom-in"}); 
    }  else{
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
        toast.show('user car successfully added', { type: "success", animationType: "zoom-in" });
    setCarName('');
    setCarPlate('');
    setCars('');
    setManufacturer('');
    navigation.navigate('SelectCar')
        console.log("asdasd",payload,'paylod',response)
      }
    } 
    catch (error) {
      console.log(error);
      navigation.navigate('SelectCar')
        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
    }finally{
      setLoading(false);
  }
}
};

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#747EEF" />
        </View>
      ) : (<>
        <View style={{height:240}}>
        <InputFeilds focus={true} labelName='Car Manufacturer*' value={Manufacturer} onChangeText={(text) => setManufacturer(text)} />
      <InputFeilds focus={true} labelName='Car Name*' value={carName} onChangeText={(text) => setCarName(text)} />
      <InputFeilds focus={true} labelName='Car Plate Number' value={carPlate} onChangeText={(text) => setCarPlate(text)} />
      <InputFeilds focus={true} labelName='Car Type' value={cars} onChangeText={(text) =>setCars(text)} />
        </View>
        <View style={{paddingBottom:20}}>
        <Button text="Add Vehicle" Link={ButtonClick} />
        </View>
        </> )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:15,
    justifyContent:'space-between',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  carBox: {
    backgroundColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default AddCarScreen;