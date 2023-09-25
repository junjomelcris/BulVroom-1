import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MyComponent = ({ imageSource, label, label2, rate, make, model, type, features, plate, description, rentalPrice, itemData, onToggleFavorite, modalData }) => {
  return (
    <View style={styles.contain}>
      <View style={styles.centered}>
        <PaperCard style={styles.card}>
          <View style={styles.fave}>
            <Image source={imageSource} style={styles.image} />

            {/* Container for text elements */}
            <View style={styles.textContainer}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.label2}>{label2}</Text>
              <Text style={styles.rate}>{rate}/ Day</Text>

              {/* Display additional details */}
              <Text style={styles.makeModel}>{make} {model}</Text>
              <Text style={styles.type}>{type}</Text>
              <Text style={styles.features}>{features}</Text>
              <Text style={styles.plate}>{plate}</Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.rentalPrice}>{rentalPrice}</Text>
              {modalData && (
                <View>
                  <Text style={styles.modalLabel}>Added Vehicle:</Text>
                  <Text style={styles.modalDataLabel}>{modalData.make} {modalData.model}</Text>
                  <Text style={styles.modalDataLabel}>{modalData.type}</Text>
                  <Text style={styles.modalDataLabel}>{modalData.features}</Text>
                  <Text style={styles.modalDataLabel}>{modalData.plate}</Text>
                  <Text style={styles.modalDataLabel}>{modalData.description}</Text>
                  <Text style={styles.modalDataLabel}>{modalData.rate}</Text>
                </View>
              )}
            </View>
          </View>
        </PaperCard>
      </View>
    </View>
  );
};

const DashBoardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddVehicleModalVisible, setAddVehicleModalVisible] = useState(false); // State to control the modal visibility
  const [vehicleMake, setVehicleMake] = useState(''); // State to store vehicle make
  const [vehicleModel, setVehicleModel] = useState(''); // State to store vehicle model
  const [vehicleType, setVehicleType] = useState(''); // State to store vehicle type
  const [vehicleFeatures, setVehicleFeatures] = useState(''); // State to store vehicle features
  const [licensePlate, setLicensePlate] = useState(''); // State to store license plate
  const [description, setDescription] = useState(''); // State to store vehicle description
  const [rentalPrice, setRentalPrice] = useState(''); // State to store rental price
  const [modalInputData, setModalInputData] = useState(null); // State to store input data in the modal
  const [cardData, setCardData] = useState([]);

  const onChangeSearch = (query) => setSearchQuery(query);
  const navigation = useNavigation();

  const toggleFavorite = (item, isFavorite) => {
    const updatedCardData = cardData.map((card) =>
      card.id === item.id ? { ...card, isFavorite } : card
    );
    setCardData(updatedCardData);
  };

  const myComponents = cardData.map((item) => (
    <MyComponent
      key={item.id}
      imageSource={item.imageSource}
      label={item.label}
      label2={item.label2}
      rate={item.rate}
      make={item.make}
      model={item.model}
      type={item.type}
      features={item.features}
      plate={item.plate}
      description={item.description}
      rentalPrice={item.rentalPrice}
      itemData={item}
      onToggleFavorite={toggleFavorite}
      modalData={modalInputData} // Pass modal input data to MyComponent
    />
  ));

  const vehicleCards = cardData.map((item) => (
    <View key={item.id} style={styles.cardContainer}>
      <MyComponent
        imageSource={item.imageSource}
        label={item.label}
        label2={item.label2}
        rate={item.rate}
        make={item.make}
        model={item.model}
        type={item.type}
        features={item.features}
        plate={item.plate}
        description={item.description}
        rentalPrice={item.rentalPrice}
        itemData={item}
        onToggleFavorite={toggleFavorite}
        modalData={modalInputData} // Pass modal input data to MyComponent
      />
<View style={styles.contaier}>
  {/* Your item content here */}
  <View style={styles.deleteContainer}>
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={this.handleDelete}
      style={styles.touchableButton}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
</View>
    </View>
  ));

  const onAddVehiclePress = () => {
    // Show the Add Vehicle modal
    setAddVehicleModalVisible(true);
  };

  const onCloseModal = () => {
    // Close the Add Vehicle modal and reset input fields
    setAddVehicleModalVisible(false);
    setVehicleMake('');
    setVehicleModel('');
    setVehicleType('');
    setVehicleFeatures('');
    setLicensePlate('');
    setDescription('');
    setRentalPrice('');
    setModalInputData(null);
  };

  const onAddPress = () => {
    // Add the vehicle to the cardData array and close the modal
    if (vehicleMake && vehicleModel && rentalPrice) {
      const newVehicle = {
        id: String(cardData.length + 1),
        imageSource: require('../../../assets/images/default_vehicle.jpg'),
        make: vehicleMake,
        model: vehicleModel,
        type: vehicleType,
        features: vehicleFeatures,
        plate: licensePlate,
        description: description,
        rate: `₱${rentalPrice}`,
      };
      setCardData([...cardData, newVehicle]);
      setModalInputData(newVehicle); // Set the inputted data for displaying in the modal
      onCloseModal();
    }
  };

  const onBackPressed = () => {
    // Use the navigate method to go to the 'Profile' screen
    navigation.navigate('Homes');
  };

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
      <ScrollView style={styles.scrollView}>
        {/* Add Vehicle Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onAddVehiclePress} style={styles.addVehicleButton}>
            <Text style={styles.addVehicleButtonText}>Add Vehicle</Text>
          </TouchableOpacity>
        </View>
        {vehicleCards}
      </ScrollView>

      {/* Add Vehicle Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddVehicleModalVisible}
        onRequestClose={onCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a Vehicle</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Vehicle Make"
              placeholderTextColor="#888"
              value={vehicleMake}
              onChangeText={(text) => setVehicleMake(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Vehicle Model"
              placeholderTextColor="#888"
              value={vehicleModel}
              onChangeText={(text) => setVehicleModel(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Vehicle Type"
              placeholderTextColor="#888"
              value={vehicleType}
              onChangeText={(text) => setVehicleType(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Vehicle Features"
              placeholderTextColor="#888"
              value={vehicleFeatures}
              onChangeText={(text) => setVehicleFeatures(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="License Plate"
              placeholderTextColor="#888"
              value={licensePlate}
              onChangeText={(text) => setLicensePlate(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Description"
              placeholderTextColor="#888"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Rental Price"
              placeholderTextColor="#888"
              value={rentalPrice}
              onChangeText={(text) => setRentalPrice(text)}
            />
            {modalInputData && (
              <View>
                <Text style={styles.modalLabel}>Added Vehicle:</Text>
                <Text style={styles.modalDataLabel}>{modalInputData.make} {modalInputData.model}</Text>
                <Text style={styles.modalDataLabel}>{modalInputData.type}</Text>
                <Text style={styles.modalDataLabel}>{modalInputData.features}</Text>
                <Text style={styles.modalDataLabel}>{modalInputData.plate}</Text>
                <Text style={styles.modalDataLabel}>{modalInputData.description}</Text>
                <Text style={styles.modalDataLabel}>{modalInputData.rate}</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCloseModal} style={styles.closeButton}>
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 1,
    height: height,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  contaier: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-end',
    borderColor: '#ccc',
  },
  deleteContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end', // Align to the right side
    marginRight: 15, // Adjust margin as needed
    elevation: 2, // Add shadow for Android
    shadowColor: 'black', // Add shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  touchableButton: {
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalDataLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalInputContainer: {
    marginBottom: 20,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderColor: '#888',
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  closeModalButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 115,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
  },
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    height: '100%',
    width: '100%', // Occupy the entire width
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Position button at the right
    marginHorizontal: 10, // Adjust margin as needed
  },
  imageContainer: {
    width: '93%', // Occupy the entire width
    margin: 5,
    alignItems: 'center', // Center the image horizontally
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontWeight: '800',
  },
  textContainer: {
    marginTop: -40,
    flexDirection: 'column',
    // Add any other styles you need for spacing, alignment, etc.
  },
  title2: {
    fontSize: 30,
    color: 'white', // Adjust the color as needed
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Adjust the color as needed
  },
  fave: {
    flexDirection: 'row',
    marginRight: 15,
  },
  label2: {
    fontSize: 16,
  },
  titleCenter: {
    flex: 1, // This allows the center content to take up available space
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
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
    color: 'white', // Adjust the color as needed
  },
  rate: {
    fontSize: 15,
    color: '#1b944e',
    fontWeight: '800',
  },
  card: {
    marginBottom: 10,
  },
  cardContainer: {

  },
  centered: {
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  icons: {
    fontSize: 30,
  },
  image: {
    marginRight: 10,
    width: 210,
    height: 138,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  addVehicleButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 35,
  },
  addVehicleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashBoardScreen;