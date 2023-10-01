import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getVehicles } from '../../screens/Vehicles/Vehicless'; // Import the getVehicles function

const DashBoardScreen = () => {
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

  const myComponents = cardData.map((item) => (
    <View key={item.id} style={styles.card}>
      {/* Display vehicle information here */}
      <Text>Make: {item.make}</Text>
      <Text>Model: {item.model}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Transmission: {item.transmission}</Text>
      <Text>Gas Type: {item.gas}</Text>
      <Text>Features: {item.features}</Text>
      <Text>Seating Capacity: {item.seatingCapacity}</Text>
      <Text>License Plate: {item.plate}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Rental Price: {item.rate}</Text>
      <Text>Security Deposit: {item.deposit}</Text>
      {/* You can add more details or customize this section as needed */}
      <TouchableOpacity onPress={() => toggleFavorite(item, !item.isFavorite)}>
        <Icon name={item.isFavorite ? 'star' : 'star-outline'} size={30} color={item.isFavorite ? 'yellow' : 'gray'} />
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.back}></Icon>
        </TouchableOpacity>
        <View style={styles.titleCenter}>
          <Icon name="car" style={styles.title2}></Icon>
          <Text style={styles.titleText}>My Vehicles</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {/* Render your card components here */}
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
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    color: 'black',
    fontSize: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  back: {
    fontSize: 30,
    color: 'white',
  },
  title2: {
    fontSize: 30,
    color: 'white',
  },
  titleText: {
    marginLeft: 5,
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
});

export default DashBoardScreen;
