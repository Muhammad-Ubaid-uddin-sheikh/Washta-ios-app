import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';
import { Fonts } from '../screens/style';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const App = ({ labelName, value, onChangeText, focus, maxLength, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = new Animated.Value(value === '' ? 0 : 1);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(value !== '');
    Animated.timing(animatedValue, {
      toValue: value === '' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const formatCardNumber = (text) => {
    return text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (text) => {
    return text.replace(/(\d{2})(\d{2})/, '$1/$2');
  };

  const handleChangeText = (text) => {
    let formattedText = text;
    if (labelName === "Card Number") {
      formattedText = formatCardNumber(text);
    } else if (labelName === "Expiry Date") {
      formattedText = formatExpiryDate(text);
    }
    onChangeText(formattedText);
  };

  return (
    <View style={styles.container}>
      <AnimatedTextInput
        style={[styles.input, { borderBottomColor: isFocused ? '#aaa' : '#aaa' }]}
        placeholder=" "
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
        editable={focus}
        maxLength={maxLength}
      />
      <Animated.Text
        style={[
          styles.label,
          {
            top: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [27, 10],
            }),
            fontSize: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 13],
            }),
            color: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['#aaa', '#000000'],
            }),
          },
        ]}
      >
        {labelName}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 9,
  },
  input: {
    paddingLeft: 15,
    paddingRight: 40,
    fontSize: 14,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderColor: '#000000',
    shadowOpacity: 1,
    color: '#212121',
    fontFamily: Fonts.MEDIUM,
    height: 60,
    paddingTop: 30,
    width: '100%',
  },
  label: {
    position: 'absolute',
    left: 12,
    fontFamily: Fonts.MEDIUM,
  },
});

export default App;
