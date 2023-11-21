import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const BookingSummaryScreen = ({ route }) => {
  const { vehicleId, ownerId, vehicleMake, vehicleModel, vehicleKeyImage, vehiclepickupDropoffLocation, selectedPickupDate, selectedDropoffDate, rate, daysRented, user } = route.params;
  const totalPayment = rate * daysRented;
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [gcash_ref_no, setGcashRefNo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);

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
        console.log('id: ' + storedId)
        fetchUserData(storedId);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveData();
    getOwnerEmail();
  }, []);

  const getOwnerEmail = async () => {
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/user/${ownerId}`);
      setOwnerEmail(response.data.email);
    } catch (error) {
      console.log('Failed to fetch user data:', error);
    }
  }

  const handleBooking = async () => {
    try {
      console.log(ownerEmail.length, ownerEmail)
      if (ownerEmail.length < 6) {
        Alert.alert("Something went wrong, please try restarting the app.")
      } else {
        if (paymentMethod == 1 && gcash_ref_no < 12) {
          Alert.alert("Payment Error", "Invalid Gcash Number")
        } else {
          let inputDate1 = new Date(selectedPickupDate);
          let inputDate2 = new Date(selectedDropoffDate);
          let notificationDate = new Date();
          let formattedNotificationDate = notificationDate.toISOString().slice(0, 19).replace('T', ' ');

          let formattedPickupDate = inputDate1.toISOString().slice(0, 19).replace('T', ' ');
          let formattedDropOffDate = inputDate2.toISOString().slice(0, 19).replace('T', ' ');

          const response = await axios.post(`https://bulvroom.onrender.com/api/transaction`, { vehicleId, ownerId, vehicleMake, vehicleModel, vehicleKeyImage, vehiclepickupDropoffLocation, selectedPickupDate: formattedPickupDate, selectedDropoffDate: formattedDropOffDate, rate, daysRented, totalPayment, userId, ownerEmail, payment_method: paymentMethod, gcash_ref_no });
          if (response.data.message == "Transaction created") {
            Alert.alert(
              "Transaction created",
              "Please wait for the Vehicle owner to approve your request.",
              [
                { text: 'OK', onPress: () => navigation.navigate('Homes') }
              ],
              { cancelable: false }
            );
            axios.post(`https://bulvroom.onrender.com/notifications`, {
              title: "Vehicle Booked",
              label: `Your ${vehicleMake + " " + vehicleModel} has been book.`,
              user_id: ownerId,
              date_time: formattedNotificationDate
            });
          } else {
            Alert.alert("error")
          }
        }
      }
    } catch (error) {
      console.log('Failed to fetch user data:', error);
    }
  }

  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
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
            <Text style={styles.dateTimeValue}>{selectedPickupDate}</Text>

            <Text style={styles.dateTimeText}>Drop-off Date and Time:</Text>
            <Text style={styles.dateTimeValue}>{selectedDropoffDate}</Text>

            <Text style={styles.priceText}>Per Day Price:</Text>
            <Text style={styles.priceValue}>{rate}</Text>

            <Text style={styles.daysText}>Total Days Rented:</Text>
            <Text style={styles.daysValue}>{daysRented}</Text>

            <Text style={styles.totalPaymentText}>Total Payment:</Text>
            <Text style={styles.totalPaymentValue}>{totalPayment}</Text>

            <Text style={styles.locationText}>Payment</Text>
            <View style={styles.infoContainer}>
              <View><Text>Select Payment Method</Text></View>
              <View>
                <View style={styles.radioButton}>
                  <RadioButton.Android
                    value={0}
                    status={paymentMethod === 0 ?
                      'checked' : 'unchecked'}
                    onPress={() => setPaymentMethod(0)}
                    color="#007BFF"
                  />
                  <Text style={styles.radioLabel}>
                    Cash
                  </Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android
                    value={1}
                    status={paymentMethod === 1 ?
                      'checked' : 'unchecked'}
                    onPress={() => setPaymentMethod(1)}
                    color="#007BFF"
                  />
                  <Text style={styles.radioLabel}>
                    Gcash
                  </Text>
                </View>
              </View>
            </View>
            {paymentMethod == 1 && (
              <View>
                <Text style={styles.locationText}>Gcash Transaction</Text>
                <View style={styles.dateInput}>
                  <TextInput
                    placeholder='Gcash Payment Reference Number'
                    value={gcash_ref_no || ""}
                    onChangeText={(e) => setGcashRefNo(e)}></TextInput>
                </View>
                <View>
                  <Text>{`Send your payment at ${user.phone}`}</Text>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={() => handleBooking()}>
            <Text style={styles.buttonText}>Complete Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  scrollView: {
    height: '100%',
    width: '100%', // Occupy the entire width
    marginTop: 10,

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
    fontWeight: '900',
  },
  locationValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: '900',
  },
  dateTimeValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '900',
  },
  priceValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  daysText: {
    fontSize: 18,
    fontWeight: '900',
  },
  daysValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  totalPaymentText: {
    fontSize: 18,
    fontWeight: '900',
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
    fontWeight: '900',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    bottom: 20,
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
    fontWeight: '900',
    color: 'white',
    left: 70
  },
  vehicleDetails: {
    marginLeft: 20,
  },
  vehicleMake: {
    fontSize: 18,
    fontWeight: '900',
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
    marginBottom: 0,
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
});

export default BookingSummaryScreen;