import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { FontsGeneral } from '../style';
import Button from '../../allDynamicsComponets/Button';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const Notifications = ({ navigation }) => {
    const [isActive, setIsActive] = useState(true);
    const [sound, setSound] = useState(false);
    const [isVibrate, setIsVibrate] = useState(true);

    return (
        <View style={styles.mainNotifcation}>
            <ToggleSwitch
                isOn={isActive}
                onColor="#747EEF"
                offColor="#cccccc"
                label="General Notification"
                labelStyle={styles.labelStyle}
                size="medium"
                onToggle={() => setIsActive(!isActive)}
            />

            <View style={styles.toggleContainer}>
                <ToggleSwitch
                    isOn={sound}
                    onColor="#747EEF"
                    offColor="#cccccc"
                    label="Sound"
                    labelStyle={styles.labelStyle}
                    size="medium"
                    onToggle={() => setSound(!sound)}
                />
            </View>

            <View style={styles.toggleContainer}>
                <ToggleSwitch
                    isOn={isVibrate}
                    onColor="#747EEF"
                    offColor="#cccccc"
                    label="Vibrate"
                    labelStyle={styles.labelStyle}
                    size="medium"
                    onToggle={() => setIsVibrate(!isVibrate)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button text="Save" Link={() => navigation.navigate('StepTwo')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainNotifcation: {
        flex: 1,
        paddingLeft:10,
        paddingRight:10
       
    },
    labelStyle: {
        color: 'black',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: width * 0.75, // Responsive width for label
        fontFamily: FontsGeneral.MEDIUMSANS,
        fontSize: width * 0.04, // Responsive font size
    },
    toggleContainer: {
        marginTop: height * 0.03, // Responsive margin based on screen height
    },
    buttonContainer: {
        position: 'absolute',
        bottom: height * 0.05, 
        left: 0,
        right: 0,
        paddingHorizontal: width * 0.05, 
    },
});

export default Notifications;
