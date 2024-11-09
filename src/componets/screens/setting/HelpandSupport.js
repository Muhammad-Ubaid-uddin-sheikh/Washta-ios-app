// import React, { useState } from 'react'
// import { InputAccessoryView, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { Fonts, FontsGeneral } from '../style'
// import SearchIcon from 'react-native-vector-icons/EvilIcons'
// import Button from '../../allDynamicsComponets/Button'
// const HelpandSupport = ({navigation}) => {
//     const [activeItem, setActiveItem] = useState(null);
//     const [activeTopic, setActiveTopic] = useState(null);
  
//   const data = [
//     { id: 1, title: 'How do I cancel an existing job request?', details: 'To cancel an existing job request, go to your dashboard, select the job you want to cancel, and click the "Cancel Request" button. Please note that cancellations can only be made before the job is accepted by a provider. ' },
//     {
//       id: 2,
//       title: 'Can I cancel my request after cancellation time has ended?',
//       details: 'If the cancellation window has passed, you may not be able to cancel the job request directly from the app. However, you can contact customer support to review your request and assist with the cancellation process if applicable.'
//     },
//     {
//       id: 3,
//       title: 'What happens if I cancel a job request?',
//       details: 'When you cancel a job request, it will be removed from the provider’s queue, and no further action will be taken. Depending on the timing of the cancellation, you may be charged a cancellation fee.'
//     },
//     {
//       id: 4,
//       title: 'Is there a fee for canceling a job?',
//       details: 'In some cases, a cancellation fee may apply if the job has already been scheduled or if it is too close to the service date. The fee details can be found in the terms and conditions during the booking process.'
//     }

//   ];
//   const Topic = [
//     {
//       id: 5,
//       title: 'Why was my payment declined?',
//       details: 'Your payment may have been declined due to insufficient funds, an expired card, or an issue with your bank. Please check with your bank or try a different payment method to resolve the issue.'
//     },
//     {
//       id: 6,
//       title: 'How do I update my payment method?',
//       details: 'To update your payment method, go to your account settings, select "Payment Methods", and add or edit your preferred payment option. Make sure the new method is verified before booking any new jobs.'
//     },
//     {
//       id: 7,
//       title: 'Will I be charged if the job is not completed?',
//       details: 'No, you will not be charged if the job is not completed. Payments are only processed once the job has been successfully completed and approved by you. If you face any issues, please contact customer support.'
//     }

//   ];
//   const toggleDetails = (id) => {
//     setActiveItem(activeItem === id ? null : id);
//   };
//   const toggleTopic = (id) => {
//     setActiveTopic(activeTopic === id ? null : id);
//   };
//   return (
//     <KeyboardAvoidingView
//     style={styles.container}
//     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust offset for iOS
// >
//     <View style={{flex:1,paddingHorizontal:20}}>
//         <ScrollView showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}>
//        <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:18}}>
//        Have a question?
//     </Text>
//     <View style={{position:'relative',marginTop:10}}>
// <SearchIcon name='search' style={{fontSize:30,color:'black',position:'absolute',top:12,left:8}}/>
// <TextInput  placeholderTextColor="rgba(33, 33, 33, 0.60)" style={styles.inputFeild}  placeholder="Search for topics or questions..."  />
//     </View>
//     <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:18,marginTop:20,marginBottom:15}}>
//     Frequently Asked
//     </Text>
//     {data.map((item) => (
//         <View key={item.id} style={{ marginBottom: 10 , }}>
//           <TouchableOpacity style={{borderWidth:1,borderColor:'#A0A0A0',paddingVertical:15,borderRadius:10,paddingHorizontal:13}} onPress={() => toggleDetails(item.id)}>
//             <Text style={{ fontSize: 15 ,fontFamily:FontsGeneral.MEDIUMSANS,color:'black'}}>{item.title}</Text>
//           </TouchableOpacity>
//           {activeItem === item.id && (
//             <Text style={{ marginTop: 5 ,paddingHorizontal:13,fontFamily:Fonts.REGULAR,color:'black'}}>{item.details}</Text>
//           )}
//         </View>
//       ))}
//       <View style={{paddingBottom:70}}>
//        <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:18,marginTop:20,marginBottom:15}}>
//        Topics
//     </Text>
//     {Topic.map((item) => (
//         <View key={item.id} style={{ marginBottom: 10 , }}>
//           <TouchableOpacity style={{borderWidth:1,borderColor:'#A0A0A0',paddingVertical:15,borderRadius:10,paddingHorizontal:13}} onPress={() => toggleTopic(item.id)}>
//             <Text style={{ fontSize: 15 ,fontFamily:FontsGeneral.MEDIUMSANS,color:'black'}}>{item.title}</Text>
//           </TouchableOpacity>
//           {activeTopic === item.id && (
//             <Text style={{ marginTop: 5 ,paddingHorizontal:13,fontFamily:Fonts.REGULAR,color:'black'}}>{item.details}</Text>
//           )}
//         </View>
//       ))}
//       </View>
//     </ScrollView>
//     <View style={styles.buttonContainer}>
//         <Button text="Start a conversation" Link={() => navigation.navigate('chat-screen',{data:''})} />
//       </View>
//     </View>
//     </KeyboardAvoidingView>
//   )
// }
// const styles = StyleSheet.create({
//     inputFeild:{
//         borderWidth:1,
//         borderRadius:50,
//         borderColor:'#A0A0A0',
//         paddingHorizontal:20,
//         paddingLeft:40,
//         paddingVertical:14,
//         fontFamily:FontsGeneral.REGULARSANS
//     },
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 20,
//         left: 0,
//         right: 0,
//         paddingHorizontal: 15,
//       },
//       container:{
//         flex:1
//       }
// })
// export default HelpandSupport
import React, { useState } from 'react';
import { InputAccessoryView, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Fonts, FontsGeneral } from '../style';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import Button from '../../allDynamicsComponets/Button';
import ClearIcon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this icon package

