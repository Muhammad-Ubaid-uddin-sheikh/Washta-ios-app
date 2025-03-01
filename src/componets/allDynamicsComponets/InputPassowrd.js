
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Fonts } from '../screens/style';

const App = ({ labelName, value, onChangeText, focus, maxLength, keyboardType, errorMessage }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const inputRef = useRef(null);
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
    <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
      <View style={styles.container}>
        <TextInput
        ref={inputRef}
          style={[styles.input, { borderBottomColor: isFocused ? '#aaa' : '#aaa' }]}
          placeholder=" "
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry} // Set secureTextEntry dynamically
          editable={focus}
          maxLength={maxLength}
        />
        <Animated.Text
          style={[
            styles.label,
            {
              top: animatedValue.interpolate({
                inputRange: [0, 1.3],
                outputRange: [22, 5],
              }),
              fontSize: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 13],
              }),
              color: animatedValue.interpolate({
                inputRange: [0, 3],
                outputRange: ['#aaa', '#000000'],
              }),
            },
          ]}
        >
          {labelName}
        </Animated.Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 9,
  },
  errorText: {
    color: 'red',
    fontSize: 30,
  },
  input: {
    paddingLeft: 12,
    paddingRight: 40,
    fontSize: 14,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderColor: '#000000',
    color: '#212121',
    fontFamily: Fonts.MEDIUM,
    height: 50,
    paddingTop: 15,
    width: '100%',
    marginHorizontal:0
  },
  label: {
    position: 'absolute',
    left: 12,
    fontFamily: Fonts.MEDIUM,
  },
});

export default App;
