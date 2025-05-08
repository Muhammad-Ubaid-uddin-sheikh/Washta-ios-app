import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { FontsGeneral } from '../style';
import Button from '../../allDynamicsComponets/Button';
import IconBtnArrow from '../../allDynamicsComponets/IconBtnArrow';
import SecurityIcon from '../../../assets/security.png';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Security = () => {
    const [isActive, setIsActive] = useState(true);
    const [sound, setsound] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.mainNotifcation}>
            <ToggleSwitch
                isOn={isActive}
                onColor="#747EEF"
                offColor="#cccccc"
                label="Remember login details"
                labelStyle={styles.labelStyle}
                size="medium"
                onToggle={() => setIsActive(!isActive)}
            />

            <View style={styles.iconContainer}>
                <IconBtnArrow 
                    HandleClick={() => navigation.navigate('Password')} 
                    Imagess={SecurityIcon} 
                    Name="Change Password" 
                />
            </View>

            {/* <View style={styles.buttonContainer}>
                <Button text="Save" Link={() => navigation.goBack()} />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    mainNotifcation: {
        flex: 1,
        paddingHorizontal:10
        
      
    },
    labelStyle: {
        color: "black",
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: width * 0.75, // Responsive width
        fontFamily: FontsGeneral.MEDIUMSANS,
        fontSize: width * 0.04, // Responsive font size
        paddingRight:10,
       
    },
    iconContainer: {
        paddingTop: height * 0.02, // Responsive padding
        paddingHorizontal: width * 0.04,
       
    },
    buttonContainer: {
        position: 'absolute',
        bottom: height * 0.05, // Responsive bottom padding
        left: 0,
        right: 0,
        paddingHorizontal: width * 0.05, // Responsive horizontal padding
    },
});

export default Security;
