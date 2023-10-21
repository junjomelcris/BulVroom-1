import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const location = 'Purok 4, Liciada, Bustos, Bulacan';
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateTimeText, setDateTimeText] = useState('Select date and time'); // Initial text

  const { vehicleMake, vehicleModel, vehiclepickupDropoffLocation } = route.params;

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

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const onTimeChange = (event, selected) => {
    const currentTime = selected || selectedDate;
    setShowTimePicker(Platform.OS === 'ios');
    setSelectedDate(currentTime);
    setDateTimeText(currentTime.toLocaleString());
  };

  const onDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
    setShowTimePicker(true);
    setDateTimeText(currentDate.toLocaleString());
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
        <Text style={styles.titleText}>Booking Information</Text>
      </View>
      <Image
        source={require('../../../assets/images/sample.png')}
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
          <Text>Pick up Date and Time</Text>
          <TouchableOpacity onPress={showDateTimePicker}>
            <Text style={styles.selectedDateTime}>
              {dateTimeText} {/* Display the selected date and time */}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="default"
              onChange={onDateChange}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>
        <View style={styles.datetime}>
          <Text>Drop Off Date and Time</Text>
          <TouchableOpacity onPress={showDateTimePicker}>
            <Text style={styles.selectedDateTime}>
              {dateTimeText} {/* Display the selected date and time */}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="default"
              onChange={onDateChange}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>
      </View>
      <View style={styles.booknow}>
      <TouchableOpacity style={styles.bookNowButton}>
  <View style={styles.titleCenter}>
    <Text style={styles.titleText}>Continue</Text>
  </View>

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
    width: '100%',
    height: 210,
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
  content: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  vehicleInfo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  booknow: {
    flexDirection: 'row',
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10, // Adjust this value as needed
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
});

export default BookingScreen;
