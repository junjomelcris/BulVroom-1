import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    userId: null, // Replace with the actual user ID
    make: '',
    model: '',
    type: '',
    vehicle_image: '', // Store the URI of the vehicle image
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
  const [isLoading, setLoading] = useState(false);
  const vehicleFeatures = {
    Motorcycle: ['Cellphone Holder', 'Hazard Light ', 'Fairings', 'Disk Brake', 'ABS', 'Drum Brake', 'Suspension', 'None'],
    Sedan: ['Airconditioned', 'Infotainment System', 'Audio System', 'Keyless Entry and Ignition', 'Sunroof/Moonroof' , 'ABS', 'None'],
    SUV: ['Airconditioned', 'Infotainment System', 'Audio System', 'Keyless Entry and Ignition', 'Sunroof/Moonroof' , 'ABS', 'None'],
    Van: ['Roof Rails','Overhead Bins/Storage','Entertainment Systems','Sliding Doors', 'Rearview Camera', 'Infotainment System', 'None'],
    Others: ['Others', 'None'],
  };
  const vehicleTypes = ['Motorcycle', 'Sedan', 'SUV', 'Van', 'Others'];

  const handleSelectType = (type) => {
    setVehicleData({ ...vehicleData, type });
    setTypeModalVisible(false);
  };

  useEffect(() => {
    const retrieveUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('id');
        if (storedUserId) {
          setVehicleData({ ...vehicleData, userId: storedUserId });
        }
      } catch (error) {
        console.log(error);
      }
    };

    retrieveUserId();
  }, []);

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

  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryPhoto, setGalleryPhoto] = useState(null);

  let options = {
    mediaType: 'mixed',
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };

  const selectImage = async () => {
    const result = await launchImageLibrary(options, (response)=>{
      if (response.didCancel) {
        console.log('Image selection canceled');
      } else if (response.error) {
        console.error('Image selection error: ', response.error);
        // Handle the error appropriately, such as displaying an alert
        alert('Error selecting image');
      } else {
        // Image selected successfully, update the galleryPhoto state
         setGalleryPhoto(response.assets[0].uri);
    console.log(result);
      }
    });
   
  };

  const uploadImageAndAddVehicle = async () => {
    if (
      !vehicleData.make ||
      !vehicleData.model ||
      !vehicleData.type ||
      !vehicleData.plate ||
      !vehicleData.phone ||
      !vehicleData.rate ||
      !vehicleData.deposit ||
      !vehicleData.pickupDropoffLocation
    ) {
      Alert.alert('Missing Information', 'Please fill out all required fields.');
      return;
    }

    setLoading(true);

    if (galleryPhoto) {
      const imagePath = `vehicles/${vehicleData.userId}/${galleryPhoto.filename}`;
      const storageRef = ref(storage, imagePath);

      try {
        const response = await fetch(galleryPhoto);
        const blob = await response.blob();
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed', (snapshot) => {
          // You can add progress handling here
        },
        (error) => {
          console.error('Error uploading image: ', error);
          setLoading(false);
        },
        () => {
          getDownloadURL(storageRef)
            .then((downloadURL) => {
              setVehicleData((prevData) => ({
                ...prevData,
                vehicle_image: downloadURL,
              }));
              console.log('Image uploaded successfully. URL:', downloadURL);
              vehicleData.vehicle_image = downloadURL;
              console.log('Image uploaded successfully. URL:', vehicleData.vehicle_image);
              addVehicle();
            })
            .catch((error) => {
              console.error('Error getting download URL: ', error);
              setLoading(false);
            });
        });
      } catch (error) {
        console.error('Error while processing the image: ', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert('No file selected');
    }
  };

  const validateVehicleData = () => {
    if (!vehicleData.make || !vehicleData.model || !vehicleData.type || !vehicleData.vehicle_image || !vehicleData.plate || !vehicleData.phone || !vehicleData.rate || !vehicleData.deposit || !vehicleData.pickupDropoffLocation) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return false;
    }
    return true;
  };

  const addVehicle = () => {
    fetch('https://bulvroom.onrender.com/createVehicle/app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.Status === 'Success') {
          console.log('Vehicle added successfully');
          Alert.alert(
            'Success',
            'Vehicle added successfully. Please wait 2-3 days to verify your vehicle.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate to the 'Vehicles' screen or any other action
                  console.log('OK Pressed');
                },},]);
          navigation.navigate('Vehicles');
        } else {
          console.error('Error adding vehicle:', data.Message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  };

  const features = vehicleFeatures[vehicleData.type] || [];

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
      <View style={styles.selectedImageContainer}>
        {galleryPhoto && (
          <Image source={{ uri: galleryPhoto }} style={styles.selectedImage} />
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.transmissionButton2,
        ]}
        onPress={selectImage}
      >
        <Text style={styles.buttonText}>Upload Vehicle Image</Text>
      </TouchableOpacity>
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
        {features.map((feature) => (
          <View style={styles.featureRow} key={feature}>
            <Text style={styles.featureText}>{feature}</Text>
            <RadioButton
              value={feature}
              status={
                vehicleData.features.includes(feature) ? 'checked' : 'unchecked'
              }
              onPress={() => handleFeatureToggle(feature)}
              color="green"
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
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={uploadImageAndAddVehicle}>
          <Text style={styles.addButtonLabel}>Add Vehicle</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isLoading} transparent={true}>
        <View style={styles.loadingModal}>
          <ActivityIndicator size="large" color="green" />
          <Text style={styles.loadingText}>Adding Vehicle...</Text>
        </View>
      </Modal>
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  featureText: {
    fontSize: 16,
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
  transmissionButton2: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    backgroundColor: 'gray',
    marginBottom: 16,
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
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  selectedImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText2: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButton: {
    backgroundColor: 'green',
    width: 150,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
});

export default AddVehicle;