import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DashboardScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [showPending, setShowPending] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const newVehicle = route.params?.newVehicle;
  const [userId, setUserId] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/user/${userId}/vehicles`);
      setCardData(response.data);
    } catch (error) {
      console.log('Failed to fetch user vehicles:', error);
    }
  };

  const onRefresh = () => {
    fetchUserData(userId);
  };

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('id');
        setUserId(storedId);
        fetchUserData(storedId);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveData();
  }, []);

  const toggleFavorite = (item, isFavorite) => {
    const updatedCardData = cardData.map((card) =>
      card.id === item.id ? { ...card, isFavorite } : card
    );
    setCardData(updatedCardData);
  };

  const onCarCardPress = (item) => {
    navigation.navigate('VehicleDetailsScreen', { car: item });
  };

  const onAddPress = () => {
    navigation.navigate('AddVehicle');
  };

  const approveVehicle = (item) => {
    item.status = 'APPROVED';
    Alert.alert('Success', 'The vehicle has been approved.');
    const updatedVehicles = cardData.map((vehicle) => {
      if (vehicle.id === item.id) {
        return item;
      }
      return vehicle;
    });
    setCardData(updatedVehicles);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" style={styles.backIcon}></Icon>
        </TouchableOpacity>
        <View style={styles.titleCenter}>
          <Icon name="car" style={styles.carIcon}></Icon>
          <Text style={styles.titleText}>My Vehicles</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Vehicle</Text>
      </TouchableOpacity>
      <View style={styles.filterButtons}>
        <TouchableOpacity
          onPress={() => setShowPending(true)}
          style={[styles.filterButton, showPending && styles.activeFilterButton]}
        >
          <Text style={[styles.filterButtonText, showPending && styles.activeFilterButtonText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowPending(false)}
          style={[styles.filterButton, !showPending && styles.activeFilterButton]}
        >
          <Text style={[styles.filterButtonText, !showPending && styles.activeFilterButtonText]}>Approved</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {cardData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => onCarCardPress(item)}
          >
            <View style={styles.row}>
              <Image source={require('../../../assets/images/sample.png')} style={styles.VecImage} />
              <View style={styles.textContainer}>
                <Text style={styles.vehicleTitle}>{item.make} {item.model}</Text>
                <Text style={styles.vehicleInfo}>Type: {item.type}</Text>
                <Text style={styles.vehicleInfo}>Rental Price: {item.rate}</Text>
                <Text style={styles.vehicleStatus}>{item.status}</Text>
              </View>
            </View>
            {item.status === 'PENDING' && (
              <TouchableOpacity onPress={() => approveVehicle(item)} style={styles.approveButton}>
                <Text style={styles.approveButtonText}>Approve</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  VecImage: {
    width: 150, // Set the width of the image
    height: 110, // Set the height of the image
    marginRight: 10, // Add some margin to separate the image from text
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // To make the text take up the remaining space
    marginLeft: 10, // Add some margin to separate the image from text
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
    flex: 1,
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
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 15,
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
  vehicleStatus: {
    fontSize: 16,
    marginBottom: 4,
    color: '#2ECC71',
  },
  approveButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  approveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButtons: {
    flexDirection: 'row',

    alignSelf: 'flex-start',
  },
  filterButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filterButtonText: {
    fontSize: 16,
    
  },
  activeFilterButton: {
    backgroundColor: '#2ecc71',
  },
  activeFilterButtonText: {
    color: 'white',
  },
});

export default DashboardScreen;
