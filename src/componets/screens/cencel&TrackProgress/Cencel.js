// import React, { useState } from 'react'
// import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { FontsGeneral } from '../style'

// const Cencel = () => {
//   const [selectedItem, setSelectedItem] = useState(''); // Default to the first item

//   const handleSelectItem = (item) => {
//     setSelectedItem(item === selectedItem ? null : item);
//   };
//   const List =[
//     {name: "Change in Plans"},
//      {name: "Vehicle issues"},
//      {name: "Unexpected work"},
//      {name:'Didn’t find location'},
//      {name:'Problem with the Service Provider'},
//      {name:'Other'}
//     ]
//   return (
//     <View  style={{paddingHorizontal:15}}  backgroundColor={'white'} >
//         <Text style={styles.Heading}>Please select the reason for cancellation:</Text>
//         <FlatList
//           data={List} 
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleSelectItem(item)}>
//               <View style={[styles.mainBoxCarNameSelect, selectedItem === item && styles.selectedItem]}>
//                 <TouchableOpacity
//                   onPress={() => handleSelectItem(item)}
//                   style={{
//                     width: 20,
//                     height: 20,
//                     borderRadius: 10,
//                     borderWidth: 2,
//                     borderColor: selectedItem === item ? '#747EEF' : '#747EEF', // Change border color when selected
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   {selectedItem === item && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#747EEF' }} />}
//                 </TouchableOpacity>
//                 <View style={{paddingLeft:10}}>
//                   <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, color: 'black' }}>
//                     {item.brand} {item.name}
//                   </Text>
//               </View>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   Heading:{
//     fontFamily:FontsGeneral.MEDIUMSANS,
//     fontSize:20,
//     color:'black',
//     marginBottom:10
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   mainBoxCarNameSelect:{
//     flexDirection:'row',
//     justifyContent:'flex-start',
//     alignItems:'center',
//     width:'100%',
//     padding:5,
//     marginTop:10,

//   },
//   selectedItem: {
//     borderColor: '#747EEF',
//     borderWidth:1.5, // Border color changes when selected
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 16,
//     marginTop: 20,
//     marginBottom:10,
//     fontFamily: FontsGeneral.REGULARSANS,
//     color: 'black',
//   },
// })
// export default Cencel
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontsGeneral } from '../style';
import InputFeild from '../../allDynamicsComponets/inputFeilds'
import Button from '../../allDynamicsComponets/Button'
const Cencel = () => {
  const [selectedItem, setSelectedItem] = useState('Change in Plans'); // Default to the first item
  const [reasonInput, setReasonInput] = useState('');

  const handleSelectItem = (item) => {
    setSelectedItem(item === selectedItem ? '' : item);
  };

  const handleInputChange = (text) => {
    setReasonInput(text);
  };

  const handleConfirm = () => {
    console.log('Selected Reason:', selectedItem);
    console.log('Input:', reasonInput);
  };

  const List = [
    { name: "Change in Plans" },
    { name: "Vehicle issues" },
    { name: "Unexpected work" },
    { name: 'Didn’t find location' },
    { name: 'Problem with the Service Provider' },
    { name: 'Other' }
  ];

  return (
    <View style={{ paddingHorizontal: 15,flex:1}} backgroundColor={'white'}>
      <Text style={styles.Heading}>Please select the reason for cancellation:</Text>
      <View style={{flex:1}}>
        {List.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelectItem(item.name)}>
            <View style={[styles.mainBoxCarNameSelect, selectedItem === item.name && styles.selectedItem]}>
              <TouchableOpacity
                onPress={() => handleSelectItem(item.name)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: selectedItem === item.name ? '#747EEF' : '#747EEF', // Change border color when selected
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {selectedItem === item.name && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#747EEF' }} />}
              </TouchableOpacity>
              <Text style={{ fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, color: 'black', paddingLeft:10}}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
         <InputFeild onChangeText={handleInputChange} labelName='Enter Your Reason (if Other)' value={selectedItem === 'Other' ? reasonInput : ''}/>
      </View>

     <View style={{width:'100%',bottom:20}}>
      <Button text='Cancel Booking' Link={handleConfirm}/>
     </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  Heading: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  mainBoxCarNameSelect: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#747EEF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 16,
    color: 'white',
  },
});

export default Cencel;
