import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';

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
  const [phonenum, setPhoneNum] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [secDeposit, setSecDeposit] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState('PENDING');
  const [pickupDropoffLocation, setPickupDropoffLocation] = useState('');

  const [vehicleLocation, setVehicleLocation] = useState({
    latitude: 0, // Replace with your default latitude
    longitude: 0, // Replace with your default longitude
  });

  const updateVehicleLocation = (location) => {
    setVehicleLocation(location);
  };

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

  const onBackPressed = () => {
    // Use the navigate method to go back to the previous screen
    navigation.goBack();
  };

  const handleRentalPriceChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setRentalPrice(numericText);
  };

  const handlePhoneNumChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNum(numericText);
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
        phone: phonenum,
        rate: `₱${rentalPrice}`,
        deposit: `₱${secDeposit}`,
        status: status,
      };

      navigation.navigate('Vehicles', { newVehicle: newVehicle });
    } else {
      // Handle input validation errors or show a message to the user
    }
  };

  const renderFeatureCheckboxes = () => {
    return vehicleFeaturesData.map((feature) => (
      <View style={styles.featureRow} key={feature}>
        <Checkbox
          status={selectedFeatures.includes(feature) ? 'checked' : 'unchecked'}
          onPress={() => toggleFeature(feature)}
          color="#2ecc71" // Adjust the color
        />
        <Text style={styles.featureText}>{feature}</Text>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.backIcon}></Icon>
        </TouchableOpacity>
        <View style={styles.titleCenter}>
          <Icon name="car" style={styles.carIcon}></Icon>
          <Text style={styles.titleText}> Add Vehicle</Text>
        </View>
        </View>
        <View style={styles.container}>
        <View style={styles.inputContainer}>
        
        <TouchableOpacity style={styles.imageContainer}>
              <Text style={styles.selectImageText}>Select 5 Photos</Text>
            
          </TouchableOpacity>

          {/* New image container */}
          <View style={styles.newImageContainer}>
   
              <Text style={styles.selectImageText2}>No Images Selected</Text>
            
          </View>
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
            {['Motorcycle', 'Sedan', 'SUV', 'Van', 'Others'].map((type) => (
              <View style={styles.radioGroup} key={type}>
                <RadioButton
                  value={type}
                  status={vehicleType === type ? 'checked' : 'unchecked'}
                  onPress={() => setVehicleType(type)}
                  color="#2ecc71" // Adjust the color
                />
                <Text style={styles.radioText}>{type}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.featuresLabel}>Transmission Type:</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioGroup}>
          <RadioButton
            value="Manual"
            status={transmission === 'Manual' ? 'checked' : 'unchecked'}
            onPress={() => setTransmission('Manual')}
            color="#2ecc71" // Adjust the color
          />
          <Text style={styles.radioText}>Manual</Text>
        </View>
        <View style={styles.radioGroup}>
          <RadioButton
            value="Automatic"
            status={transmission === 'Automatic' ? 'checked' : 'unchecked'}
            onPress={() => setTransmission('Automatic')}
            color="#2ecc71" // Adjust the color
          />
          <Text style={styles.radioText}>Automatic</Text>
        </View>
      </View>
          {/* Gas Type radio buttons */}
          <Text style={styles.featuresLabel}>Gas Type:</Text>
          <View style={styles.radioContainer}>
            {['Diesel', 'Premium', 'Unleaded'].map((type) => (
              <View style={styles.radioGroup} key={type}>
                <RadioButton
                  value={type}
                  status={gasType === type ? 'checked' : 'unchecked'}
                  onPress={() => setGasType(type)}
                  color="#2ecc71" // Adjust the color
                />
                <Text style={styles.radioText}>{type}</Text>
              </View>
            ))}
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
            {renderFeatureCheckboxes()}
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
            placeholder="Pickup/Drop-off Location"
            placeholderTextColor="#888"
            value={pickupDropoffLocation}
            onChangeText={(text) => setPickupDropoffLocation(text)}
          />
            <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={phonenum}
            onChangeText={(text) => handlePhoneNumChange(text)}
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
              color="#2ecc71" // Adjust the color
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
  },
  backIcon: {
    fontSize: 30,
    color: 'white',
  },
  container: {
    padding: 16,
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  selectImageText: {

    marginBottom: -20,
    backgroundColor: 'white', // Background color
    color: 'black',             // Text color
    fontSize: 16,
    padding: 10,                // Add padding for better UI
    borderRadius: 5,            // Add border radius for rounded corners
    textAlign: 'center',        // Center text horizontally
  },
  selectImageText2: {
    marginBottom: 20,
    color: 'black',             // Text color
    fontSize: 16,
    padding: 10,                // Add padding for better UI
    borderRadius: 5,            // Add border radius for rounded corners
    textAlign: 'center',        // Center text horizontally
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
    padding: 8,
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
  backButtonText: {
    fontSize: 18,
    color: '#2ecc71', // Green color
  },
  title: {
    fontSize: 24, // Increase the font size for emphasis
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#2ecc71', // Change the border color
    marginBottom: 20, // Increase the margin for better spacing
    padding: 12, // Increase padding for better readability
    fontSize: 18, // Increase font size for better visibility
  },
  multiLineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  radioContainer: {
    marginBottom: 20,
    flexDirection: 'column', // Display radio buttons in a column
  },
  featuresLabel: {
    fontSize: 18, // Increase font size for better readability
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 20, // Increase padding for better touch target
    paddingVertical: 12, // Increase padding for better touch target
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20, // Increase margin for better spacing
  },
  addButtonText: {
    color: 'white',
    fontSize: 18, // Increase font size for better visibility
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
    fontSize: 18, // Increase font size for better visibility
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  featureContainer: {
    marginBottom: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 18, // Increase font size for better readability
    marginLeft: 10,
  },
});

export default AddVehicleScreen;