const HelpandSupport = ({ navigation }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [activeTopic, setActiveTopic] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    const data = [
        { id: 1, title: 'How do I cancel an existing job request?', details: 'To cancel an existing job request, go to your dashboard, select the job you want to cancel, and click the "Cancel Request" button. Please note that cancellations can only be made before the job is accepted by a provider.' },
        { id: 2, title: 'Can I cancel my request after cancellation time has ended?', details: 'If the cancellation window has passed, you may not be able to cancel the job request directly from the app. However, you can contact customer support to review your request and assist with the cancellation process if applicable.' },
        { id: 3, title: 'What happens if I cancel a job request?', details: 'When you cancel a job request, it will be removed from the provider’s queue, and no further action will be taken. Depending on the timing of the cancellation, you may be charged a cancellation fee.' },
        { id: 4, title: 'Is there a fee for canceling a job?', details: 'In some cases, a cancellation fee may apply if the job has already been scheduled or if it is too close to the service date. The fee details can be found in the terms and conditions during the booking process.' }
    ];

    const Topic = [
        { id: 5, title: 'Why was my payment declined?', details: 'Your payment may have been declined due to insufficient funds, an expired card, or an issue with your bank. Please check with your bank or try a different payment method to resolve the issue.' },
        { id: 6, title: 'How do I update my payment method?', details: 'To update your payment method, go to your account settings, select "Payment Methods", and add or edit your preferred payment option. Make sure the new method is verified before booking any new jobs.' },
        { id: 7, title: 'Will I be charged if the job is not completed?', details: 'No, you will not be charged if the job is not completed. Payments are only processed once the job has been successfully completed and approved by you. If you face any issues, please contact customer support.' }
    ];

    const toggleDetails = (id) => {
        setActiveItem(activeItem === id ? null : id);
    };

    const toggleTopic = (id) => {
        setActiveTopic(activeTopic === id ? null : id);
    };

    const handleSearchChange = (text) => {
        setSearchTerm(text); // Update search term
    };

    const clearSearch = () => {
        setSearchTerm(''); // Clear the search term
    };

    // Filter the FAQs based on the search term
    const filteredData = data.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust offset for iOS
        >
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, color: 'black', fontSize: 18 }}>
                        Have a question?
                    </Text>
                    <View style={{ position: 'relative', marginTop: 10 }}>
                        <SearchIcon name='search' style={{ fontSize: 30, color: 'black', position: 'absolute', top: 12, left: 8 }} />
                        <TextInput
                            placeholderTextColor="rgba(33, 33, 33, 0.60)"
                            style={styles.inputFeild}
                            placeholder="Search for topics or questions..."
                            value={searchTerm} // Bind the search term
                            onChangeText={handleSearchChange} // Handle search term change
                        />
                        {/* Show clear button when there's text in the input */}
                        {searchTerm.length > 0 && (
                            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                                <ClearIcon  name='clear' style={styles.clearIcon} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, color: 'black', fontSize: 18, marginTop: 20, marginBottom: 15 }}>
                        Frequently Asked
                    </Text>

                    {/* Render filtered data */}
                    {filteredData.map((item) => (
                        <View key={item.id} style={{ marginBottom: 10 }}>
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#A0A0A0', paddingVertical: 15, borderRadius: 10, paddingHorizontal: 13 }} onPress={() => toggleDetails(item.id)}>
                                <Text style={{ fontSize: 15, fontFamily: FontsGeneral.MEDIUMSANS, color: 'black' }}>{item.title}</Text>
                            </TouchableOpacity>
                            {activeItem === item.id && (
                                <Text style={{ marginTop: 5, paddingHorizontal: 13, fontFamily: Fonts.REGULAR, color: 'black' }}>{item.details}</Text>
                            )}
                        </View>
                    ))}

                    <View style={{ paddingBottom: 70 }}>
                        <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, color: 'black', fontSize: 18, marginTop: 20, marginBottom: 15 }}>
                            Topics
                        </Text>
                        {Topic.map((item) => (
                            <View key={item.id} style={{ marginBottom: 10 }}>
                                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#A0A0A0', paddingVertical: 15, borderRadius: 10, paddingHorizontal: 13 }} onPress={() => toggleTopic(item.id)}>
                                    <Text style={{ fontSize: 15, fontFamily: FontsGeneral.MEDIUMSANS, color: 'black' }}>{item.title}</Text>
                                </TouchableOpacity>
                                {activeTopic === item.id && (
                                    <Text style={{ marginTop: 5, paddingHorizontal: 13, fontFamily: Fonts.REGULAR, color: 'black' }}>{item.details}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button text="Start a conversation" Link={() => navigation.navigate('chat-screen', { data: '' })} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputFeild: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#A0A0A0',
        paddingHorizontal: 20,
        paddingLeft: 40,
        paddingVertical: 14,
        fontFamily: FontsGeneral.REGULARSANS,
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        top: 12,
        backgroundColor:'#747EEF',
        padding:5,
        borderRadius:50,
      
       
    },
    clearIcon: {
        fontSize: 14,
        color: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
    },
    container: {
        flex: 1,
    },
});

export default HelpandSupport;
