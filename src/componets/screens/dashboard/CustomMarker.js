import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const CustomMarker = ({ coordinate, image, onPress }) => {
  return (
    <Marker coordinate={coordinate}>
      <TouchableOpacity style={styles.markerContainer} onPress={onPress}>
        <View style={styles.marker}>
          <Image source={{ uri: image }} style={styles.markerImage} />
        </View>
        <View style={styles.markerTriangle} />
      </TouchableOpacity>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 30,
    height: 30, // Adjusted for a more circular marker
    borderRadius: 25, // Half of width/height for circular shape
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Ensure the background is transparent
  },
  markerImage: {
    width: '100%', // Make image responsive to container size
    height: '100%',
    borderRadius: 25, // Match the borderRadius of the marker
    borderWidth: 2, // Adjust the border width
    borderColor: '#747EEF', // Marker border color
    resizeMode: 'cover', // Ensure the image covers the entire space
  },
  markerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10, // Adjusted for better visual appearance
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 15,
    borderTopColor: '#747EEF',
    position: 'absolute',
    bottom: -10, // Adjust the position of the triangle
  },
});

export default CustomMarker;
