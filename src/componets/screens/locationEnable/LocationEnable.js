import React from 'react';
import { View, Text, StyleSheet,  Image } from 'react-native';
import Button from '../../allDynamicsComponets/Button';
import { Fonts, FontsGeneral } from '../style';

const EnableLocation = ({navigation}) => {
const ButtonClick = ()=>{
  navigation.navigate('Dashbaord')
}

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.heading}>Enable your location</Text>
        <Text style={styles.paragraph}>To provide you with the best experience, please enable your GPS location. This will help us show you the best shops near you based on your current location. </Text>
        <View style={styles.inputContainer}>
        <Image style={styles.ImageLocation} source={require('../../../assets/EnableLocation.png')}  />
      </View>
      </View>
      
      <View style={styles.bottomContent}>
        <Button text="Continue" Link={ButtonClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
    // paddingBottom: 10,
    backgroundColor: '#fff',
  },
  topContent: {
    alignItems: 'center',
    width:'100%',
    paddingTop:20
  },
  bottomContent: {
    marginBottom: 15,
    width:'100%',
    bottom:20
  },
  heading: {
    fontSize: 30,
    fontFamily: FontsGeneral.MEDIUMSANS,
    marginBottom: 12,
    color: 'black',
    textAlign: 'center'
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
    color: 'black',
    width:300
  },
  inputContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:20
  },
  forgotPas: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'auto',
    fontFamily: FontsGeneral.REGULAR,
    paddingLeft: 12,
    color:'#747EEF'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    width: 50,
    height: 60,
    textAlign: 'center',
    fontSize: 20,
  },
  ImageLocation:{
    width:'100%',
    height:200,
    objectFit:'cover'
  }
});

export default EnableLocation;
