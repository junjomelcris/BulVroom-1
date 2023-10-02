import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getVehicles } from '../../screens/Vehicles/Vehicless'; // Import the getVehicles function

const DashboardScreen = () => {
  const [cardData, setCardData] = useState([]);
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
    item.status = 'approved';
    Alert.alert('Success', 'The vehicle has been approved.');
    // You may want to update the backend or perform other actions here.
  };

  const myComponents = cardData.map((item) => (
    <View key={item.id} style={styles.card}>
      <Text style={styles.vehicleTitle}>{item.make} {item.model}</Text>
      <Text style={styles.vehicleInfo}>Type: {item.type}</Text>
      <Text style={styles.vehicleInfo}>Transmission: {item.transmission}</Text>
      <Text style={styles.vehicleInfo}>Gas Type: {item.gas}</Text>
      <Text style={styles.vehicleInfo}>Seating Capacity: {item.seatingCapacity}</Text>
      <Text style={styles.vehicleInfo}>License Plate: {item.plate}</Text>
      <Text style={styles.vehicleInfo}>Description: {item.description}</Text>
      <Text style={styles.vehicleInfo}>Rental Price: {item.rate}</Text>
      <Text style={styles.vehicleInfo}>Security Deposit: {item.deposit}</Text>
      <Text style={styles.vehicleInfo}>Status: {item.status}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item, !item.isFavorite)}>
        <Icon name={item.isFavorite ? 'star' : 'star-outline'} size={30} color={item.isFavorite ? '#F39C12' : 'gray'} />
      </TouchableOpacity>
      {item.status === 'pending' && (
        <TouchableOpacity onPress={() => approveVehicle(item)} style={styles.approveButton}>
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>
      )}
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.backIcon}></Icon>
        </TouchableOpacity>
        <View style={styles.titleCenter}>
          <Icon name="car" style={styles.carIcon}></Icon>
          <Text style={styles.titleText}>My Vehicles</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Vehicle</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {myComponents}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
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
  approveButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  approveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
