import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedTextInput from '../../allDynamicsComponets/CardInputFeild'; // Adjust the import based on your file structure
import Button from '../../allDynamicsComponets/Button'
import { FontsGeneral } from '../style';

const AddCardScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const saveCard = async () => {
    if (!cardNumber || !cardholderName || !cvv || !expiryDate) {
      alert('Please fill all fields');
      return;
    }

    const newCard = {
      cardNumber,
      cardholderName,
      cvv,
      expiryDate,
    };

    try {
      const storedCards = await AsyncStorage.getItem('cards');
      const cards = storedCards ? JSON.parse(storedCards) : [];
      cards.push(newCard);
      await AsyncStorage.setItem('cards', JSON.stringify(cards));
      // setTimeout(()=>{
      //   navigation.goBack();
      // },[5000])
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.HeadingCard}>Add your card details</Text>
      <AnimatedTextInput
        labelName="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        focus={true}
        maxLength={19} // Adjust maxLength based on format
        keyboardType="numeric"
      />
      <AnimatedTextInput
        labelName="Cardholder Name"
        value={cardholderName}
        onChangeText={setCardholderName}
        focus={true}
        maxLength={30}
        keyboardType="default"
      />
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{width:'50%'}}>
        <AnimatedTextInput
        labelName="CVV"
        value={cvv}
        onChangeText={setCvv}
        focus={true}
        maxLength={3}
        keyboardType="numeric"
      />
        </View>
        <View style={{width:'50%'}}>
        <AnimatedTextInput
        labelName="Expiry Date"
        value={expiryDate}
        onChangeText={setExpiryDate}
        focus={true}
        maxLength={5}
        keyboardType="numeric"
      />
        </View>
      </View>
     
     
      <View style={styles.buttonContainer}>
      <Button text="Save Details" Link={saveCard} />
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    paddingHorizontal:15
  }, buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  HeadingCard:{
    fontFamily:FontsGeneral.MEDIUMSANS,
    fontSize:18,
    color:'black',
    paddingHorizontal:10
  }
});

export default AddCardScreen;
