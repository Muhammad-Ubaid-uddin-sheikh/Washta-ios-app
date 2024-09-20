import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Fonts } from '../screens/style';
import { useToast } from 'react-native-toast-notifications';
import ImageLogo from '../../assets/app.logo.jpeg'
const ImageUploadImg = 'https://backend.washta.com/api/customer/uplaodAvatar';
const GetProfile = 'https://backend.washta.com/api/Customer/Profile';

const ImageUpload = () => {
  const toast = useToast();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(null);

  useEffect(() => {
    fetchImagesFromServer();
  }, []);

  const handleImagePicker = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      cropping: true,
    })
      .then((images) => {
        images.forEach(image => {
          uploadImage(image.path);
        });
        
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const uploadImage = async (imagePath) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('Avatar', {
      uri: imagePath,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.post(ImageUploadImg, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.code === 200) {
        const uploadedImagePath = res.data.data.path;
        console.log("Image uploaded successfully:", uploadedImagePath);
        setImageUri(uploadedImagePath);
        fetchImagesFromServer(); // Fetch images again to update the state
        toast.show('Image uploaded successfully', {
          type: 'success',
        });
      }
    } catch (error) {
      console.log("Error uploading image:", error.response);
      toast.show('Error uploading image', {
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchImagesFromServer = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.get(GetProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.code === 200) {
        const fetchedImages = res.data.data;
        setUploadedImages(fetchedImages?.avatar);
        console.log('Fetched avatar:', fetchedImages);
      }
    } catch (error) {
      console.log("Error fetching images:", error.response);
    }finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#747EEF" />
      ) : (
        uploadedImages ? (
          <Image source={{ uri: uploadedImages }} style={styles.defaultImage} />
        ) : (
          <Image source={ImageLogo} style={styles.defaultImage} />
        )
      )}
      <Text style={styles.TextLink} onPress={handleImagePicker}>Edit Image</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  defaultImage: {
    width: 80,
    height: 80,
    marginTop: 10,
    borderRadius: 100,
  },
  selectedImage: {
    width: 80,
    height: 80,
    marginBottom: 3,
    borderRadius: 100,
  },
  TextLink: {
    fontSize: 13,
    lineHeight: 24,
    color: '#747EEF',
    fontWeight: '600',
    fontFamily: Fonts.MEDIUM,
    letterSpacing: 0.4,
    marginLeft: 10,
  },
});

export default ImageUpload;