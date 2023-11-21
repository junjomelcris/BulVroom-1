import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getVehicles } from '../../screens/Vehicles/Vehicless'; // Import the getVehicles function
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RefreshControl } from 'react-native';

const DashboardScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [showPending, setShowPending] = useState(true); // State to toggle between pending and approved vehicles
  const navigation = useNavigation();
  const route = useRoute();
  const newVehicle = route.params?.newVehicle;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Load vehicles data from vehicles.js when the component mounts
    //const vehicles = getVehicles();
    if (newVehicle) {
      // If a new vehicle was added, add it to the existing list
      //vehicles.push(newVehicle);
      setCardData({ ...cardData, newVehicle });
    }
    //setCardData(vehicles);
    getBookings();
  }, [newVehicle]);

  const getBookings = async () => {
    const user_id = await AsyncStorage.getItem('id');
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/bookedvehicle/${user_id}`);
      setCardData(response.data);
      console.log(response.data);
      //setRefreshing(false);
    } catch (error) {
      console.log('Failed to fetch notifications data:', error);
      //setRefreshing(false);
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    getBookings();
  };

  const toggleFavorite = (item, isFavorite) => {
    const updatedCardData = cardData.map((card) =>
      card.id === item.id ? { ...card, isFavorite } : card
    );
    setCardData(updatedCardData);
  };

  const onCarCardPress = (item) => {
    // Navigate to the 'CarDetails' screen and pass the car data
    navigation.navigate('renterBookingSummary', { bookingData: item });
  };

  const onBackPressed = () => {
    // Use the navigate method to go back to the previous screen
    navigation.goBack();
  };

  const onAddPress = () => {
    // Navigate to the 'AddVehicle' screen when the "Add" button is pressed
    navigation.navigate('AddVehicle');
  };

  const approveVehicle = (item) => {
    console.log(item);

    try {
      Alert.alert("Approve Booking",
        "Do you want to approve this booking?",
        [
          {
            text: 'Yes',
            onPress: async () => {
              const response = await axios.put(`https://bulvroom.onrender.com/bookedvehicle/${item.transaction_id}`, {
                status: 2
              });
              if (response.data.message == "Status updated successfully") {
                Alert.alert("Booking Approved", "Booking Approved Successful.");
                getBookings();
              }
            },
          },
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
          },
        ]);
    } catch (error) {
      console.log('Failed to approved:', error);
    }
  };

  // Filter vehicles based on the showPending state
  const filteredVehicles = showPending
    ? cardData.filter((item) => item.transaction_status === 1)
    : cardData.filter((item) => item.transaction_status === 2);

  const myComponents = filteredVehicles.map((item) => (
    <TouchableOpacity
      key={item.transaction_id}
      style={styles.card}
      onPress={() => onCarCardPress(item)} // Navigate to CarDetails on press
    >
      <View style={styles.row}>
        <Image source={{
          uri: item.vehicle_image
        }} style={styles.VecImage} />
        <View style={styles.textContainer}>
          <Text style={styles.vehicleTitle}>{item.make} {item.model}</Text>
          <Text style={styles.vehicleInfo}>Type: {item.type}</Text>
          <Text style={styles.vehicleInfo}>Rental Price: {item.rate}</Text>
          <Text style={styles.vehicleStatus}>{item.transaction_status === 1 ? "Pending" : "Done"}</Text>
        </View>
      </View>
      {item.transaction_status === 1 && (
        <TouchableOpacity onPress={() => approveVehicle(item)} style={styles.approveButton}>
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.backIcon}></Icon>
        </TouchableOpacity>
        <View style={styles.titleCenter}>
          <Icon name="book" style={styles.carIcon}></Icon>
          <Text style={styles.titleText}> My Bookings</Text>
        </View>
      </View>
      <View style={styles.filterButtons}>
        <TouchableOpacity
          onPress={() => setShowPending(true)}
          style={[styles.filterButton, showPending && styles.activeFilterButton]}
        >
          <Text style={[styles.filterButtonText, showPending && styles.activeFilterButtonText]}>On Process</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowPending(false)}
          style={[styles.filterButton, !showPending && styles.activeFilterButton]}
        >
          <Text style={[styles.filterButtonText, !showPending && styles.activeFilterButtonText]}>Approved</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {myComponents}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  VecImage: {
    width: 150, // Set the width of the image
    height: 110, // Set the height of the image
    marginRight: 10, // Add some margin to separate the image from text
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // To make the text take up the remaining space
    marginLeft: 10, // Add some margin to separate the image from text
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backIcon: {
    fontSize: 30,
    color: 'white',
  },
  carIcon: {
    fontSize: 30,
    color: 'white',
  },
  titleCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  vehicleInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  vehicleStatus: {
    fontSize: 16,
    marginBottom: 4,
    color: '#2ECC71',
  },
  approveButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  approveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  filterButtons: {
    marginTop: 25,
    flexDirection: 'row',

    alignSelf: 'flex-start',
  },
  filterButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filterButtonText: {
    fontSize: 16,

  },
  activeFilterButton: {
    backgroundColor: '#2ecc71',
  },
  activeFilterButtonText: {
    color: 'white',
  },
});

export default DashboardScreen;


