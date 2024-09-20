import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const Explore = () => {
  // Sample data for explore items
  const exploreData = [
    { id: '1', title: 'Beautiful Beach', image: require('../../../assets/complted.png') },
    { id: '2', title: 'Mountain Adventure', image: require('../../../assets/complted.png') },
    { id: '3', title: 'City Lights', image: require('../../../assets/complted.png') },
    { id: '4', title: 'Forest Trails', image: require('../../../assets/complted.png') },
  ];

  const renderExploreItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore</Text>
      <FlatList
        data={exploreData}
        renderItem={renderExploreItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2, // For Android shadow effect
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    padding: 10,
    textAlign: 'center',
  },
});

export default Explore;
