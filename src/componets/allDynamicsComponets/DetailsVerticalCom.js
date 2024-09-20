import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Fonts } from '../screens/style';
import Star from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
const SliderItem = ({ imageUrl, name, km, rating, reviews,time,margin }) => {
  return (
    <View style={[styles.item,{ marginRight: margin ? 10 : 0 }]}>
      <Image source={{ uri: imageUrl }} style={styles.image} width={100} height={100} />
      <View style={{flexDirection:'row',alignItems:'center',position:'absolute',top:10,left:10,backgroundColor:'white',width:40,height:20,justifyContent:'center',borderRadius:4}}>
        <Star name="star" size={13} color={'#F39D00'}/>
      <Text style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={{flexDirection:"row",alignItems:'center'}}>
            <Text style={styles.time}> {km}km </Text>
            <Ionicons name="stopwatch-outline" size={13} color={'#747EEF'} />
            <Text style={styles.time}> {time} </Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
     
        <Text style={styles.reviews}>AED {reviews}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    image:{
        width:'100%',
        objectFit:'cover',
        height:109,
        borderRadius:8
    },
    detailsContainer:{
        paddingTop:4,
    },
    name: {
    fontFamily:Fonts.BOLD,
    fontSize:14,
    color:"black"
    },
    time:{
        fontFamily:Fonts.REGULAR,
    fontSize:11,
    color:"black",
    },
    item:{
        width:200,
        borderRadius:8,


    },
    reviews:{
        fontFamily:Fonts.BOLD,
    fontSize:12,
    color:"black"
    },
    rating:{
        color:'black',
        fontFamily:Fonts.MEDIUM,
        fontSize:11,
        paddingLeft:3
    }
  
  });

export default SliderItem