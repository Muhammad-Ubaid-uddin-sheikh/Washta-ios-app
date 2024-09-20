import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Dot from 'react-native-vector-icons/Entypo';
import { FontsGeneral } from '../../style';
import ImageCar from '../../../../assets/nocar.png';
import Button from '../../../allDynamicsComponets/Button';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import DeleteIcon from 'react-native-vector-icons/AntDesign'; // For delete icon
import { useFocusEffect } from '@react-navigation/native';

const ApiUrl = 'https://backend.washta.com/api/customer/vehicle';
const UpdateSelectedVehicleApiUrl = 'https://backend.washta.com/api/customer/Selectcar';
const DeleteVehicleApiUrl = 'https://backend.washta.com/api/customer/vehicle'; // Replace with actual URL

const SelectCarScreen = ({ route, navigation }) => {
  const vehicles = useSelector(state => state.vehicles);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingItemId, setDeletingItemId] = useState(null); // Track the item being deleted
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const toast = useToast();

  const fetchUserData = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(ApiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (response.data.status) {
        const fetchedData = response.data.data.reverse();
        setData(fetchedData);
        const defaultSelectedVehicle = fetchedData.find(vehicle => vehicle.isSelected);
        if (defaultSelectedVehicle) {
          setSelectedItem(defaultSelectedVehicle);
        } else {
          setSelectedItem(fetchedData[0]); // Default to the first vehicle if none are selected
          handleSelectItem(fetchedData[0]); // Automatically call the API to set it as selected
        }
      } else {
        toast.show("Failed to fetch vehicles", { type: "danger", animationType: "zoom-in" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.show(errorMessage, { type: "danger", animationType: "zoom-in" });
    } finally {
      setLoading(false);
      setRefreshing(false); // Reset refreshing state
    }
  };

  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.patch(UpdateSelectedVehicleApiUrl, { id: item._id }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.status) {
        toast.show("Vehicle selected successfully", { type: "success", animationType: "zoom-in" });
      } else {
        toast.show("Failed to update selected vehicle", { type: "danger", animationType: "zoom-in" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.show(errorMessage, { type: "danger", animationType: "zoom-in" });
    }
  };

  const handleDeleteItem = async (item) => {
    setDeletingItemId(item._id); // Set the item being deleted
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`${DeleteVehicleApiUrl}/${item._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.status) {
        setData(prevData => prevData.filter(vehicle => vehicle._id !== item._id));
        toast.show("Vehicle deleted successfully", { type: "success", animationType: "zoom-in" });
      } else {
        toast.show("Failed to delete vehicle", { type: "danger", animationType: "zoom-in" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.show(errorMessage, { type: "danger", animationType: "zoom-in" });
    } finally {
      setDeletingItemId(null); // Reset the item being deleted
    }
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true); // Trigger refreshing state
    fetchUserData(true); // Pass true to indicate a refresh
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#747EEF" />
        </View>
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={ImageCar} style={styles.emptyImage} />
          <Text style={styles.emptyText}>Please add a vehicle</Text>
          <Button text='Add Vehicle' Link={() => navigation.navigate('AddCar')} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={[styles.mainBoxCarNameSelect, selectedItem === item && styles.selectedItem]}>
              <TouchableOpacity
                onPress={() => handleSelectItem(item)}
                style={[
                  styles.selectionIndicator,
                  selectedItem === item && styles.selectedIndicator
                ]}
              >
                {selectedItem === item && <View style={styles.selectedCircle} />}
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.vehicleText}>
                  {item.vehicleManufacturer} {item.vehicleName}
                </Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    {item.vehicleType}
                  </Text>
                  <Dot name='dot-single' size={20} color={'black'} />
                  <Text style={styles.infoText}>
                    {item.vehiclePlateNumber}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item)}>
                {deletingItemId === item._id ? (
                  <ActivityIndicator size="small" color="#747EEF"  />
                ) : (
                  <DeleteIcon name="delete" size={24} color="#747EEF" />
                )}
              </TouchableOpacity>
            </View>
          )}
          refreshing={refreshing} // Set refreshing state
          onRefresh={handleRefresh} // Set function to be called on refresh
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    objectFit: 'contain',
    width: '100%',
    height: '50%',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: FontsGeneral.REGULARSANS,
    color: 'black',
  },
  mainBoxCarNameSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between elements
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#747fe854',
    backgroundColor: '#f2f2f2'
  },
  selectedItem: {
    borderColor: '#747EEF',
    borderWidth: 1.5,
  },
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#747EEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    borderColor: '#747EEF',
  },
  selectedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#747EEF',
  },
  textContainer: {
    paddingLeft: 20,
  },
  vehicleText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 14,
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    width: 260,
  },
  infoText: {
    fontFamily: FontsGeneral.REGULARSANS,
    fontSize: 13,
    color: 'black',
  },
  deleteButton: {
    width: 70,
  },
});

export default SelectCarScreen;
