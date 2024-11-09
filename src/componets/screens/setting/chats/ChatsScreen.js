import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import PlusIcon from "react-native-vector-icons/AntDesign";
import Send from 'react-native-vector-icons/FontAwesome';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSocket } from '../../../../../Socket';
import { formatDate, formatTimeInTimezone } from '../../../../../DaterightFunction';
import { Fonts, FontsGeneral } from '../../style';

const ApiUrl = 'https://backend.washta.com/api/customer/support';

const ChatScreen = ({ route }) => {
  const { data } = route?.params;
  const socket = useSocket(); // Accessing the socket from the SocketProvider
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null); // Reference for FlatList

  // Fetch the user data on component mount
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData)); // Parse user data and set it to state
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  // Fetch chat history based on ticketId
  useEffect(() => {
    const fetchChatHistory = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');

      try {
        const ticketId = data?._id;
        const response = await axios.get(`https://backend.washta.com/api/customer/chat/?ticketId=${ticketId}&skip=0`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data) {
          // Map the response to the messages format
          const chatMessages = response?.data?.data?.reverse().map((msg) => ({
            text: msg.message,
            type: 'text',
            fromMe: msg.sender.role === 'customer', // Customer's messages are fromMe
            time: msg.createdAt,
          }));

          setMessages(chatMessages);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [data]);

  // Listen for messages from the agent
  useEffect(() => {
    if (socket) {
      // Listen for messages from the agent
      socket.on('message-receive-from-agent', (messageData) => {
        console.log('messageData', messageData); // Logging received message data
        const receivedMessage = {
          text: messageData.message,
          type: 'text',
          fromMe: false, // Agent's message is not from the user
          time: new Date(messageData.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        flatListRef.current?.scrollToEnd({ animated: true }); 
      });
    }

    return () => {
      if (socket) {
        socket.off('message-receive-from-agent'); // Clean up listener when component unmounts
      }
    };
  }, [socket]);

  // Handle sending a message
  const handleSend = async () => {
    if (!input) {
      // toast.error('Please enter a message to send');
      return;
    }

    const newMessage = {
      text: input,
      type: 'text',
      fromMe: true, // This message is from the user
      time: new Date(),
        };

    // Optimistically update UI
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput(''); // Clear input
    flatListRef.current.scrollToEnd({ animated: true }); // Scroll to the bottom

    const payload = {
      title: input,
      user: {
        id: user?.id, // Customer ID 
        username: user?.username,
        role: 'customer',
      },
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      // Check if data is passed via route params
      if (data) {
        // Use socket to send message if data exists
        const socketPayload = {
          ticketId: data._id,
          message: input,
          createdAt: new Date().toISOString(),
          receiver: {
            id: data?.connectedWith?.id, // Replace with actual receiver ID
            role: 'agent',
            username: data?.connectedWith?.username,
          },
          sender: {
            id: data?.user?.id,
            username: data?.user?.username,
            role: 'customer',
          },
        };

        socket.emit('send-message-to-agent', socketPayload); // Emit the message to the agent
      } else {
        // Send message to API
        const response = await axios.post(ApiUrl, payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          console.log('Message sent:', response.data); // Log response if needed
        } else {
          console.log('response', response.data);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
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
          fromMe: true, // Assuming this message is sent by the current user
          time: new Date().toLocaleTimeString(), // Format time
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
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
        <Text style={styles.timestamp}>{formatDate(item.time)} {formatTimeInTimezone(item.time)}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust offset for iOS
    >
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
    </KeyboardAvoidingView>
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
    height: 50,
  },
  sendButton: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  sendIcon: {
    fontSize: 22,
    color: '#747EEF',
  },
  plusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#747EEF',
    borderRadius: 10,
    height: 45,
    width: 45,
  },
  plusIcon: {
    fontSize: 25,
    color: '#747EEF',
  },
  chatList: {
    flexGrow: 1,
    borderWidth:1.5,
    marginHorizontal:20,
    borderRadius:10,
    borderColor:'#747EEF'
  },
  messageContainer: {
    marginVertical: 5,
    // maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    position: 'relative',
    width:'48%'
  },
  rightMessage: {
    paddingVertical:15,
    alignSelf: 'flex-end',
    fontFamily:Fonts.MEDIUM,
    backgroundColor: '#747EEF', // Light green for user's messages
  },
  leftMessage: {
    fontFamily:Fonts.MEDIUM,
    paddingVertical:15,
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F3', // Light gray for agent's messages
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    paddingBottom:10
  },
  rightMessageText: {
    color: 'white', // Dark text for user's messages
  },
  leftMessageText: {
    color: 'black', // Dark text for agent's messages
  },
  timestamp: {
    fontSize: 11,
    color: '#333',
    position: 'absolute',
    bottom: 4,
    left: 10,
    paddingTop:10,
    // top:30,
    fontFamily:FontsGeneral.MEDIUMSANS
  },
  imageMessage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default ChatScreen;

