import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Fonts } from '../screens/style';

const FloatingLabel = ({ labelText, animatedValue }) => {
  const floatingLabelStyle = {
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -5], // top value
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 13], // font size
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 10],
      outputRange: ['#aaa', '#000'], // color transition
    }),
  };

  return (
    <Animated.Text style={[styles.label, floatingLabelStyle]}>
      {labelText}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    paddingLeft: 10,
    fontFamily:Fonts.MEDIUM,
    fontSize:14
  },
});

export default FloatingLabel;
