import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Fonts, FontsGeneral } from '../style';

const Popup = ({ visible, onClose, message }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
            <Image source={require('../../../assets/hiringReq.png')} style={{width:150,height:120,objectFit:'contain'}}/>
         <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:23,marginTop:15}}>Hiring Request Sent</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>View Job Bookings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
   
    
  },
  popup: {
    width: 340,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal:30,
   
  },
  message: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily:Fonts.REGULAR,
    marginTop:10,
    color:'black'
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#747EEF',
    fontSize: 16,
    backgroundColor:'white',
   fontFamily:FontsGeneral.MEDIUMSANS

  },
});

export default Popup;
