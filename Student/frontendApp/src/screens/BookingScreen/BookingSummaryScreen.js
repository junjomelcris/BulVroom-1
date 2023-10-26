import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const BookingSummaryScreen = ({ route }) => {
  const { vehicleMake, vehicleModel,vehicleKeyImage, vehiclepickupDropoffLocation, pickupDateTimeText, dropoffDateTimeText, rate, daysRented } = route.params;
  const totalPayment = rate * daysRented;
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/user/${userId}`);
      setUserData(response.data);
      console.log(response.data.driver_license_1);
    } catch (error) {
      console.log('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('id');
        setUserId(storedId);
        fetchUserData(storedId);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveData();
  }, []);

  const onBackPressed = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Booking Summary</Text>
      </View>

      <View style={styles.vehicleInfoContainer}>
        <Image source={{ uri: vehicleKeyImage }} style={styles.vehicleImage} />
        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleMake}>{vehicleMake}</Text>
          <Text style={styles.vehicleModel}>{vehicleModel}</Text>
          <Text style={styles.rateText}>{`P ${rate} / day`}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.locationText}>Pickup & Drop-off Location:</Text>
        <Text style={styles.locationValue}>{vehiclepickupDropoffLocation}</Text>

        <Text style={styles.dateTimeText}>Pickup Date and Time:</Text>
        <Text style={styles.dateTimeValue}>{pickupDateTimeText}</Text>

        <Text style={styles.dateTimeText}>Drop-off Date and Time:</Text>
        <Text style={styles.dateTimeValue}>{dropoffDateTimeText}</Text>

        <Text style={styles.priceText}>Per Day Price:</Text>
        <Text style={styles.priceValue}>{rate}</Text>

        <Text style={styles.daysText}>Total Days Rented:</Text>
        <Text style={styles.daysValue}>{daysRented}</Text>

        <Text style={styles.totalPaymentText}>Total Payment:</Text>
        <Text style={styles.totalPaymentValue}>{totalPayment}</Text>
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTimeValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  daysText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  daysValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  totalPaymentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPaymentValue: {
    fontSize: 16,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    paddingVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    bottom:20,
    width: 400

  },
  back: {
    fontSize: 30,
    color: 'white',
    left: 17
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    left: 70
  },
  vehicleDetails: {
    marginLeft: 20,
  },
  vehicleMake: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vehicleModel: {
    fontSize: 16,
    marginBottom: 5,
  },
  rateText: {
    fontSize: 16,
  },
  vehicleImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  vehicleInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default BookingSummaryScreen;