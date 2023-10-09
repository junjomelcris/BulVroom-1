import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const location = 'purok 4 liciada bustos bulacan'; // Replace with the actual pickup/dropoff location
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Extract vehicle make, model, and key image from the route params
  const { vehicleMake, vehicleModel, vehiclepickupDropoffLocation } = route.params;

  const openMapsApp = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
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

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.titleText}> Booking Information</Text>
      </View>
      <Image
        source={require('../../../assets/images/sample.png')}
        style={styles.KeyImage}
      />
      <Text style={styles.vehicleInfo}>
        {vehicleMake} {vehicleModel} of Owner Name
      </Text>
      <TouchableOpacity onPress={openMapsApp}>
        <Text>{vehiclepickupDropoffLocation} Clickable to</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showDateTimePicker}>
        <Text>Select Date and Time</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
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
  KeyImage: {
    marginTop: 10,
    width: 335,
    height: 210,
    marginLeft: -3,
    borderRadius: 15,
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
});

export default BookingScreen;