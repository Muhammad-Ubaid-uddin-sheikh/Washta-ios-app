import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { FontsGeneral } from '../screens/style'; // Assuming you're using this font file

const { width, height } = Dimensions.get('window'); // Get device width and height

const App = ({ labelName, value, onChangeText, focus, maxLength, keyboardType, errorMessage }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  useEffect(() => {
    setSecureTextEntry(labelName.toLowerCase().includes('password'));
  }, [labelName]);

  const animatedValue = new Animated.Value(value === '' ? 0 : 1);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(value !== '');
    Animated.timing(animatedValue, {
      toValue: value === '' ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input, 
          { borderBottomColor: isFocused ? '#aaa' : '#000' } // Border color logic
        ]}
        placeholder=" "
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={focus}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
      <Animated.Text
        style={[
          styles.label,
          {
            top: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [27, 10], // Floating label positioning
            }),
            fontSize: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 13], // Adjusted font size
            }),
            color: animatedValue.interpolate({
              inputRange: [0, 5],
              outputRange: ['#aaa', '#000'], // Text color change
            }),
          },
        ]}
      >
        {labelName}
      </Animated.Text>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2, // Same margin style as in previous component
  },
  input: {
    borderBottomWidth: 1, // Consistent border for input
    borderColor: '#000', // Default border color
    color: '#000', // Black text
    paddingBottom: 4, // Padding similar to previous component
    fontSize: 13, // Matching font size
    marginHorizontal: 10, // Horizontal margin
    fontFamily: FontsGeneral.MEDIUMSANS, // Use of the same font family
    paddingTop: 20, // Padding for top space
    height: 60, // Adjusted height to maintain layout
  },
  label: {
    position: 'absolute',
    left: 12, // Label position
    fontFamily: FontsGeneral.MEDIUMSANS, // Same font family for label
  },
  errorText: {
    color: 'red', // Error message color
    fontSize: 12, // Smaller font size for error message
    marginHorizontal: 10, // Consistent horizontal margin for error text
  },
});

export default App;
