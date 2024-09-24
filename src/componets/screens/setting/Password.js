// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Alert } from 'react-native';
// import INputPasword from '../../allDynamicsComponets/InputPassowrd';
// import Button from '../../allDynamicsComponets/Button';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'react-native-axios';
// import { useToast } from 'react-native-toast-notifications';

// const UpdateApiUrl = 'https://backend.washta.com/api/customer/updatePassword';

// const Password = () => {
//     const [currentPas, setCurrentPas] = useState('');
//     const [password, setPassword] = useState('');
//     const [rePassword, setRePassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const toast = useToast();
//     const navigation = useNavigation();

//     const handleSave = async () => {
//         if (password !== rePassword) {
//             setError('Passwords do not match.');
//             return;
//         }

//         setError('');
//         setLoading(true);

//         try {
//             const accessToken = await AsyncStorage.getItem('accessToken');
//             const response = await axios.patch(UpdateApiUrl, {
//                 previousPassword: currentPas,
//                 newPassword: password
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             });

//             if (response.data.status) {
//                 toast.show("Password Updated Successfully", { type: "success", animationType: "zoom-in" });
//                 navigation.navigate('Setting');
//             } else {
//                 Alert.alert('Failed to update profile');
//             }
//         } catch (error) {
//             if (error.response?.status === 401) {
//                 // Specific handling for unauthorized error
//                 toast.show('Error', 'Please enter the correct current password.');
//             } else {
//                 toast.show('Please enter the correct current password.',{ type: "danger", animationType: "zoom-in" });
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handlePasswordChange = (text, type) => {
//         if (type === 'current') {
//             setCurrentPas(text);
//         } else if (type === 'new') {
//             setPassword(text);
//         } else if (type === 'confirm') {
//             setRePassword(text);
//         }
//         if (error) {
//             setError(''); // Clear the error when user starts typing
//         }
//     };

//     return (
//         <View style={{ paddingHorizontal: 10, flex: 1 }}>
//             <INputPasword
//                 focus={true}
//                 labelName='Current Password'
//                 value={currentPas}
//                 onChangeText={(text) => handlePasswordChange(text, 'current')}
//             />
//             <INputPasword
//                 focus={true}
//                 labelName='New Password'
//                 value={password}
//                 onChangeText={(text) => handlePasswordChange(text, 'new')}
//                 errorMessage={error}
//             />
//             <INputPasword
//                 focus={true}
//                 labelName='Confirm Password'
//                 value={rePassword}
//                 onChangeText={(text) => handlePasswordChange(text, 'confirm')}
//                 errorMessage={error}
//             />
//             <Text>{error}</Text>
//             <View style={styles.buttonContainer}>
//                 <Button
//                     loading={loading}
//                     text="Change Password"
//                     Link={handleSave}
                    
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 20,
//         left: 0,
//         right: 0,
//         paddingHorizontal: 15,
//     }
// });

// export default Password;
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
import INputPasword from '../../allDynamicsComponets/InputPassowrd';
import Button from '../../allDynamicsComponets/Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { useToast } from 'react-native-toast-notifications';

const UpdateApiUrl = 'https://backend.washta.com/api/customer/updatePassword';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const Password = () => {
    const [currentPas, setCurrentPas] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const navigation = useNavigation();

    const handleSave = async () => {
        if (password !== rePassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.patch(UpdateApiUrl, {
                previousPassword: currentPas,
                newPassword: password
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.status) {
                toast.show("Password Updated Successfully", { type: "success", animationType: "zoom-in" });
                navigation.navigate('Setting');
            } else {
                Alert.alert('Failed to update profile');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                toast.show('Error', 'Please enter the correct current password.');
            } else {
                toast.show('Please enter the correct current password.', { type: "danger", animationType: "zoom-in" });
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (text, type) => {
        if (type === 'current') {
            setCurrentPas(text);
        } else if (type === 'new') {
            setPassword(text);
        } else if (type === 'confirm') {
            setRePassword(text);
        }
        if (error) {
            setError(''); // Clear the error when user starts typing
        }
    };

    return (
        <View style={styles.mainContainer}>
            <INputPasword
                focus={true}
                labelName='Current Password'
                value={currentPas}
                onChangeText={(text) => handlePasswordChange(text, 'current')}
            />
            <INputPasword
                focus={true}
                labelName='New Password'
                value={password}
                onChangeText={(text) => handlePasswordChange(text, 'new')}
                errorMessage={error}
            />
            <INputPasword
                focus={true}
                labelName='Confirm Password'
                value={rePassword}
                onChangeText={(text) => handlePasswordChange(text, 'confirm')}
                errorMessage={error}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.buttonContainer}>
                <Button
                    loading={loading}
                    text="Change Password"
                    Link={handleSave}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: width * 0.03,
    },
    errorText: {
        color: 'red',
        fontSize: width * 0.04, // Responsive font size
        textAlign: 'center',
        marginVertical: height * 0.02, // Responsive margin
    },
    buttonContainer: {
        position: 'absolute',
        bottom: height * 0.05, // Responsive bottom padding
        left: 0,
        right: 0,
        paddingHorizontal: width * 0.05, // Responsive horizontal padding
    }
});

export default Password;
