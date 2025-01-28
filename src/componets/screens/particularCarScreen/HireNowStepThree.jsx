
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Fonts, FontsGeneral } from '../style';
import Button from '../../allDynamicsComponets/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import PaymnetNavigation from '../../allDynamicsComponets/Paymnet';

const HireNowStepTwo = ({ navigation, route }) => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const { payload, Link } = route.params;
  
  const Paymnet = Link;
  console.log('Paymnet', Paymnet);

  const Handlepress = () => {
    Alert.alert('Pago exitosa', 'Transición exitosa');
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const storedCards = await AsyncStorage.getItem('cards');
        if (storedCards) {
          const parsedCards = JSON.parse(storedCards);
          setCards(parsedCards);
          setSelectedCard(parsedCards[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCards();
  }, []);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    console.log(card);
  };

  const handleDeleteCard = async (cardNumber) => {
    const updatedCards = cards.filter(card => card.cardNumber !== cardNumber);
    setCards(updatedCards);
    await AsyncStorage.setItem('cards', JSON.stringify(updatedCards));
  };

  const getCardImage = (cardNumber) => {
    if (cardNumber.startsWith('4')) {
      return require('../../../assets/visa.png');
    } else if (cardNumber.startsWith('5')) {
      return require('../../../assets/mastercard.png');
    } else if (cardNumber.startsWith('3')) {
      return require('../../../assets/american-express.png');
    } else {
      return null;
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, selectedCard === item && styles.selectedCard]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handleDeleteCard(item.cardNumber)}>
            <Feather name="trash-2" style={{ color: 'red', fontSize: 20 }} />
          </TouchableOpacity>
          <Image source={getCardImage(item.cardNumber)} style={{ width: 45, height: 22, marginLeft: 10, resizeMode: 'contain' }} />
          <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, color: 'black', fontSize: 15 }}>
            Ending with <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 18 }}> {item.cardNumber.slice(-4)}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleSelectCard(item)}
        >
          {selectedCard === item && <View style={styles.radioButtonSelected} />}
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.cvvInput}
        placeholder="CVV"
        keyboardType="numeric"
        maxLength={3}
        secureTextEntry
        value={item.cvv}
        editable={false}
      />
    </View>
  );

  return (
  
      <View style={styles.container}>
       
       <View style={styles.progressContainer}>
                    <View style={styles.completedStep}>
                        <Text style={styles.stepText}>1</Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: '#747EEF' }]} />
                    <View style={[styles.step, { backgroundColor: '#747EEF', borderColor: '#747EEF', borderWidth: 1 }]}>
                        <Text style={[styles.stepText, { color: 'white' }]}>2</Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: '#747EEF' }]} />
                    <View style={[styles.step, { backgroundColor: '#747EEF', borderColor: '#747EEF', borderWidth: 1 }]}>
                        <Text style={[styles.stepText, { color: 'white' }]}>3</Text>
                    </View>
                </View>
        
              <PaymnetNavigation  text="Confirmar Retiro" Link={() => Handlepress()} Paymnet={Paymnet} />

      </View>
  
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    // textAlign: 'left',
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#a6a6a6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#747EEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '30.5%',
    height: 1.5,
    marginHorizontal: 10,
    backgroundColor: '#a6a6a6',
  },
  stepText: {
    color: '#fff',
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 16,
  },
  card: {
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 20,
    borderColor: '#747FE8',
    borderWidth: 0.5,
    paddingVertical: 10,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#747FE8',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  cvvInput: {
    borderWidth: 1,
    borderBottomColor: '#ccc',
    width: 90,
    padding: 0,
    borderColor: '#747FE8',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 50,
    color: '#212121',
    fontFamily: FontsGeneral.REGULARSANS,
    fontSize: 12,
    paddingVertical: 0,
    marginTop: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#747FE8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#747FE8',
  },
});

export default HireNowStepTwo;
