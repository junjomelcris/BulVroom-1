import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
    // Fetch approved vehicle data when the component mounts
    fetchApprovedVehicles();
  }, []);

  // Function to fetch approved vehicles
  const fetchApprovedVehicles = () => {
    axios.get('https://bulvroom.onrender.com/api/approved-vehicles')
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching approved vehicles:', error);
      });
  };

  const handleCardPress = (vehicle) => {
    // Navigate to the DashboardVehicles screen and pass the vehicle details
    navigation.navigate('DashboardVehicles', { vehicle });
  };

  const toggleBookmark = (vehicle) => {
    // Toggle the bookmark status
    vehicle.isBookmarked = !vehicle.isBookmarked;

    // Force re-render by updating the state
    setVehicles([...vehicles]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          {/* Display approved vehicle data here */}
          {vehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={styles.cardTouchable}
              onPress={() => handleCardPress(vehicle)}
            >
              <PaperCard key={vehicle.id} style={styles.card}>
                {/* Replace this with your actual vehicle image */}
                <Image
                  source={require('../../../assets/images/sample.png')}
                  style={styles.VecImage}
                />
                <Text style={styles.vehicleName}>
                  {vehicle.make} {vehicle.model}
                </Text>
                <View style={styles.ratings}>
                  {/* Replace this with your actual rating */}
                  <Icon name="star" style={styles.star}></Icon>
                  <Icon name="star" style={styles.star}></Icon>
                  <Icon name="star" style={styles.star}></Icon>
                  <Icon name="star" style={styles.star}></Icon>
                  <Icon name="star" style={styles.star}></Icon>
                </View>
                <Text style={styles.seater}>
                  {vehicle.seatingCapacity}-Seater
                </Text>
                <View style={styles.saveContainer}>
                  <Text style={styles.price}>{vehicle.rate}/DAY</Text>
                  <TouchableOpacity onPress={() => toggleBookmark(vehicle)}>
                    <Icon
                      name={vehicle.isBookmarked ? 'bookmark' : 'bookmark-outline'}
                      style={styles.save}
                    />
                  </TouchableOpacity>
                </View>
              </PaperCard>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  
  ratings: {
    flexDirection: 'row',
  },
  saveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  save: {
    marginLeft: 45,
    fontSize: 28,
    color: '#2ecc71',
  },
  price: {
    color: '#2ecc71',
    fontWeight: '800',
  },
  star: {
    color: '#FF5733',
    fontSize: 13,
  },
  seater: {
    fontSize: 15,
  },
  vehicleName: {
    color: 'black',
    fontSize: 18,
    marginLeft: -3,
  },
  VecImage: {
    width: 130,
    height: 110,
    marginRight: 10,
    borderRadius: 15,
  },
  cardTouchable: {
    width: '48%',
  },
  scrollView: {
    height: '100%',
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 30,
    marginLeft: -10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: 160,
    elevation: 4,
    marginLeft: 18,
  },
});

export default DashBoardScreen;
