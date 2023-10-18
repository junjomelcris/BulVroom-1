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
import Swiper from 'react-native-swiper'; 
import { RefreshControl } from 'react-native';

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vehicles, setVehicles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    // Fetch approved vehicle data when the component mounts
    fetchApprovedVehicles();
  }, []);

  // Function to fetch approved vehicles
  const fetchApprovedVehicles = () => {
    axios
      .get('https://bulvroom.onrender.com/api/approved-vehicles')
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching approved vehicles:', error);
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
  
    // Fetch your data here
    axios
      .get('https://bulvroom.onrender.com/api/approved-vehicles')
      .then((response) => {
        setVehicles(response.data);
        setRefreshing(false); // Set refreshing to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching approved vehicles:', error);
        setRefreshing(false); // Ensure refreshing is set to false even if there's an error
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

  const filterVehicles = (category) => {
    setSelectedCategory(category);
  };

  // Filter vehicles based on selected category
  const filteredVehicles =
    selectedCategory === 'All'
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.type === selectedCategory);

       const renderImage = ({ item }) => (
    <Image source={item.source} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Swiper
        style={styles.imageSlider}
        autoplay={true} // Auto-play enabled
        autoplayTimeout={2000} // Auto-play interval in milliseconds (5 seconds)
        showsPagination={true} // Show pagination dots
        dotStyle={styles.paginationDot}       // Style for inactive dots
       activeDotStyle={styles.activeDot} 
      >
        {/* Replace with your image data */}
        <Image source={require('../../../assets/images/offer.png')} style={styles.image} />
        <Image source={require('../../../assets/images/TEST.png')} style={styles.image} />
        <Image source={require('../../../assets/images/TEST2.png')} style={styles.image} />
        {/* Add more images as needed */}
      </Swiper>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === 'All' && styles.selectedButton,
            ]}
            onPress={() => filterVehicles('All')}
          >
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === 'Motorcycle' && styles.selectedButton,
            ]}
            onPress={() => filterVehicles('Motorcycle')}
          >
            <Text style={styles.buttonText}>Motorcycle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === 'Sedan' && styles.selectedButton,
            ]}
            onPress={() => filterVehicles('Sedan')}
          >
            <Text style={styles.buttonText}>Sedan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === 'SUV' && styles.selectedButton,
            ]}
            onPress={() => filterVehicles('SUV')}
          >
            <Text style={styles.buttonText}>SUV</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === 'Van' && styles.selectedButton,
            ]}
            onPress={() => filterVehicles('Van')}
          >
            <Text style={styles.buttonText}>Van</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === 'Others' && styles.selectedButton,
            ]}
            onPress={() => filterVehicles('Others')}
          >
            <Text style={styles.buttonText}>Others</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          {/* Display filtered vehicle data here */}
          {filteredVehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.vehicle_id}
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
                  <Text style={styles.price}>P{vehicle.rate}/DAY</Text>
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
  imageSlider: {
    height: 230, // Set the desired height of your image slider
    
  },
  image: {
    width: '100%',
    height: '90%',
  },
  paginationDot: {
    width: 10,          // Adjust the width of the inactive dots
    height: 10,         // Adjust the height of the inactive dots
    borderRadius: 5,   // Make the inactive dots circular
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Color of inactive dots
    marginHorizontal: 5, // Spacing between dots
  },
  activeDot: {
    width: 12,          // Adjust the width of the active dot
    height: 12,         // Adjust the height of the active dot
    borderRadius: 6,   // Make the active dot circular
    backgroundColor: 'black', // Color of the active dot
    marginHorizontal: 5, // Spacing between dots
  },
  buttonContainer: {
    marginTop: -15,
    marginLeft: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'space-evenly', 
    
  },
  filterButton: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#ddd',
  },
  selectedButton: {
    backgroundColor: '#2ecc71', // Change to your selected button color
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
  },
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
    marginTop: -10,
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 30,
    marginLeft: -10,
    
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: 65,
    
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
