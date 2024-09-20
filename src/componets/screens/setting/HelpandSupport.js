import React, { useState } from 'react'
import { InputAccessoryView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Fonts, FontsGeneral } from '../style'
import SearchIcon from 'react-native-vector-icons/EvilIcons'
import Button from '../../allDynamicsComponets/Button'
const HelpandSupport = ({navigation}) => {
    const [activeItem, setActiveItem] = useState(null);
    const [activeTopic, setActiveTopic] = useState(null);
  
  const data = [
    { id: 1, title: 'How do I cancel an existing job request?', details: 'Types data we collect Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' },
    { id: 2, title: 'Can I cancel my request after cancelation time has ended?', details: 'Types data we collect Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 3, title: 'How do I cancel an existing job request?', details: 'Types data we collect Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 4, title: 'Can I cancel my request after cancelation time has ended?', details: 'Types data we collect Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },

  ];
  const Topic = [
    { id: 1, title: 'Job Cancellation', details: 'Types data we collect Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' },
    { id: 2, title: 'Payment Issues', details: 'Types data we collect Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 3, title: 'Job Cancellation', details: 'Types data we collect Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },

  ];
  const toggleDetails = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };
  const toggleTopic = (id) => {
    setActiveTopic(activeTopic === id ? null : id);
  };
  return (
    <View style={{flex:1,paddingHorizontal:20}}>
        <ScrollView>
       <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:18}}>
       Have a question?
    </Text>
    <View style={{position:'relative',marginTop:10}}>
<SearchIcon name='search' style={{fontSize:30,color:'black',position:'absolute',top:8,left:8}}/>
<TextInput  placeholderTextColor="rgba(33, 33, 33, 0.60)" style={styles.inputFeild}  placeholder="Search for topics or questions..."  />
    </View>
    <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:18,marginTop:20,marginBottom:15}}>
    Frequently Asked
    </Text>
    {data.map((item) => (
        <View key={item.id} style={{ marginBottom: 10 , }}>
          <TouchableOpacity style={{borderWidth:1,borderColor:'#A0A0A0',paddingVertical:15,borderRadius:10,paddingHorizontal:13}} onPress={() => toggleDetails(item.id)}>
            <Text style={{ fontSize: 15 ,fontFamily:FontsGeneral.MEDIUMSANS,color:'black'}}>{item.title}</Text>
          </TouchableOpacity>
          {activeItem === item.id && (
            <Text style={{ marginTop: 5 ,paddingHorizontal:13,fontFamily:Fonts.REGULAR,color:'black'}}>{item.details}</Text>
          )}
        </View>
      ))}
      <View style={{paddingBottom:70}}>
       <Text style={{fontFamily:FontsGeneral.MEDIUMSANS,color:'black',fontSize:18,marginTop:20,marginBottom:15}}>
       Topics
    </Text>
    {Topic.map((item) => (
        <View key={item.id} style={{ marginBottom: 10 , }}>
          <TouchableOpacity style={{borderWidth:1,borderColor:'#A0A0A0',paddingVertical:15,borderRadius:10,paddingHorizontal:13}} onPress={() => toggleTopic(item.id)}>
            <Text style={{ fontSize: 15 ,fontFamily:FontsGeneral.MEDIUMSANS,color:'black'}}>{item.title}</Text>
          </TouchableOpacity>
          {activeTopic === item.id && (
            <Text style={{ marginTop: 5 ,paddingHorizontal:13,fontFamily:Fonts.REGULAR,color:'black'}}>{item.details}</Text>
          )}
        </View>
      ))}
      </View>
    </ScrollView>
    <View style={styles.buttonContainer}>
        <Button text="Start a conversation" Link={() => navigation.navigate('chat-screen')} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    inputFeild:{
        borderWidth:1,
        borderRadius:50,
        borderColor:'#A0A0A0',
        paddingHorizontal:20,
        paddingLeft:40,
        paddingVertical:8,
        fontFamily:FontsGeneral.REGULARSANS
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
      }
})
export default HelpandSupport