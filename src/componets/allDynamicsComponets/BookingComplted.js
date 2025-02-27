// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, ScrollView, TouchableOpacity,} from 'react-native'
// import Arrow from 'react-native-vector-icons/MaterialIcons'
// import { FontsGeneral } from '../screens/style';
// const Profile = ({data,showButton,ReviewBtn,TrackBtn,colorBtntext,transparentBtn}) => {

//     const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       const day = date.getDate();
//       const month = date.toLocaleString('en-US', { month: 'short' });
//       return `${day} ${month}`;
//     };
//   return (
//       <View style={styles.MainContainer}>
//         <View style={styles.secondDivTitle}>
//            <View style={styles.mainBoxCarNameSelect} >
            
//                <View>
//                <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,fontSize:15,color:'black'}}>{data.Name||'John Doe Car Hub'}</Text>
//                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center",width:'100%'}}>
              
//                 <View style={{paddingTop:10}}>
//                 <Text style={{fontFamily:FontsGeneral.REGULARSANS,fontSize:12,color:'black'}}>Order ID:</Text>
//                 <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,fontSize:14,color:'black',paddingTop:3}}>WS-{data?.customerId}</Text>
//                 </View>
               
//                 <View style={{paddingTop:10}}>
//                 <Text style={{fontFamily:FontsGeneral.REGULARSANS,fontSize:12,color:'black'}}>Order Date:</Text>
//                 <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,fontSize:14,color:'black',paddingTop:3}}>{formatDate(data.date)}</Text>
//                 </View>

//                 <View style={{paddingTop:10}}>
//                 <Text style={{fontFamily:FontsGeneral.REGULARSANS,fontSize:12,color:'black'}}>Cost:</Text>
//                 <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,fontSize:14,color:'black',paddingTop:3}}>AED {data.cost}</Text>
//                 </View>

//            </View>
               
//          </View>
             
//               </View>
//               {showButton && (
//               <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15}}>
//                 <TouchableOpacity onPress={ReviewBtn}  style={{flexDirection:'row',width:'48%',justifyContent:'space-between',alignItems:"center",backgroundColor:'transparent',paddingHorizontal:6,paddingVertical:2,borderRadius:8,borderWidth:1}}>
//                   <Text style={{textAlign:'center',fontFamily:FontsGeneral.MEDIUMSANS,fontSize:14,color:'black',width:'100%',paddingVertical:7}}>{transparentBtn}</Text>
      
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={TrackBtn} style={{flexDirection:'row',width:'48%',alignItems:"center",backgroundColor:'#747EEF',paddingHorizontal:6,paddingVertical:2,borderRadius:8}}>
//                   <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
//                   <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,fontSize:14,color:'white',textAlign:'center'}}>{colorBtntext}</Text>
//                   <Arrow name='keyboard-arrow-right' size={24} color={'white'} />
//                   </View>
                 
//                 </TouchableOpacity>
//                </View>
//               )}
//             </View>
//           </View>

//   )
// }
// const styles = StyleSheet.create({
//   mainBoxCarNameSelect:{
//     flexDirection:'row',
//     justifyContent:'space-between',
//     alignItems:'center',
  
//     width:'100%',
 
//   },
//   row: {
//     flexDirection: 'row', // Arrange points and text horizontally
//     alignItems: 'top', // Center content vertically
//     gap: 20,

//   },
//   ShoeCon: {
//     textAlign: 'center',
//     justifyContent: 'center',
//     // width:85
//   },
//   secondDivTitle:{
// backgroundColor:'#F2F2F2',
//     width:'100%',
//     borderRadius:10,
//     padding:15,
//   },
//   ShoeContainer: {
//     marginTop: 5,
//   },
//   MainContainer: {
//     backgroundColor: 'white',
//     flex: 1,
//     marginTop:10
//   },
// })


// export default Profile
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import { FontsGeneral } from '../screens/style';

const Profile = ({ orders, showButton, ReviewBtn, TrackBtn, colorBtntext, transparentBtn }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        return `${day} ${month}`;
    };

    return (
        <View style={styles.MainContainer}>
            {orders?.map((order, index) => (
                <View key={index} style={styles.secondDivTitle}>
                    <View style={styles.mainBoxCarNameSelect}>
                        <View>
                            <Text style={styles.carName}>
                                {order?.shopId?.shopName|| 'John Doe Car Hub'}
                            </Text>
                            <View style={styles.orderDetails}>
                                <View style={styles.orderDetail}>
                                    <Text style={styles.detailLabel}>Order ID:</Text>
                                    <Text style={styles.detailValue}>
                                        WS-{order.customerId._id.slice(20)}
                                    </Text>
                                </View>
                                <View style={styles.orderDetail}>
                                    <Text style={styles.detailLabel}>Order Date:</Text>
                                    <Text style={styles.detailValue}>
                                        {formatDate(order.date)}
                                    </Text>
                                </View>
                                <View style={styles.orderDetail}>
                                    <Text style={styles.detailLabel}>Price:</Text>
                                    <Text style={styles.detailValue}>
                                        AED {order.cost}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {showButton && (
                        <View style={styles.buttonContainer}>
                            {/* <TouchableOpacity onPress={ReviewBtn} style={styles.transparentButton}>
                                <Text style={styles.transparentButtonText}>{transparentBtn}</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={TrackBtn} style={styles.trackButton}>
                                <View style={styles.trackButtonContent}>
                                    <Text style={styles.trackButtonText}>{colorBtntext}</Text>
                                    <Arrow name='keyboard-arrow-right' size={24} color={'white'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        flex: 1,
        // marginTop: 10,
    },
    mainBoxCarNameSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    carName: {
        fontFamily: FontsGeneral.MEDIUMSANS,
        fontSize: 15,
        color: 'black',
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    orderDetail: {
        paddingTop: 10,
    },
    detailLabel: {
        fontFamily: FontsGeneral.REGULARSANS,
        fontSize: 14,
        color: 'black',
    },
    detailValue: {
        fontFamily: FontsGeneral.MEDIUMSANS,
        fontSize: 14,
        color: 'black',
        paddingTop: 3,
    },
    secondDivTitle: {
        backgroundColor: '#F2F2F2',
        width: '100%',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10, // Equal bottom margin of 10 pixels
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
    },
    
 
    trackButton: {
        flexDirection: 'row',
        width: '100%',
        alignItems: "center",
        backgroundColor: '#747EEF',
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderRadius: 8,
    },
    trackButtonContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trackButtonText: {
        fontFamily: FontsGeneral.MEDIUMSANS,
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
});

export default Profile;
