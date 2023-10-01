import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'; // Import TextInput
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddVehicleScreen = () => {
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]); // State for selected features
  const [licensePlate, setLicensePlate] = useState('');
  const [description, setDescription] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');

  const navigation = useNavigation();

  // Array of available vehicle features
  const vehicleFeaturesData = [
    'AC',
    'Bluetooth',
    'USB',
    // Add more features as needed
  ];

  // Function to toggle feature selection
  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const addVehicleToStore = () => {
    if (vehicleMake && vehicleModel && rentalPrice) {
      const newVehicle = {
        id: String(Math.random()), // Generate a unique ID (you may want a better approach)
        imageSource: require('../../../assets/images/offer.png'),
        make: vehicleMake,
        model: vehicleModel,
        type: vehicleType,
        features: selectedFeatures.join(', '), // Convert the selected features array to a comma-separated string
        plate: licensePlate,
        description: description,
        rate: `₱${rentalPrice}`,
      };

      // Navigate back to the DashBoardScreen with the new vehicle as a parameter
      navigation.navigate('Vehicles', { newVehicle: newVehicle });
    } else {
      // Handle input validation errors or show a message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Vehicle</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Vehicle Make"
          placeholderTextColor="#888"
          value={vehicleMake}
          onChangeText={(text) => setVehicleMake(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Vehicle Model"
          placeholderTextColor="#888"
          value={vehicleModel}
          onChangeText={(text) => setVehicleModel(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Vehicle Type"
          placeholderTextColor="#888"
          value={vehicleType}
          onChangeText={(text) => setVehicleType(text)}
        />
        <View style={styles.featureContainer}>
          <Text style={styles.featuresLabel}>Vehicle Features:</Text>
          {vehicleFeaturesData.map((feature) => (
            <TouchableOpacity
              key={feature}
              style={styles.checkboxContainer}
              onPress={() => toggleFeature(feature)}
            >
              <Text>{feature}</Text>
              <Icon
                name={selectedFeatures.includes(feature) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={30}
                color={selectedFeatures.includes(feature) ? 'green' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="License Plate"
          placeholderTextColor="#888"
          value={licensePlate}
          onChangeText={(text) => setLicensePlate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Vehicle Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Rental Price per day"
          placeholderTextColor="#888"
          value={rentalPrice}
          onChangeText={(text) => setRentalPrice(text)}
        />
        <TouchableOpacity onPress={addVehicleToStore} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Vehicle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#888',
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  featureContainer: {
    marginBottom: 20,
  },
  featuresLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddVehicleScreen;
