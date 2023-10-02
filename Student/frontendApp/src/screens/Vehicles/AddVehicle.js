import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddVehicleScreen = () => {
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [transmission, setTransmission] = useState('Manual');
  const [gasType, setGasType] = useState('Diesel');
  const [licensePlate, setLicensePlate] = useState('');
  const [description, setDescription] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [secDeposit, setSecDeposit] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState('pending'); // Add status state

  const navigation = useNavigation();

  const vehicleFeaturesData = [
    'Aircondition',
    'Bluetooth',
    'GPS',
    'Sunroof',
    'Spare Tire',
    'Airbag',
    'Dash Cam',
    'Rear View Camera',
  ];

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const incrementSeatingCapacity = () => {
    setSeatingCapacity(seatingCapacity + 1);
  };

  const decrementSeatingCapacity = () => {
    if (seatingCapacity > 1) {
      setSeatingCapacity(seatingCapacity - 1);
    }
  };

  const handleRentalPriceChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setRentalPrice(numericText);
  };

  const handleSecDepositChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setSecDeposit(numericText);
  };

  const addVehicleToStore = () => {
    if (isChecked && vehicleMake && vehicleModel && rentalPrice) {
      const newVehicle = {
        id: String(Math.random()),
        imageSource: require('../../../assets/images/offer.png'),
        make: vehicleMake,
        model: vehicleModel,
        type: vehicleType,
        seatingCapacity: seatingCapacity,
        transmission: transmission,
        gas: gasType,
        features: selectedFeatures.join(', '),
        plate: licensePlate,
        description: description,
        rate: `₱${rentalPrice}`,
        deposit: `₱${secDeposit}`,
        status: status, // Include status in the new vehicle object
      };

      navigation.navigate('Vehicles', { newVehicle: newVehicle });
    } else {
      // Handle input validation errors or show a message to the user
    }
  };

  const featuresRows = vehicleFeaturesData.reduce((result, item, index) => {
    if (index % 3 === 0) {
      result.push([]);
    }
    result[result.length - 1].push(item);
    return result;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            {/* Radio buttons for vehicle type */}
            <Text style={styles.featuresLabel}>Vehicle Type:</Text>
          <View style={styles.radioContainer}>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Motorcycle"
                status={vehicleType === 'Motorcycle' ? 'checked' : 'unchecked'}
                onPress={() => setVehicleType('Motorcycle')}
              />
              <Text>Motorcycle</Text>
            </View>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Sedan"
                status={vehicleType === 'Sedan' ? 'checked' : 'unchecked'}
                onPress={() => setVehicleType('Sedan')}
              />
              <Text>Sedan</Text>
            </View>
            <View style={styles.radioGroup}>
              <RadioButton
                value="SUV"
                status={vehicleType === 'SUV' ? 'checked' : 'unchecked'}
                onPress={() => setVehicleType('SUV')}
              />
              <Text>SUV</Text>
            </View>
          </View>
          <View style={styles.radioContainer}>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Pickup"
                status={vehicleType === 'Pickup' ? 'checked' : 'unchecked'}
                onPress={() => setVehicleType('Pickup')}
              />
              <Text>Pickup</Text>
            </View>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Others"
                status={vehicleType === 'Others' ? 'checked' : 'unchecked'}
                onPress={() => setVehicleType('Others')}
              />
              <Text>Others</Text>
            </View>
          </View>
          <Text style={styles.featuresLabel}>Transmission:</Text>
          <View style={styles.radioContainer}>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Manual"
                status={transmission === 'Manual' ? 'checked' : 'unchecked'}
                onPress={() => setTransmission('Manual')}
              />
              <Text>Manual</Text>
            </View>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Automatic"
                status={transmission === 'Automatic' ? 'checked' : 'unchecked'}
                onPress={() => setTransmission('Automatic')}
              />
              <Text>Automatic</Text>
            </View>
          </View>
         {/* Gas Type radio buttons */}
         <Text style={styles.featuresLabel}>Gas Type:</Text>
          <View style={styles.radioContainer}>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Diesel"
                status={gasType === 'Diesel' ? 'checked' : 'unchecked'}
                onPress={() => setGasType('Diesel')}
              />
              <Text>Diesel</Text>
            </View>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Premium"
                status={gasType === 'Premium' ? 'checked' : 'unchecked'}
                onPress={() => setGasType('Premium')}
              />
              <Text>Premium</Text>
            </View>
            <View style={styles.radioGroup}>
              <RadioButton
                value="Unleaded"
                status={gasType === 'Unleaded' ? 'checked' : 'unchecked'}
                onPress={() => setGasType('Unleaded')}
              />
              <Text>Unleaded</Text>
            </View>
          </View>
          {/* Seating capacity picker */}
          <Text style={styles.featuresLabel}>Seating Capacity:</Text>
          <View style={styles.seatingCapacityPicker}>
            <TouchableOpacity onPress={decrementSeatingCapacity} style={styles.seatingCapacityButton}>
              <Text style={styles.seatingCapacityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.seatingCapacityValue}>{seatingCapacity}</Text>
            <TouchableOpacity onPress={incrementSeatingCapacity} style={styles.seatingCapacityButton}>
              <Text style={styles.seatingCapacityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featureContainer}>
            <Text style={styles.featuresLabel}>Vehicle Features:</Text>
            {/* ...other features checkboxes... */}
          </View>
          <TextInput
            style={styles.input}
            placeholder="License Plate"
            placeholderTextColor="#888"
            value={licensePlate}
            onChangeText={(text) => setLicensePlate(text)}
          />
          {/* Multi-line input for vehicle description */}
          <TextInput
            style={[styles.input, styles.multiLineInput]}
            placeholder="Vehicle Description"
            placeholderTextColor="#888"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={4}
          />
          <TextInput
            style={styles.input}
            placeholder="Rental Price per day"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={rentalPrice}
            onChangeText={(text) => handleRentalPriceChange(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Security Deposit"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={secDeposit}
            onChangeText={(text) => handleSecDepositChange(text)}
          />
          {/* Checkbox for enabling the "Add Vehicle" button */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={isChecked ? 'checked' : 'unchecked'}
              onPress={() => setIsChecked(!isChecked)}
            />
            <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
          </View>
          <TouchableOpacity onPress={addVehicleToStore} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Vehicle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
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
  multiLineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  radioContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  featuresLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioGroup: {
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
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seatingCapacityPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatingCapacityButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
  },
  seatingCapacityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seatingCapacityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  featureContainer: {
    marginBottom: 10,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AddVehicleScreen;
