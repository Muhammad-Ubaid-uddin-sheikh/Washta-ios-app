import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Vector from '../../../assets/Vector.png';
import TracProgressBtn from '../../allDynamicsComponets/TrackProgessBtn';
import ProgessImage from '../../../assets/OrderProgress.png';
import { Fonts, FontsGeneral } from '../style';
import { formatDate, formatTimeInTimezone } from '../../../../DaterightFunction';

const TrackProgress = ({ route }) => {
  const { item } = route.params;
  console.log('itemitem', item);

  // Calculate the discount and estimated total
  const cost = parseFloat(item.cost);
  let discountAmount = 0;
  let estimatedTotal = cost;

  if (item.promoCode && item.promoCode.Discounttype) {
    if (item.promoCode.Discounttype === 'fixed') {
      discountAmount = parseFloat(item.promoCode.discount);
      estimatedTotal = cost - discountAmount; // Subtract fixed discount from cost
    } else if (item.promoCode.Discounttype === 'percentage') {
      discountAmount = (cost * parseFloat(item.promoCode.discount)) / 100; // Calculate percentage discount
      estimatedTotal = cost - discountAmount; // Subtract percentage discount from cost
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      <View style={styles.container}>
        {/* Conditionally render based on isAccepted status */}
        {item.isAccepted ? (
          <>
            <TracProgressBtn time={formatTimeInTimezone(item?.date)} date={formatDate(item?.date)} Name="Order Accepted" Imagess={Vector} />
            <TracProgressBtn time={formatTimeInTimezone(item?.orderAcceptedAt)} date={formatDate(item?.orderAcceptedAt)} Name="Order in Progress" Imagess={ProgessImage} />
          </>
        ) : (
          <Text style={styles.pendingText}>Your request is pending...</Text>
        )}

        <View style={styles.divider} />

        <Text style={[styles.textStyle, styles.orderDetailsTitle]}>Order Details</Text>
        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.orderDetailItem]}>Shop Name</Text>
          <Text style={[styles.textStyle, styles.orderDetailPrice]}>{item?.shopId?.shopName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.orderDetailItem]}>Location</Text>
          <Text style={[styles.textStyle, styles.orderDetailPrice,{ textOverflow: 'ellipsis', whiteSpace: 'nowrap',width:'70%'}]} numberOfLines={1}>{item?.location?.text || 'No mention address'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.orderDetailItem]}>Payment Status</Text>
          <Text style={[styles.textStyle, styles.orderDetailPrice]}>{item?.billingStatus}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.orderDetailItem]}>Car Name</Text>
          <Text style={[styles.textStyle, styles.orderDetailPrice]}>{item?.vehicleId?.vehicleName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.orderDetailItem]}>Car Plate Number</Text>
          <Text style={[styles.textStyle, styles.orderDetailPrice]}>{item?.vehicleId?.vehiclePlateNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.orderDetailItem]}>Car Type</Text>
          <Text style={[styles.textStyle, styles.orderDetailPrice]}>{item?.vehicleId?.vehicleType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.estimatedTotalTitle]}>Total Cost</Text>
          <Text style={[styles.textStyle, styles.orderDetailPrice]}>AED {cost}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.orderDetailItem]}>Discount</Text>
          <Text style={[styles.textStyle, styles.orderDetailPrice]}>AED {discountAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={[styles.textStyle, styles.estimatedTotalTitle]}>Estimated Total</Text>
          <Text style={[styles.textStyle, styles.estimatedTotalAmount]}>AED {estimatedTotal.toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 15,
  },
  textStyle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 14,
    color: 'black',
    paddingTop: 20,
  },
  estimatedTime: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 20,
    paddingTop: 7,
  },
  pendingText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 18,
    color: 'red',
    paddingTop: 20,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#b3b3b3',
    marginTop: 20,
  },
  orderDetailsTitle: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 21,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetailItem: {
    paddingTop: 10,
  },
  orderDetailPrice: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 15,
    paddingTop: 10,
  },
  estimatedTotalTitle: {
    paddingTop: 10,
  },
  estimatedTotalAmount: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 17,
    paddingTop: 10,
  },
});

export default TrackProgress;
