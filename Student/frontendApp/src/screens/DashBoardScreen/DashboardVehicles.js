import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card as PaperCard } from 'react-native-paper';

const DashboardVehicles = ({ route }) => {
  const { vehicle } = route.params;
  const navigation = useNavigation();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  const openMessagingApp = () => {
    const recipientNumber = `${vehicle.phonenum}`;
    const messageBody = `I'm Interested in renting your vehicle: ${vehicle.make} ${vehicle.model}`;
    Linking.openURL(`sms:${recipientNumber}?body=${encodeURIComponent(messageBody)}`);
  };
  
  
  
  const openCallingApp = () => {
    const phoneNumber = vehicle.phonenum; // Assuming that vehicle.deposit contains the phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };
  

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.backIcon}></Icon>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
         <TouchableOpacity onPress={toggleModal} style={styles.keyImageContainer}>
          <Image
            source={require('../../../assets/images/sample.png')}
            style={styles.KeyImage}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity onPress={toggleModal} style={styles.modalContent}>
              <Image
                source={require('../../../assets/images/sample.png')}
                style={styles.fullSizeImage}
              />
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.title}>
          <Text style={styles.heading}>
            {vehicle.make} {vehicle.model}
          </Text>
          <Text style={styles.pricing}>{vehicle.rate}/Day</Text>
        </View>
        <Text style={styles.renter}>Renter</Text>
        <View style={styles.renterDetails}>
  <Icon name="person-circle-outline" style={styles.profile} />
  <Text style={styles.RenterName}>Cristian Louie Concepcion</Text>
  <TouchableOpacity onPress={() => openMessagingApp()}>
    <Icon name="chatbubble-ellipses-outline" style={styles.msg} />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => openCallingApp()}>
    <Icon name="call-outline" style={styles.call} />
  </TouchableOpacity>
</View>

        <View style={styles.detailsRow}>
          <PaperCard style={styles.vehicleDetailsCard}>
            <View style={styles.vehicleDetailsInner}>
              <Icon name="car-sport" style={styles.vehicleDetailValue}></Icon>
              <Text>{vehicle.type}</Text>
            </View>
          </PaperCard>
          <PaperCard style={styles.vehicleDetailsCard}>
            <View style={styles.vehicleDetailsInner}>
              <Icon name="cog" style={styles.vehicleDetailValue}></Icon>
              <Text>{vehicle.transmission}</Text>
            </View>
          </PaperCard>
          <PaperCard style={styles.vehicleDetailsCard}>
            <View style={styles.vehicleDetailsInner}>
              <Icon name="water" style={styles.vehicleDetailValue}></Icon>
              <Text>{vehicle.gas}</Text>
            </View>
          </PaperCard>
        </View>

        <Text style={styles.head}>Features:</Text>
        <Text>{vehicle.features}</Text>
        <Text style={styles.head}>Seating Capacity</Text>
        <Text>{vehicle.seatingCapacity} seater</Text>
        <Text style={styles.head}>Plate Number</Text>
        <Text>{vehicle.plate}</Text>
        <Text style={styles.head}>Description</Text>
{isDescriptionExpanded ? (
  <>
    <Text>{vehicle.description}</Text>
    <View style={styles.see}>
      <TouchableOpacity onPress={toggleDescription}>
        <Text style={styles.showLess}>Show Less</Text>
      </TouchableOpacity>
    </View>
  </>
) : (
  <>
    <Text numberOfLines={3}>{vehicle.description}</Text>
    <View style={styles.see}>
      <TouchableOpacity onPress={toggleDescription}>
        <Text style={styles.seeMore}>See More</Text>
      </TouchableOpacity>
    </View>
  </>
)}
        <Text style={styles.head}>Security Deposit</Text>
        <Text>{vehicle.deposit}</Text>
        <Text style={styles.head}>More pictures</Text>
        <View style={styles.contain}>
      <View style={styles.collage}>
      <TouchableOpacity onPress={toggleModal} style={styles.keyImageContainer}>
        <Image
          source={require('../../../assets/images/sample.png')}
          style={styles.pics}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal} style={styles.keyImageContainer}>
        <Image
          source={require('../../../assets/images/sample.png')}
          style={styles.pics}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal} style={styles.keyImageContainer}>
        <Image
          source={require('../../../assets/images/sample.png')}
          style={styles.pics}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal} style={styles.keyImageContainer}>
        <Image
          source={require('../../../assets/images/sample.png')}
          style={styles.pics}
        />
        </TouchableOpacity>
      </View>
    </View>
      </ScrollView>
      <View style={styles.booknow}>
  <TouchableOpacity>
    <View style={styles.titleCenter}>
      <Text style={styles.titleText}>Book Now</Text>
    </View>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  // Style for the modal content
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Style for the full-size image in the modal
  fullSizeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  head: {
    fontSize: 20,
    fontWeight: '600',
    color: '#04AD4C',
  },
  titleCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vehicleDetailsCard: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  vehicleDetailsInner: {
    alignItems: 'center',
  },
  vehicleDetailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleDetailValue: {
    fontSize: 30,
  },
  title: {
    flexDirection: 'row',
  },
  renter: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  msg: {
    marginLeft: 16,
    fontSize: 25,
    color: '#04AD4C',
    fontWeight: '500',
  },
  call: {
    marginLeft: 6,
    fontSize: 25,
    color: '#04AD4C',
    fontWeight: '500',
  },
  see: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    fontWeight: 600,
  },
  RenterName: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  profile: {
    fontSize: 40,
    fontWeight: '500',
    color: 'black',
  },
  renterDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  pricing: {
    marginTop: 3,
    marginLeft: 85,
    fontSize: 19,
    color: '#04AD4C',
    fontWeight: 600,
  },
  titleBar: {
    flexDirection: 'row',
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: -30,
    marginTop: -17,
  },
  booknow: {
    flexDirection: 'row',
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: -30,
    marginTop: -50,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  KeyImage: {
    marginTop: 10,
    width: 335,
    height: 210,
    marginLeft: -3,
    borderRadius: 15,
  },
  contain: {
    flex: 1,
    flexDirection: 'column', // Arrange items vertically
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  collage: {
    flexDirection: 'row', // Arrange images horizontally
    flexWrap: 'wrap', // Wrap cards to the next row when needed
    justifyContent: 'space-evenly',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items horizontally
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    fontSize: 30,
    color: 'white',
  },
  pics: {
    borderRadius: 10,
    marginBottom: 5,
    width: 157, // Set the width of each image
    height: 100, // Set the height of each image
    marginHorizontal: 2.5,
  },
  backIcon: {
    fontSize: 30,
    color: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  scrollContainer: {
    marginBottom: 50,
  },
  seeMore: {
    color: '#04AD4C',
    textDecorationLine: 'underline',
  },
  showLess: {
    color: '#04AD4C',
    textDecorationLine: 'underline',
  },
});

export default DashboardVehicles;