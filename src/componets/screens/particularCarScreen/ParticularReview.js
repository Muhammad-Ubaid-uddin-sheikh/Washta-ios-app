
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RatingSummary from './Rating';
import ReviewItem from './ReviewItem';
import Button from '../../allDynamicsComponets/Button';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { Fonts, FontsGeneral } from '../style';
import StarRating from 'react-native-star-rating-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { useToast } from 'react-native-toast-notifications';
import IMG from '../../../assets/noReviews.png';

const ApiUrl = 'https://backend.washta.com/api/customer/shopReview';
const ApiUrlUpdate = 'https://backend.washta.com/api/customer/sellerReview?reviewId='
const ParticularReview = ({ route }) => {
  const toast = useToast();
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState({});
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const { item } = route.params;
  const bottomSheet = useRef();
  const [editReview, setEditReview] = useState(null); // State for the review being edited
  const [editFeedback, setEditFeedback] = useState(''); // State for feedback while editing
  const [editRating, setEditRating] = useState(0); // State for rating while editing

  
  const fetchData = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.get(`${ApiUrl}?shopId=${item}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSummary(response.data.data.reviewsSummary);
      setAllReviews(response.data.data.reviews);
    } catch (err) {
      console.log("Error fetching reviews:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log('Failed to load user data:', error);
      }
    };

    getUserData();
    fetchData();
  }, []);

  // Handle adding new reviews
  const AddReviews = async () => {
    if (rating === 0) {
      toast.show('Please provide a rating and feedback', { 
        type: "danger", 
        position: 'top',  // Set the toast position to top
        animationType: "zoom-in" 
      });
      bottomSheet.current.close();
      return; // Exit early if validation fails
     
    }
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const payload = {
        rating,
        orderId: user.id,
        shopId: item,
        comment: {
          text: '',
        },
      };
      const response = await axios.post(ApiUrl, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.status) {
        toast.show('Your review has been submitted', { type: "success", animationType: "zoom-in" ,duration: 2000 });
        setRating(0);
        // setFeedback('');
        fetchData();
      }
    } catch (error) {
      console.log("erroasdreview",error);
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.show(errorMessage, { type: "danger", animationType: "zoom-in",duration: 2000 });
    } finally {
      setLoading(false);
      bottomSheet.current.close();
    }
  };

  // Handle editing reviews
  const handleEditReview = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const payload = {
        rating: editRating,
        comment: { text: editFeedback },
      };
      const response = await axios.patch(`${ApiUrlUpdate}${editReview._id}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('padylaasd',payload)
      if (response.data.status) {
        
        toast.show('Review updated successfully', { type: "success", animationType: "zoom-in" ,duration: 2000 });
        fetchData(); // Refresh the reviews
        setEditReview(null); // Clear the edit state
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.show(errorMessage, { type: "danger", animationType: "zoom-in",duration: 2000 });
    } finally {
      setLoading(false);
      bottomSheet.current.close();
    }
  };

  // Handle deleting reviews
  const handleDeleteReview = async (reviewId) => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`${ApiUrl}?reviewId=${reviewId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.status) {
        toast.show('Review deleted successfully', { type: "success", animationType: "zoom-in" ,duration: 2000 });
        fetchData(); // Refresh reviews after deletion
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data || "An error occurred. Please try again.";
      toast.show(errorMessage, { type: "danger", animationType: "zoom-in",duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#747EEF" />
        </View>
      ) : (
        <>
          <View style={{ paddingHorizontal: 20 }}>
            {summary && Object.keys(summary).length > 0 && (
              <RatingSummary
                ratings={summary.ratings}
                averageRating={summary.averageRating}
                totalReviews={summary.totalReviews}
                recommendationPercentage={summary.recommendationPercentage}
              />
            )}
          </View>
          <View style={{ flex: 1, paddingTop: 0, borderTopWidth: 0.4, borderColor: '#a6a6a6', paddingBottom: 80 }}>
            {allReviews.length === 0 ? (
              <View style={styles.noReviewsContainer}>
                <Image source={IMG} style={styles.noReviewsImage} />
                <Text style={styles.noReviewsText}>No Reviews Available</Text>
              </View>
            ) : (
              <FlatList
                data={allReviews}
                keyExtractor={(item) => item._id.toString()}
                style={{ paddingHorizontal: 20 }}
                renderItem={({ item }) => (
                  <ReviewItem
                    user={item.customerId?.username}
                    rating={item.rating}
                    // reviewText={item.comment?.text || 'No review text available'}
                    showDelete={user.id === item.customerId._id}
                    showEdit={user.id === item.customerId._id}
                    onDelete={() => handleDeleteReview(item._id)}
                    onEdit={() => {
                      setEditReview(item);
                      setEditFeedback(item.comment?.text || '');
                      setEditRating(item.rating);
                      bottomSheet.current.show();
                    }}
                  />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
          </View>

          {/* Bottom Sheet for Edit Review */}
          <BottomSheet style={styles.bottomSheet} hasDraggableIcon ref={bottomSheet} height={270}>
            <View style={styles.sheetContainer}>
              <Text style={styles.sheetTitle}>{editReview ? 'Edit Review' : 'Give Feedback'}</Text>
              <Text style={styles.sheetSubtitle}>How was your Experience?</Text>
              <StarRating color="#F39D00" rating={editReview ? editRating : rating} onChange={editReview ? setEditRating : setRating} />
              {/* <TextInput
                style={styles.feedbackInput}
                placeholder="Enter Your Review"
                value={editReview ? editFeedback : feedback}
                onChangeText={editReview ? setEditFeedback : setFeedback}
                placeholderTextColor={'black'}
                multiline
              /> */}
              <View style={{ width: '100%', marginTop: 10 }}>
                <TouchableOpacity style={[styles.cancelButton,{ margin: 0, padding: 0,backgroundColor:'#747EEF',borderWidth:0}]} onPress={editReview ? handleEditReview : AddReviews}>
                  <Text style={[styles.cancelButtonText,{color:'white'}]}>Submit</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => {
                bottomSheet.current.close()
                setEditReview(null)
                }} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
                 
          <View style={styles.buttonContainer}>
            <Button text="Give a review" Link={() => bottomSheet.current.show()} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    noReviewsImage: {
    width: '100%',
    objectFit: 'contain',
    height: 300,
    textAlign: 'center',
    justifyContent: 'center'
  },
  noReviewsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  noReviewsText: {
    textAlign: 'center',
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 14,
    color: 'black',
    marginTop: 10
  },
  sheetContainer: {
    paddingHorizontal: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  sheetTitle: {
    textAlign: 'center',
    fontFamily: FontsGeneral.MEDIUMSANS,
    color: 'black',
    fontSize: 22,
    paddingTop: 12,
  },
  sheetSubtitle: {
    fontFamily: Fonts.MEDIUM,
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  feedbackInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    fontFamily: Fonts.BOLD,
    color: "black",
    marginTop:20,
    paddingBottom:10
  },
  cancelButton: {
    width: '100%',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 50,
    marginTop: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 16,
    color: 'black',
    paddingVertical: 13,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default ParticularReview;
