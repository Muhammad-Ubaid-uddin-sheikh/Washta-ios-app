import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import PlusIcon from "react-native-vector-icons/AntDesign";
import Send from 'react-native-vector-icons/FontAwesome';
import { Fonts, FontsGeneral } from '../../style';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi there!', type: 'text', fromMe: false, time: '09:00 AM' },
    { text: 'How are you?', type: 'text', fromMe: false, time: '09:02 AM' },
    { text: 'Are you free today?', type: 'text', fromMe: false, time: '09:05 AM' },
    { text: 'Let\'s meet at 5.asdasdasdas asdhags asdta sfdj', type: 'text', fromMe: false, time: '09:10 AM' },
  ]);

  const [input, setInput] = useState('');
  const flatListRef = useRef(null); // Create a ref for FlatList

  const handleSend = () => {
    if (input) {
      const newMessage = {
        text: input,
        type: 'text',
        fromMe: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInput('');
      flatListRef.current.scrollToEnd({ animated: true }); // Scroll to the bottom after sending a message
    }
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const newMessage = {
          source: { uri: response.assets[0].uri },
          type: 'image',
          fromMe: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMessage]);
        flatListRef.current.scrollToEnd({ animated: true }); // Scroll to the bottom after sending an image
      }
    });
  };

  const renderMessage = ({ item }) => {
    const isTextMessage = item.type === 'text';
    const isFromMe = item.fromMe;

    return (
      <View
        style={[
          styles.messageContainer,
          isFromMe ? styles.rightMessage : styles.leftMessage,
        ]}
      >
        {isTextMessage ? (
          <Text
            style={[
              styles.messageText,
              isFromMe ? styles.rightMessageText : styles.leftMessageText,
            ]}
          >
            {item.text}
          </Text>
        ) : (
          <Image source={item.source} style={styles.imageMessage} />
        )}
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Attach the ref to FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
        style={styles.chatList}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} // Automatically scroll when content changes
      />
      <View style={styles.inputContainer}>
        <View style={{ width: '10%' }}>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.plusButton}
          >
            <PlusIcon name='plus' style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ position: 'relative', width: '82%' }}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message"
            placeholderTextColor="black"
          />
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendButton}
          >
            <Send name="send" style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingTop: 25,
    paddingBottom: 30,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    borderColor: '#747EEF',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    paddingRight: 40,
    color: 'black',
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
  plusButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#747EEF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: 50,
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#747EEF',
    fontSize: 18,
  },
  sendButton: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  sendIcon: {
    color: '#747EEF',
    fontSize: 18,
  },
  chatList: {
    borderWidth: 0.5,
    marginHorizontal: 16,
    marginTop: 4,
    borderColor: '#777',
    borderRadius: 15,
    paddingHorizontal: 6,
  },
  messageContainer: {
    maxWidth: '70%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#747EEF',
    elevation: 2,
  },
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f7f7f7',
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#747EEF',
  },
  messageText: {
    fontSize: 14,
  },
  leftMessageText: {
    color: '#000',
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
  rightMessageText: {
    color: '#fff',
    fontFamily: FontsGeneral.MEDIUMSANS,
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  timestamp: {
    fontSize: 10,
    color: '#333',
    marginTop: 5,
    alignSelf: 'flex-end',
    fontFamily: Fonts.REGULAR,
  },
});

export default ChatScreen;
