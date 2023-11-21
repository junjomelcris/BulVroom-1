import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/Ionicons'; // You can choose an appropriate icon
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const location = 'Purok 4, Liciada, Bustos, Bulacan';

  const [showModal, setShowModal] = useState(false);
  const [isPickupDatePickerVisible, setPickupDatePickerVisible] = useState(false);
  const [isPickupTimePickerVisible, setPickupTimePickerVisible] = useState(false);
  const [isDropoffDatePickerVisible, setDropoffDatePickerVisible] = useState(false);
  const [isDropoffTimePickerVisible, setDropoffTimePickerVisible] = useState(false);
  const [selectedPickupDate, setSelectedPickupDate] = useState(new Date());
  const [selectedPickupTime, setSelectedPickupTime] = useState("");
  const [selectedDropoffDate, setSelectedDropoffDate] = useState(new Date());
  const [selectedDropoffTime, setSelectedDropoffTime] = useState("");

  const [pickupDateText, setPickupDateText] = useState('Select pickup date');
  const [pickupTimeText, setPickupTimeText] = useState('Select pickup time');
  const [dropOffDateText, setDropOffDateText] = useState('Select drop-off date');
  const [dropOffTimeText, setDropOffTimeText] = useState('Select drop-off time');

  const { vehicleMake, vehicleModel, vehiclepickupDropoffLocation, vehicleKeyImage, rate, vehicleId, ownerId, user } = route.params;

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
    setPickupTimePickerVisible(true);
    setPickupDatePickerVisible(true);
  };

  const hidePickupDatePicker = () => {
    setPickupDatePickerVisible(false);
  };

  const showPickupTimePicker = () => {
    setPickupTimePickerVisible(true);
  };

  const hidePickupTimePicker = () => {
    setPickupTimePickerVisible(false);
  };

  const handlePickupConfirm = (date) => {
    hidePickupDatePicker();
    setSelectedPickupDate(date);
    setPickupDateText(date.toLocaleString());
  };

  const showDropoffDatePicker = () => {
    setDropoffTimePickerVisible(true);
    setDropoffDatePickerVisible(true);
  };

  const hideDropoffDatePicker = () => {
    setDropoffDatePickerVisible(false);
  };

  const showDropoffTimePicker = () => {
    setDropoffTimePickerVisible(true);
  };

  const hideDropoffTimePicker = () => {
    setDropoffTimePickerVisible(false);
  };

  const handleDropoffConfirm = (date) => {
    hideDropoffDatePicker();
    setSelectedDropoffDate(date);
    setDropOffDateText(date.toLocaleString());
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  const onContinuePressed = () => {
    const currentDateTime = new Date();
    let bookingData;
    if (selectedPickupDate < currentDateTime) {
      Alert.alert('Invalid Pickup Date', 'Please select a pickup date and time in the future.');
    } else if (selectedPickupDate >= selectedDropoffDate) {
      Alert.alert('Invalid Dates', 'The drop-off date and time must be after the pickup date and time.');
    } else {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const daysRented = Math.round((selectedDropoffDate - selectedPickupDate) / millisecondsPerDay);
      //Alert.alert('Success', `Vehicle rented for ${daysRented} days. Proceed with the booking.`);
      bookingData = {
        vehicleMake,
        vehicleModel,
        vehicleKeyImage,
        vehiclepickupDropoffLocation,
        selectedPickupDate: String(selectedPickupDate),
        selectedDropoffDate: String(selectedDropoffDate),
        daysRented,
        rate,
        vehicleId,
        ownerId,
        ownerEmail: user,
        user
        // Replace with the actual values you want to pass
      };
      // Navigate to the BookingSummaryScreen and pass the data as route parameters
      navigation.navigate('summary', bookingData);
    }
  };

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.title}>
            <TouchableOpacity onPress={onBackPressed}>
              <Icon name="arrow-back" style={styles.back} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Booking Information</Text>
          </View>
          <Image
            source={{ uri: vehicleKeyImage }}
            style={styles.keyImage} />
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
                    {pickupDateText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.datetime}>
            <Text>Pickup Time</Text>
            <View style={styles.dateInput}>
              <Icons name="calendar" style={styles.calendarIcon} />
              <TouchableOpacity onPress={showPickupTimePicker}>
                <Text style={styles.selectedDateTime}>
                  {pickupTimeText}
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
            <View style={styles.datetime}>
              <Text>Drop-off Date and Time</Text>
              <View style={styles.dateInput}>
                <Icons name="calendar" style={styles.calendarIcon} />
                <TouchableOpacity onPress={showDropoffDatePicker}>
                  <Text style={styles.selectedDateTime}>
                    {dropOffDateText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>


            {/* <View style={styles.datetime}>
            <Text>Drop-off Time</Text>
            <View style={styles.dateInput}>
              <Icons name="calendar" style={styles.calendarIcon} />
              <TouchableOpacity onPress={showDropoffTimePicker}>
                <Text style={styles.selectedDateTime}>
                  {dropOffTimeText}
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}

            {/* <DateTimePicker
            isVisible={isPickupDatePickerVisible}
            mode="datetime"
            value={selectedPickupDate}
            con
            onConfirm={handlePickupConfirm}
            onCancel={hidePickupDatePicker} />
          <DateTimePicker
            isVisible={isDropoffDatePickerVisible}
            mode="datetime"
            value={selectedDropoffDate}
            onConfirm={handleDropoffConfirm}
            onCancel={hideDropoffDatePicker} /> */}

            {isPickupDatePickerVisible && (
              <DateTimePicker
                value={selectedPickupDate}
                mode="date"
                is24Hour={false}
                display="calendar"
                onChange={(e) => {
                  if (e.type == "set") {
                    setSelectedPickupDate(new Date(e.nativeEvent.timestamp));
                    setPickupDateText(String(new Date(e.nativeEvent.timestamp).toLocaleString()))
                    setPickupDatePickerVisible(false);
                  } else {
                    setPickupDatePickerVisible(false);
                  }
                }}

              />
            )}
            {isPickupTimePickerVisible && (
              <DateTimePicker
                value={selectedPickupTime || new Date()}
                mode="time"
                is24Hour={false}
                display="clock"
                onChange={(e) => {
                  if (e.type == "set") {
                    console.log(e.nativeEvent.timestamp);
                    setPickupTimePickerVisible(false);
                  } else {
                    setPickupTimePickerVisible(false);
                  }
                }}

              />
            )}
            {isDropoffDatePickerVisible && (
              <DateTimePicker
                value={selectedDropoffDate}
                mode="date"
                is24Hour={false}
                display="calendar"
                onChange={(e) => {
                  if (e.type == "set") {
                    setSelectedDropoffDate(new Date(e.nativeEvent.timestamp));
                    setDropOffDateText(String(new Date(e.nativeEvent.timestamp).toLocaleString()))
                    setDropoffDatePickerVisible(false);
                  } else {
                    setDropoffDatePickerVisible(false);
                  }
                }}

              />
            )}
            {isDropoffTimePickerVisible && (
              <DateTimePicker
                value={selectedDropoffTime || new Date()}
                mode="time"
                is24Hour={false}
                display="clock"
                onChange={(e) => {
                  if (e.type == "set") {
                    console.log(e.nativeEvent.timestamp);
                    setDropoffTimePickerVisible(false);
                  } else {
                    setDropoffTimePickerVisible(false);
                  }
                }}

              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.booknow}>
        <TouchableOpacity style={styles.bookNowButton} onPress={onContinuePressed}>
          <Text style={styles.titleText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
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
    top: 0
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
  containerRadio: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    marginBottom: 50,
  },

});

export default BookingScreen;
