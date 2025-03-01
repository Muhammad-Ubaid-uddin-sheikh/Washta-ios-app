// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Text, StyleSheet, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
// import { Fonts } from '../screens/style';

// const InputField = ({ labelName, value, onChangeText, focus, maxLength, keyboardType, errorMessage,borderWidth,textTransform}) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [secureTextEntry, setSecureTextEntry] = useState(false);

//   useEffect(() => {
//     setSecureTextEntry(labelName.toLowerCase().includes('password'));
//   }, [labelName]);

//   const animatedValue = new Animated.Value(value === '' ? 0 : 1);

//   const handleFocus = () => {
//     setIsFocused(true);
//     Animated.timing(animatedValue, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleBlur = () => {
//     setIsFocused(value !== '');
//     Animated.timing(animatedValue, {
//       toValue: value === '' ? 0 : 1,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.container}>
//         <TextInput
//           style={[styles.input, { borderBottomColor: isFocused ? '#aaa' : '#aaa',borderBottomWidth: borderWidth ? borderWidth : 1, textTransform: textTransform  }]}
//           placeholder=" "
//           value={value}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           onChangeText={onChangeText}
//           secureTextEntry={secureTextEntry}
//           editable={focus}
//           maxLength={maxLength}
//         />
//         <Animated.Text
//           style={[
//             styles.label,
//             {
//               top: animatedValue.interpolate({
//                 inputRange: [0, 1.2],
//                 outputRange: [25, 2],
//               }),
//               fontSize: animatedValue.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [15, 13],
//               }),
//               color: animatedValue.interpolate({
//                 inputRange: [0, 5],
//                 outputRange: ['#aaa', '#000000'],
//               }),
//             },
//           ]}
//         >
//           {labelName}
//         </Animated.Text>
//         {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 2,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginHorizontal: 10,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: '#000',
//     color: '#000',
//     paddingBottom: 0,
//     fontSize: 14,
//     marginHorizontal: 10,
//     paddingLeft:2,
//     fontFamily: Fonts.MEDIUM,
//     paddingTop: 20,
//     height: 52,
//   },
//   label: {
//     position: 'absolute',
//     left: 12,
//     fontFamily: Fonts.MEDIUM,
//   },
// });

// export default InputField;
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Fonts } from '../screens/style';

const InputField = ({ labelName, value, onChangeText, focus, maxLength, keyboardType, errorMessage, borderWidth, textTransform }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const inputRef = useRef(null); // Input field ko reference dene ke liye

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
        <Animated.Text
          style={[
            styles.label,
            {
              top: animatedValue.interpolate({
                inputRange: [0, 1.2],
                outputRange: [25, 2],
              }),
              fontSize: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 13],
              }),
              color: animatedValue.interpolate({
                inputRange: [0, 5],
                outputRange: ['#aaa', '#000000'],
              }),
            },
          ]}
        >
          {labelName}
        </Animated.Text>

        <TextInput
          ref={inputRef} // Input field ka reference set kar diya
          style={[
            styles.input,
            { borderBottomColor: isFocused ? '#aaa' : '#aaa', borderBottomWidth: borderWidth ? borderWidth : 1, textTransform: textTransform },
          ]}
          placeholder=" "
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={focus}
          maxLength={maxLength}
        />

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginHorizontal: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    color: '#000',
    paddingBottom: 0,
    fontSize: 14,
    marginHorizontal: 10,
    paddingLeft: 2,
    fontFamily: Fonts.MEDIUM,
    paddingTop: 20,
    height: 52,
  },
  label: {
    position: 'absolute',
    left: 12,
    fontFamily: Fonts.MEDIUM,
  },
});

export default InputField;
