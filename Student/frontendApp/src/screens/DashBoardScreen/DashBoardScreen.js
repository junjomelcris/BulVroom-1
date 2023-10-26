import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Swiper from 'react-native-swiper'; 
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const DashBoardScreen = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vehicles, setVehicles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarkedVehicles, setBookmarkedVehicles] = useState([]);
  const loadBookmarkedVehicles = async () => {
    try {
      // Load bookmarked vehicle IDs from local storage
      const bookmarks = await AsyncStorage.getItem('bookmarkedVehicles');
      if (bookmarks) {
        const bookmarkedIds = JSON.parse(bookmarks);
        setBookmarkedVehicles(bookmarkedIds);
      }
    } catch (error) {
      console.error('Error loading bookmarked vehicles:', error);
    }
  };
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/user/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.log('Failed to fetch user data:', error);
    }
  };const fetchData = async () => {
    // Fetch dashboard data
    try {
      const response = await axios.get('https://bulvroom.onrender.com/api/approved-vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching approved vehicles:', error);
    }

    // Fetch user data
    if (userId) {
      try {
        const userResponse = await axios.get(`https://bulvroom.onrender.com/user/${userId}`);
        setUserData(userResponse.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
  };
  

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('id');
        const storedUser = await AsyncStorage.getItem('username');
        setUserId(storedId);
        fetchUserData(storedId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApprovedVehicles();
    loadBookmarkedVehicles();
    loadBookmarkedVehicles();
    retrieveData();
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
      }),
      axios
      .get(`https://bulvroom.onrender.com/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setRefreshing(false); // Set refreshing to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching approved vehicles:', error);
        setRefreshing(false); // Ensure refreshing is set to false even if there's an error
      });
  };
  
  const filterVehicles = (category) => {
    setSelectedCategory(category);
  };
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  const handleCardPress = (vehicle) => {
    if (userData) {
      if (userData.status === 'approved') {
        navigation.navigate('DashboardVehicles', { vehicle });
      } else if (userData.status === 'pending') {
        Alert.alert('Approval Pending', 'Your account approval is pending. Please wait for approval.');
      }else{
        Alert.alert('Disapproved User', 'Your account is disapproved. Contact support for more information.');
      }
    }
    return null;// Navigate to the DashboardVehicles screen and pass the vehicle details
    
  };

  const toggleBookmark = async (vehicle) => {
    // Check if the vehicle is bookmarked
    const isBookmarked = bookmarkedVehicles.includes(vehicle.vehicle_id);

    // Send a request to the server to bookmark or unbookmark the vehicle
    if (isBookmarked) {
      // Unbookmark the vehicle
      // Send a DELETE request to your server to remove the bookmark
      await axios.delete(`https://bulvroom.onrender.com/unbookmark-vehicle/${userId}/${vehicle.vehicle_id}`);
    } else {
      // Bookmark the vehicle
      // Send a POST request to your server to add the bookmark
      await axios.post('https://bulvroom.onrender.com/bookmark-vehicle', { userId, vehicleId: vehicle.vehicle_id });
    }

    // Update local state and storage
    if (isBookmarked) {
      // Remove the vehicle ID from the list of bookmarked vehicles
      const updatedBookmarks = bookmarkedVehicles.filter((id) => id !== vehicle.vehicle_id);
      setBookmarkedVehicles(updatedBookmarks);
    } else {
      // Add the vehicle ID to the list of bookmarked vehicles
      const updatedBookmarks = [...bookmarkedVehicles, vehicle.vehicle_id];
      setBookmarkedVehicles(updatedBookmarks);
    }

    // Update local storage with the latest bookmarked vehicle IDs
    await AsyncStorage.setItem('bookmarkedVehicles', JSON.stringify(updatedBookmarks));
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
      <ScrollView ref={scrollViewRef} 
      style={styles.scrollView} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
        {/* Display the vehicle image */}
        <Image source={{ uri: vehicle.vehicle_image }} style={styles.VecImage} />
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
  ))}<TouchableOpacity
  style={styles.scrollToTopButton}
  onPress={scrollToTop}
>
  <Text style={styles.scrollToTopButtonText}>Scroll to Top</Text>
</TouchableOpacity>
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
  scrollToTopButton: {
    position: 'absolute',
    bottom: 30,
    right: '50%', // Center horizontally
    transform: [{ translateX: 70 }], // Adjust this value for horizontal positioning
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 50,
  },
  scrollToTopButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DashBoardScreen;
