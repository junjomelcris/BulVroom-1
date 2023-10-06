import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getVehicles } from '../../screens/Vehicles/Vehicless'; // Import the getVehicles function

const DashboardScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [showPending, setShowPending] = useState(true); // State to toggle between pending and approved vehicles
  const navigation = useNavigation();
  const route = useRoute();
  const newVehicle = route.params?.newVehicle;

  useEffect(() => {
    // Load vehicles data from vehicles.js when the component mounts
    const vehicles = getVehicles();
    if (newVehicle) {
      // If a new vehicle was added, add it to the existing list
      vehicles.push(newVehicle);
    }
    setCardData(vehicles);
  }, [newVehicle]);

  const toggleFavorite = (item, isFavorite) => {
    const updatedCardData = cardData.map((card) =>
      card.id === item.id ? { ...card, isFavorite } : card
    );
    setCardData(updatedCardData);
  };

  const onCarCardPress = (item) => {
    // Navigate to the 'CarDetails' screen and pass the car data
    navigation.navigate('RenterBookings', { car: item });
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
    // Change the status of the vehicle to "approved"
    item.status = 'APPROVED';
    Alert.alert('Success', 'Moved to done bookings.');
    // You may want to update the backend or perform other actions here.

    // Reload the data by refetching the vehicles from the source
    const updatedVehicles = getVehicles();
    setCardData(updatedVehicles);
  };

  // Filter vehicles based on the showPending state
  const filteredVehicles = showPending
    ? cardData.filter((item) => item.status === 'PENDING')
    : cardData.filter((item) => item.status === 'APPROVED');

  const myComponents = filteredVehicles.map((item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => onCarCardPress(item)} // Navigate to CarDetails on press
    > 
     <View style={styles.row}>
        <Image source={require('../../../assets/images/sample.png')} style={styles.VecImage} />
        <View style={styles.textContainer}>
          <Text style={styles.vehicleTitle}>{item.make} {item.model}</Text>
          <Text style={styles.vehicleInfo}>Type: {item.type}</Text>
          <Text style={styles.vehicleInfo}>Rental Price: {item.rate}</Text>
          <Text style={styles.vehicleStatus}>{item.status}</Text>
        </View>
      </View>
      {item.status === 'PENDING' && (
        <TouchableOpacity onPress={() => approveVehicle(item)} style={styles.approveButton}>
          <Text style={styles.approveButtonText}>Mark as done</Text>
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
          <Text style={styles.titleText}>  My Bookings</Text>
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
            <Text style={[styles.filterButtonText, !showPending && styles.activeFilterButtonText]}>Done</Text>
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.scrollView}>
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
