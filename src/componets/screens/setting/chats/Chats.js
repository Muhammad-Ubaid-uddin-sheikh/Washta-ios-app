import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Skeleton from "@thevsstech/react-native-skeleton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSocket } from '../../../../../Socket';
import { Fonts, FontsGeneral } from '../../style';
import DefulatImg from '../../../../assets/nomessages.png'
import { formatDate, formatTimeInTimezone } from '../../../../../DaterightFunction';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const API_URL = 'https://backend.washta.com/api/customer/support';

const Chat = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [ChatroomData, SetChatroomData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [senderId, setSenderId] = useState();
  const socket = useSocket();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const user = JSON.parse(jsonValue);
        setSenderId(user);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const fetchDataAndStore = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      if (token) {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const finalData = data.data.reverse();
          SetChatroomData(finalData);
          setFilteredData(finalData); // Set all data initially
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error fetching and storing user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataAndStore();
    getData();
  }, []);

  const handleChatRoomClick = (chatRoomId, data) => {
   
    socket.emit('join', { ticketId: chatRoomId });  // Join the chat room
    navigation.navigate('chat-screen', { data: data, chatRoomId: chatRoomId });  // Pass both data and chatRoomId
  };
  

  const filterChatrooms = (status) => {
    if (status === 'all') {
      setFilteredData(ChatroomData);
    } else {
      setFilteredData(ChatroomData.filter(item => item.requestStatus === status));
    }
    setActiveTab(status);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.tabContainer}>
  <TouchableOpacity
    style={activeTab === 'all' ? styles.activeTab : styles.tab}
    onPress={() => filterChatrooms('all')}
  >
    <Text style={activeTab === 'all' ? styles.activeTabText : styles.tabText}>
      All
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={activeTab === 'ongoing' ? styles.activeTab : styles.tab}
    onPress={() => filterChatrooms('ongoing')}
  >
    <Text style={activeTab === 'ongoing' ? styles.activeTabText : styles.tabText}>
     On Going
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={activeTab === 'pending' ? styles.activeTab : styles.tab}
    onPress={() => filterChatrooms('pending')}
  >
    <Text style={activeTab === 'pending' ? styles.activeTabText : styles.tabText}>
      Pending
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={activeTab === 'rejected' ? styles.activeTab : styles.tab}
    onPress={() => filterChatrooms('rejected')}
  >
    <Text style={activeTab === 'rejected' ? styles.activeTabText : styles.tabText}>
      Rejected
    </Text>
  </TouchableOpacity>
  
</View>


      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={() => (
            <Skeleton
              highlightColor={'#747eef57'}
              backgroundColor={'#747eef6e'}
              borderRadius={'20'}
              visible={false}
            >
              <View style={{ height: 50, borderRadius: 10, marginTop: 10 }} />
            </Skeleton>
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : filteredData?.length === 0 ? (
        <View style={styles.noMessagesContainer}>
          <Image source={require('../../../../assets/nomessages.png')} style={styles.emptyIcon} />
          <Text style={styles.noMessagesText}>No messages</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatRoomClick(item._id,item)}>
              <View style={styles.notificationContainer}>
                <Image style={{ width: 43, height: 45, borderRadius: 8, borderWidth: 0, borderColor: '#777' }} source={require('../../../../assets/PurpleIcon.png')} />
                <View style={styles.notificationTextContainer}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.title}>{item.user?.username}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.dateText}>
                      {formatDate(item?.createdAt)} || {formatTimeInTimezone(item?.createdAt)}
                    </Text>
                  </View>
                  <Text style={{color:'#777',fontFamily:FontsGeneral.MEDIUM}}>{item?.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      paddingHorizontal: 15,
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      gap: 10,
    },
    tab: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: wp('1.2%'),
      marginRight: wp('2%'),
      borderWidth: 1,
      borderColor: '#747EEF',
    },
    activeTab: {
      backgroundColor: '#747EEF',
      borderColor: '#747EEF',
      borderRadius: wp('1.2%'),
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: '#747EEF',
    },
    tabText: {
      color: 'black',
      fontSize: 14, // Adjust this to match your desired font size
    },
    activeTabText: {
      color: 'white',
      fontSize: 14, // Ensure the size stays the same as the inactive tab
    },
    notificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      width: '100%',
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#747eef57',
      borderRadius: 10,
      borderColor: '#747eef6e',
    },
    notificationTextContainer: {
      flex: 1,
      paddingLeft: 10,
    },
    notificationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    dateText: {
      fontSize: 10,
      padding: 0,
      margin: 0,
      textAlign: 'right',
    },
    noMessagesText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 18,
      color: '#212121',
      marginTop: -30,
    },
    noMessagesContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      paddingBottom: 40,
    },
    emptyIcon: {
      width: '100%',
      height: 500,
      objectFit: 'cover',
    },
  });
  

export default Chat;
