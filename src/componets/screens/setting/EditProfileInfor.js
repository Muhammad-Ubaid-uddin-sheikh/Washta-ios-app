import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import InputFeilds from '../../allDynamicsComponets/inputFeilds';
import Button from '../../allDynamicsComponets/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { useToast } from 'react-native-toast-notifications';

const ApiUrl = 'https://backend.washta.com/api/Customer/Profile';
const UpdateApiUrl = 'https://backend.washta.com/api/Customer/Profile';

const EditProfileInfor = ({ navigation }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    phone: '',
    car: {
      _id: '',
      vehicleManufacturer: '',
      vehiclePlateNumber: '',
      vehicleName: '',
      vehicleType: ''
    }
  });
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(ApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.status) {
        setFormData({
          fullName: response.data.data.username,
          username: response.data.data.username,
          phone: response.data.data.phone,
          car: {
            _id: response.data.data.car._id,
            vehicleManufacturer: response.data.data.car.vehicleManufacturer,
            vehiclePlateNumber: response.data.data.car.vehiclePlateNumber,
            vehicleName: response.data.data.car.vehicleName,
            vehicleType: response.data.data.car.vehicleType
          }
        });
        console.log(JSON.stringify(response.data.data));
      } else {
        toast.show("error", { type: "danger", animationType: "zoom-in" });
      }
    } catch (error) {
      toast.show(error.message, { type: "danger", animationType: "zoom-in" });

    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.patch(UpdateApiUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.status) {
        toast.show("Profile updated successfully", { type: "success", animationType: "zoom-in" });
        navigation.navigate('Setting');
      } else {
        Alert.alert('Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error.response));
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.mainDivInf}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#747EEF" />
        </View>
      ) : (
        <>
          <ScrollView>
            <InputFeilds
              keyboardType='default'
              focus={true}
              labelName='Full Name'
              value={formData.fullName}
              onChangeText={(value) => setFormData({ ...formData, fullName: value })}
            />
            <InputFeilds
              keyboardType='default'
              focus={true}
              labelName='Username'
              value={formData.username}
              onChangeText={(value) => setFormData({ ...formData, username: value })}
            />
            <InputFeilds
              keyboardType='numeric'
              focus={true}
              labelName='Phone Number'
              value={formData.phone}
              onChangeText={(value) => setFormData({ ...formData, phone: value })}
            />
            <InputFeilds
              keyboardType='default'
              focus={true}
              labelName='Car Manufacturer'
              value={formData.car.vehicleManufacturer}
              onChangeText={(value) =>
                setFormData({ ...formData, car: { ...formData.car, vehicleManufacturer: value } })
              }
            />
            <InputFeilds
              keyboardType='default'
              focus={true}
              labelName='Car Plate Number'
              value={formData.car.vehiclePlateNumber}
              onChangeText={(value) =>
                setFormData({ ...formData, car: { ...formData.car, vehiclePlateNumber: value } })
              }
            />
            <InputFeilds
              keyboardType='default'
              focus={true}
              labelName='Car Name'
              value={formData.car.vehicleName}
              onChangeText={(value) =>
                setFormData({ ...formData, car: { ...formData.car, vehicleName: value } })
              }
            />
            <InputFeilds
              keyboardType='default'
              focus={true}
              labelName='Car Type'
              value={formData.car.vehicleType}
              onChangeText={(value) =>
                setFormData({ ...formData, car: { ...formData.car, vehicleType: value } })
              }
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button text="Save" Link={handleSave} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainDivInf: {
    paddingHorizontal: 15,
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  }
});

export default EditProfileInfor;