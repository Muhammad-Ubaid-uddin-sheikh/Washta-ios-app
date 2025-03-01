import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/Entypo'; // Correct import for star icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import for delete and edit icons
import { Fonts, FontsGeneral } from '../style';

const ReviewItem = ({ user, rating, reviewText, showDelete, showEdit, onDelete, onEdit }) => {
  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.userText}>{user}</Text>
        <View style={styles.starsAndActionsContainer}>
          {showDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <MaterialIcons name="delete" size={17} color="#747EEF" />
            </TouchableOpacity>
          )}
          {showEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <MaterialIcons name="edit" size={17} color="#747EEF" />
            </TouchableOpacity>
          )}
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <FontAwesome
                key={index}
                name="star"
                size={16}
                color={index < rating ? '#F39D00' : '#e0e0e0'}
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{reviewText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItemContainer: {
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userText: {
    fontSize: 17,
    fontFamily: FontsGeneral.MEDIUMSANS,
    color: 'black',
    textAlign: 'left',
  },
  starsAndActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10, // Space between stars and action buttons
  },
  reviewText: {
    fontSize: 13,
    color: '#888d90',
    fontFamily: Fonts.REGULAR,
  },
  actionButton: {
    padding: 5,
    marginRight: 10, // Space between action buttons
  },
});

export default ReviewItem;
