
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { Fonts } from '../style';
import Button from '../../allDynamicsComponets/Button';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.SubContainer}>
          <Image style={styles.logo} source={require('../../../assets/WashtaLogo.png')} />
        </View>
        <View style={styles.SubContainers}>
          <Image style={styles.logoMain} source={require('../../../assets/defualt.png')} />
        </View>
        <View style={styles.SubContainerButton}>
          <Text style={styles.text}>
            Get the best service available in the UAE from the most professional Sellers.
          </Text>
          <Button text="Sign In" Link={() => navigation.navigate('Login')} />
        </View>

        <View style={[styles.SubContainerButton, { paddingBottom: 30, paddingTop: 5 }]}>
          <Button text="Sign Up" Link={() => navigation.navigate('SignUp')} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
  },
  SubContainerButton: {
    width: '100%',
  },
  SubContainer: {
    alignItems: 'center',
  },
  SubContainers: {
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  text: {
    fontFamily: Fonts.REGULAR,
    color: '#000000',
    paddingBottom: height * 0.02,
    textAlign: 'center',
    fontSize: width * 0.04,
  },
  logo: {
    width: width * 0.6,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  logoMain: {
    width: width * 0.8,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});

export default Home;
