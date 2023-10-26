import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/FontAwesome'; // You can choose an appropriate icon


const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const location = 'Purok 4, Liciada, Bustos, Bulacan';

  const [isPickupDatePickerVisible, setPickupDatePickerVisible] = useState(false);
  const [isDropoffDatePickerVisible, setDropoffDatePickerVisible] = useState(false);
  const [selectedPickupDate, setSelectedPickupDate] = useState(new Date());
  const [selectedDropoffDate, setSelectedDropoffDate] = useState(new Date());

  const [pickupDateTimeText, setPickupDateTimeText] = useState('Select pickup date and time');
  const [dropoffDateTimeText, setDropoffDateTimeText] = useState('Select drop-off date and time');

  const { vehicleMake, vehicleModel, vehiclepickupDropoffLocation, vehicleKeyImage, rate } = route.params;

  const openMapsApp = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    Linking.openURL(mapUrl)
      .then((result) => {
        if (result) {
          console.log('Opened maps successfully');
        } else {
          console.log('Unable to open maps');
        }
      })
      .catch((error) => {
        console.error('Error opening maps: ', error);
      });
  };

  const showPickupDatePicker = () => {
    setPickupDatePickerVisible(true);
  };

  const hidePickupDatePicker = () => {
    setPickupDatePickerVisible(false);
  };

  const handlePickupConfirm = (date) => {
    hidePickupDatePicker();
    setSelectedPickupDate(date);
    setPickupDateTimeText(date.toLocaleString());
  };

  const showDropoffDatePicker = () => {
    setDropoffDatePickerVisible(true);
  };

  const hideDropoffDatePicker = () => {
    setDropoffDatePickerVisible(false);
  };

  const handleDropoffConfirm = (date) => {
    hideDropoffDatePicker();
    setSelectedDropoffDate(date);
    setDropoffDateTimeText(date.toLocaleString());
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  const onContinuePressed = () => {
    const currentDateTime = new Date();
    if (selectedPickupDate < currentDateTime) {
      Alert.alert('Invalid Pickup Date', 'Please select a pickup date and time in the future.');
    } else if (selectedPickupDate >= selectedDropoffDate) {
      Alert.alert('Invalid Dates', 'The drop-off date and time must be after the pickup date and time.');
    } else {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const daysRented = Math.round((selectedDropoffDate - selectedPickupDate) / millisecondsPerDay);
      Alert.alert('Success', `Vehicle rented for ${daysRented} days. Proceed with the booking.`);
      const bookingData = {
        vehicleMake,
        vehicleModel,
        vehicleKeyImage,
        vehiclepickupDropoffLocation,
        pickupDateTimeText,
        dropoffDateTimeText,
        daysRented,
        rate
        // Replace with the actual values you want to pass
      };
  
      // Navigate to the BookingSummaryScreen and pass the data as route parameters
      navigation.navigate('summary', bookingData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Booking Information</Text>
      </View>
      <Image
           source={{ uri: vehicleKeyImage }} 
            style={styles.keyImage}
          />
      <View style={styles.content}>
        <Text style={styles.vehicleInfo}>
          {vehicleMake} {vehicleModel}
        </Text>
        <View style={styles.location}>
          <Text>Pick up and Drop Off Location:</Text>
          <TouchableOpacity onPress={openMapsApp}>
            <Text style={styles.locationText}>
              {vehiclepickupDropoffLocation}
            </Text>
          </TouchableOpacity>
        </View>
                <View style={styles.datetime}>
          <Text>Pickup Date and Time</Text>
          <View style={styles.dateInput}>
            <Icons name="calendar" style={styles.calendarIcon} />
            <TouchableOpacity onPress={showPickupDatePicker}>
              <Text style={styles.selectedDateTime}>
                {pickupDateTimeText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.datetime}>
        <Text>Drop-off Date and Time</Text>
          <View style={styles.dateInput}>
            <Icons name="calendar" style={styles.calendarIcon} />
            <TouchableOpacity onPress={showDropoffDatePicker}>
            <Text style={styles.selectedDateTime}>
            {dropoffDateTimeText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isPickupDatePickerVisible}
          mode="datetime"
          onConfirm={handlePickupConfirm}
          onCancel={hidePickupDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDropoffDatePickerVisible}
          mode="datetime"
          onConfirm={handleDropoffConfirm}
          onCancel={hideDropoffDatePicker}
        />
      </View>
      <View style={styles.booknow}>
        <TouchableOpacity style={styles.bookNowButton} onPress={onContinuePressed}>
          <Text style={styles.titleText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
  },
  keyImage: {
    marginTop: 10,
    width: '95%',
    height: 210,
    borderRadius: 15,
    left: 10
  },
  back: {
    fontSize: 30,
    color: 'white',
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  vehicleInfo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    marginTop: 10,
  },
  locationText: {
    color: '#2ecc71',
    fontSize: 18,
  },
  datetime: {
    marginTop: 20,
  },
  selectedDateTime: {
    fontSize: 18,
    color: '#2ecc71',
  },
  booknow: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    alignItems: 'center',
    top: 200
  },
  bookNowButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    paddingVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#2ecc71',
    paddingLeft: 5,
    paddingRight: 15,
    marginTop: 5,
  },
  
  calendarIcon: {
    fontSize: 20,
    color: '#2ecc71',
    marginRight: 10,
  },
  

});

export default BookingScreen;
