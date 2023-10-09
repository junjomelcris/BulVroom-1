import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    userId: 'user123', // Replace with the actual user ID
    make: '',
    model: '',
    type: '',
    seatingCapacity: 1,
    transmission: 'Manual',
    gas: 'Diesel',
    features: [],
    plate: '',
    description: '',
    phone: '',
    rate: '',
    deposit: '',
    dateAdded: new Date().toISOString(), // Automatically set to the current date and time
    status: 'pending', // Default status is 'pending'
  });

  const handleFeatureToggle = (feature) => {
    if (vehicleData.features.includes(feature)) {
      setVehicleData({
        ...vehicleData,
        features: vehicleData.features.filter((item) => item !== feature),
      });
    } else {
      setVehicleData({
        ...vehicleData,
        features: [...vehicleData.features, feature],
      });
    }
  };

  const handleAddVehicle = () => {
    // Send a POST request to the API endpoint
    fetch('https://bulvroom.onrender.com/createVehicle/app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Status === 'Success') {
          // Vehicle added successfully, you can perform any necessary actions here
          console.log('Vehicle added successfully');
        } else {
          // Handle the error, if any
          console.error('Error adding vehicle:', data.Message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Vehicle</Text>
      <TextInput
        style={styles.input}
        placeholder="Make"
        onChangeText={(text) => setVehicleData({ ...vehicleData, make: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        onChangeText={(text) => setVehicleData({ ...vehicleData, model: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        onChangeText={(text) => setVehicleData({ ...vehicleData, type: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Seating Capacity"
        onChangeText={(text) => setVehicleData({ ...vehicleData, seatingCapacity: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Transmission"
        onChangeText={(text) => setVehicleData({ ...vehicleData, transmission: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Gas"
        onChangeText={(text) => setVehicleData({ ...vehicleData, gas: text })}
      />
      <View>
        <Text style={styles.featuresLabel}>Features:</Text>
        {[
          'Aircondition',
          'Bluetooth',
          'GPS',
          'Sunroof',
          'Spare Tire',
          'Airbag',
          'Dash Cam',
          'Rear View Camera',
        ].map((feature) => (
          <View style={styles.featureRow} key={feature}>
            <Button
              title={feature}
              onPress={() => handleFeatureToggle(feature)}
              color={vehicleData.features.includes(feature) ? 'green' : 'gray'}
            />
          </View>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Plate"
        onChangeText={(text) => setVehicleData({ ...vehicleData, plate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => setVehicleData({ ...vehicleData, description: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(text) => setVehicleData({ ...vehicleData, phone: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Rate"
        onChangeText={(text) => setVehicleData({ ...vehicleData, rate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Deposit"
        onChangeText={(text) => setVehicleData({ ...vehicleData, deposit: text })}
      />
      <Button title="Add Vehicle" onPress={handleAddVehicle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  featuresLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default AddVehicle;
