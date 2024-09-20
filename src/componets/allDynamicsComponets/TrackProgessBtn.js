import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Fonts, FontsGeneral } from '../screens/style'
import Dot from 'react-native-vector-icons/Entypo'
const IconBtnArrow = ({Name,Imagess,date,time}) => {
  return (
    <TouchableOpacity>


    <View style={[styles.MainContinerBtn,{ justifyContent:'space-between',borderWidth:0.5,padding:5,borderRadius:10,marginTop:10}]}>
        <View style={{flexDirection:'row',alignItems:'center',paddingLeft:10}} >
<Image source={Imagess} style={styles.Imagess}  />
<Text style={styles.btnText}>{Name}</Text>
        </View>
       <View style={{flexDirection:'row',alignItems:'center',paddingRight:10}}>
<Text style={{fontFamily:Fonts.REGULAR,fontSize:13,color:'#242424'}}>
{date}
</Text>
<Dot name='dot-single' size={20} color={'black'}/>
<Text style={{fontFamily:Fonts.REGULAR,fontSize:13,color:'#242424'}}>
{time}
</Text>
       </View>
    </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    Imagess:{
        width:20,
        objectFit:'contain',
      
    },
    MainContinerBtn:{
    alignItems:'center',
     flexDirection:'row',
     width:'100%',
     borderColor:'#F2F2F3',
     backgroundColor:'#F2F2F3'
   
    },
    btnText:{
        fontFamily:FontsGeneral.MEDIUMSANS,
        fontSize:15,
        color:'black',
        paddingLeft:10
    }
})
export default IconBtnArrow