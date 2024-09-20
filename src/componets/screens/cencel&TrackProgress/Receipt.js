import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, FontsGeneral } from '../style';
import Button from '../../allDynamicsComponets/Button';
import { formatDate, formatTimeInTimezone } from '../../../../DaterightFunction';

const Receipt = ({ route }) => {
  const { item } = route.params;
console.log(item)
  // Function to calculate duration
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMinutes = Math.floor((end - start) / 60000); // Difference in minutes

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      return `${hours} hr${minutes > 0 ? ` ${minutes} min` : ''}`;
    }
  };

  const duration = calculateDuration(item.orderAcceptedAt, item.orderCompleteAt);
console.log(duration)
  return (
    <View style={{ paddingHorizontal: 15, flex: 1 }} backgroundColor={'white'}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Booking Date</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            {formatDate(item.date)} | {formatTimeInTimezone(item?.date)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Order Completed Date</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            {formatDate(item.orderCompleteAt)} | {formatTimeInTimezone(item.orderCompleteAt)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Car Plate Number</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            {item?.vehicleId?.vehiclePlateNumber}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Car Type</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            {item?.vehicleId?.vehicleType}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Service</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            Car Wash & Full Cleaning
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Duration</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            {duration}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Shop Name</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            {item.shopId?.shopName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Location</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10, width: '60%' }]}>
            {item.location?.text}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Estimated Total</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 17, paddingTop: 10 }]}>
            AED {item.cost}.00
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Payment</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            **** **** **** {item.paymentId.slice(10)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.textStyle, { paddingTop: 10 }]}>Order ID</Text>
          <Text style={[styles.textStyle, { fontFamily: FontsGeneral.MEDIUMSANS, fontSize: 15, paddingTop: 10 }]}>
            {item.customerId?._id}
          </Text>
        </View>
      </View>

      <View style={{ width: '100%', bottom: 20 }}>
        <Button text='Download E-Receipt' Link={''} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Heading: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  mainBoxCarNameSelect: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#747EEF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: FontsGeneral.MEDIUMSANS,
    fontSize: 16,
    color: 'white',
  },
  textStyle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 13,
    color: 'black',
    paddingTop: 20,
  }
});

export default Receipt;
