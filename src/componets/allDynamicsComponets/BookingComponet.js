import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import { FontsGeneral } from '../screens/style';

const BookingComp = ({ data, CencelBtn, TrackBtn, colorBtntext, transparentBtn, showCancelBtn, showTimer,time,date }) => {
  const [seconds, setSeconds] = useState(null); // Initial state is null to handle loading
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!showTimer) return; // Only run the timer logic if showTimer is true

    const initializeTimer = async () => {
      try {
        const storedStartTime = await AsyncStorage.getItem(`startTime_${data._id}`);
        const expirationTime = await AsyncStorage.getItem(`expirationTime_${data._id}`);
        const currentTime = Date.now();
        const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        let remainingTime = 60; // Default 1 minute

        if (storedStartTime && expirationTime) {
          if (currentTime > parseInt(expirationTime, 10)) {
            // If the current time is past the expiration time, clear the storage and reset timer
            await AsyncStorage.removeItem(`startTime_${data._id}`);
            await AsyncStorage.removeItem(`expirationTime_${data._id}`);
            setSeconds(60);
          } else {
            const elapsed = Math.floor((currentTime - parseInt(storedStartTime, 10)) / 1000);
            remainingTime = 60 - elapsed;
            setSeconds(Math.max(remainingTime, 0));
          }
        } else {
          await AsyncStorage.setItem(`startTime_${data._id}`, currentTime.toString());
          await AsyncStorage.setItem(`expirationTime_${data._id}`, (currentTime + ONE_DAY).toString());
          setSeconds(remainingTime);
        }
      } catch (error) {
        console.error('Error initializing timer:', error);
        setSeconds(0); // Fallback to 0 seconds if there's an error
      }
    };

    initializeTimer();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [showTimer]);

  useEffect(() => {
    if (seconds === null) return; // If seconds is null, we are still initializing

    if (showTimer && showCancelBtn && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [seconds, showCancelBtn, showTimer]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (seconds === null && showTimer) {
    // While seconds is still null and showTimer is true, you can show a loading state or spinner
    return null; // Or return a loading component
  }

  return (
    <View style={styles.MainContainer}>
      <View style={styles.secondDivTitle}>
        {showTimer && seconds > 0 && (
          <TouchableOpacity style={styles.cancelTimerContainer}>
            <Text style={styles.cancelTimerText}>
              Cancellation: {formatTime(seconds)} minutes left
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.mainBoxCarNameSelect}>
          <View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.carHubName}>{data.Name || 'John Doe Car Hub'}</Text>
            <Text style={[styles.carHubName,{fontSize:12}]}>{date || '02 Sep '} | {time || '02:15 AM'}</Text>
            </View>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detail}>
                <Text style={styles.label}>Order ID:</Text>
                <Text style={styles.value}>WS-{data.customerId._id.slice(20)}</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.label}>Order Date:</Text>
                <Text style={styles.value}>203</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.label}>Cost:</Text>
                <Text style={styles.value}>AED {data.cost}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {showTimer && seconds > 0 && (
            <TouchableOpacity onPress={CencelBtn} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>{transparentBtn}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={TrackBtn} style={[styles.trackButton, { width: showTimer && seconds > 0 ? '48%' : '100%' }]}>
            <Text style={styles.trackButtonText}>{colorBtntext}</Text>
            <Arrow name='keyboard-arrow-right' size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 10,
  },
  secondDivTitle: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    borderRadius: 10,
    padding: 15,
  },
  mainBoxCarNameSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  carHubName: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 15,
    color: 'black',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  detail: {
    paddingTop: 10,
  },
  label: {
    fontFamily: FontsGeneral.REGULARSANS,
    fontSize: 12,
    color: 'black',
  },
  value: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 14,
    color: 'black',
    paddingTop: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  cancelButton: {
    flexDirection: 'row',
    width: '48%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 14,
    color: 'black',
    width: '100%',
    paddingVertical: 7,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#747EEF',
    paddingHorizontal: 6,
    paddingVertical: 7,
    borderRadius: 8,
  },
  trackButtonText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  cancelTimerContainer: {
    flexDirection: 'row',
    width: 260,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#FF5C5C',
    paddingHorizontal: 3,
    paddingVertical: 3.5,
    borderRadius: 6,
    justifyContent: 'center',
    marginBottom: 10,
  },
  cancelTimerText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 13,
    color: '#FF5C5C',
    textAlign: 'center',
  },
});

export default BookingComp;
