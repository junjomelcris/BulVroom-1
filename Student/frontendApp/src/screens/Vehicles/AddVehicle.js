import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper'; 

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    userId: '38', // Replace with the actual user ID
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
    dateAdded: new Date().toISOString(),
    pickupDropoffLocation: '',
    status: 'pending',
  });
  const [isTypeModalVisible, setTypeModalVisible] = useState(false);

  const vehicleTypes = ['Motorcycle', 'Sedan', 'SUV', 'Van', 'Others', ];

  const handleSelectType = (type) => {
    setVehicleData({ ...vehicleData, type });
    setTypeModalVisible(false); // Close the modal after selecting a type
  };
  
  const navigation = useNavigation();


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

  const handleTransmissionChange = (transmission) => {
    setVehicleData({ ...vehicleData, transmission });
  };

  const handleGasChange = (gas) => {
    setVehicleData({ ...vehicleData, gas });
  };

  const handleIncrementSeatingCapacity = () => {
    setVehicleData((prevState) => ({
      ...vehicleData,
      seatingCapacity: prevState.seatingCapacity + 1,
    }));
  };

  const handleDecrementSeatingCapacity = () => {
    if (vehicleData.seatingCapacity > 1) {
      setVehicleData((prevState) => ({
        ...vehicleData,
        seatingCapacity: prevState.seatingCapacity - 1,
      }));
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
          navigation.navigate('Vehicles');
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
<View style={styles.input}>
  <TouchableOpacity onPress={() => setTypeModalVisible(true)}>
    <Text>Type: {vehicleData.type}</Text>
  </TouchableOpacity>
</View>
<Modal visible={isTypeModalVisible} animationType="slide" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.bgmodal}>
      {vehicleTypes.map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => handleSelectType(type)}
          style={styles.typeOption}
        >
          <Text style={styles.txt1}>{type}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => setTypeModalVisible(false)}
        style={styles.closeButton}
      >
        <Text style={styles.txt}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
     <View style={styles.input}>
        <Text>Seating Capacity</Text>
        <View style={styles.seatingCapacityContainer}>
          <TouchableOpacity onPress={handleDecrementSeatingCapacity}>
            <Text style={styles.seatingCapacityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.seatingCapacityValue}>{vehicleData.seatingCapacity}</Text>
          <TouchableOpacity onPress={handleIncrementSeatingCapacity}>
            <Text style={styles.seatingCapacityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
 <View style={styles.transmissionContainer}>
        <Text style={styles.label}>Transmission:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.transmissionButton1,
              vehicleData.transmission === 'Manual' && styles.selectedTransmissionButton,
            ]}
            onPress={() => handleTransmissionChange('Manual')}
          >
            <Text style={styles.buttonText}>Manual</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.transmissionButton,
              vehicleData.transmission === 'Automatic' && styles.selectedTransmissionButton,
            ]}
            onPress={() => handleTransmissionChange('Automatic')}
          >
            <Text style={styles.buttonText}>Automatic</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.transmissionContainer}>
        <Text style={styles.label}>Gas Type:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.transmissionButton1,
              vehicleData.gas === 'Diesel' && styles.selectedTransmissionButton,
            ]}
            onPress={() => handleGasChange('Diesel')}
          >
            <Text style={styles.buttonText}>Diesel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.transmissionButton,
              vehicleData.gas === 'Premium' && styles.selectedTransmissionButton,
            ]}
            onPress={() => handleGasChange('Premium')}
          >
            <Text style={styles.buttonText}>Premium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.transmissionButton,
              vehicleData.gas === 'Unleaded' && styles.selectedTransmissionButton,
            ]}
            onPress={() => handleGasChange('Unleaded')}
          >
            <Text style={styles.buttonText}>Unleaded</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        placeholder="Vehicle Plate"
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
      placeholder="Phone Number (09)"
      onChangeText={(text) => setVehicleData({ ...vehicleData, phone: text })}
      keyboardType="numeric"
      maxLength={11}
    />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Rate (24 hrs)"
        keyboardType="numeric"
        onChangeText={(text) => setVehicleData({ ...vehicleData, rate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Security Deposit"
        keyboardType="numeric"
        onChangeText={(text) => setVehicleData({ ...vehicleData, deposit: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Pickup/Dropoff Location"
        onChangeText={(text) => setVehicleData({ ...vehicleData, pickupDropoffLocation: text })}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddVehicle}
      >
        <Text style={styles.buttonText1}>Add Vehicle</Text>
      </TouchableOpacity>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // 50% transparent black
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white',
  },
  txt1: {
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  seatingCapacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seatingCapacityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  seatingCapacityValue: {
    fontSize: 18,
  },
  bgmodal: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  typeOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  closeButton: {
    paddingHorizontal: 95,
    paddingVertical: 16,
    backgroundColor: 'green',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  transmissionContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transmissionButton1: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  transmissionButton: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  selectedTransmissionButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    width: '100%',
    backgroundColor: 'green',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddVehicle;
