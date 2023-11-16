import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceholderCard = () => (
  <View style={styles.placeholderCard}>
    <View style={styles.placeholderImage} />
    <View style={styles.placeholderText} />
  </View>
);

const DashBoardScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vehicles, setVehicles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bgColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchApprovedVehicles();
    loadBookmarkedVehicles();
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
    retrieveData();
  }, []);

  const fetchApprovedVehicles = () => {
    setLoading(true);
    axios
      .get('https://bulvroom.onrender.com/api/approved-vehicles')
      .then((response) => {
        setVehicles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching approved vehicles:', error);
        setLoading(true);
      });
  };

  const loadBookmarkedVehicles = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarkedVehicles');
      console.log('Bookmarks:', bookmarks);
      if (bookmarks) {
        const bookmarkedIds = JSON.parse(bookmarks);
        console.log('Bookmarked IDs:', bookmarkedIds);
        const updatedVehicles = vehicles.map((vehicle) => ({
          ...vehicle,
          isBookmarked: bookmarkedIds.includes(vehicle.vehicle_id),
        }));
        setVehicles(updatedVehicles);
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
  };

  const onRefresh = () => {
    setRefreshing(true);
    axios
      .get(`https://bulvroom.onrender.com/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error('Error fetching approved vehicles:', error);
        setRefreshing(false);
      });

    axios
      .get('https://bulvroom.onrender.com/api/approved-vehicles')
      .then((response) => {
        setVehicles(response.data);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error('Error fetching approved vehicles:', error);
        setRefreshing(false);
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
    navigation.navigate('DashboardVehicles', { vehicle });
  };

  const toggleBookmark = async (vehicle) => {
    const updatedVehicles = vehicles.map((v) => {
      if (v.vehicle_id === vehicle.vehicle_id) {
        v.isBookmarked = !v.isBookmarked;
      }
      return v;
    });
    setVehicles(updatedVehicles);

    const bookmarkedIds = updatedVehicles
      .filter((v) => v.isBookmarked)
      .map((v) => v.vehicle_id);
    await AsyncStorage.setItem('bookmarkedVehicles', JSON.stringify(bookmarkedIds));
  };

  const filteredVehicles =
    selectedCategory === 'All'
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.type === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          showsPagination={true}
          autoplay={true}
          autoplayTimeout={2000}
          loop={true}
          dotStyle={styles.paginationDot}
          activeDotStyle={styles.activeDot}
        >
          <Image source={require('../../../assets/images/offer.png')} style={styles.image} />
          <Image source={require('../../../assets/images/TEST.png')} style={styles.image} />
          <Image source={require('../../../assets/images/TEST2.png')} style={styles.image} />
        </Swiper>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedCategory === 'All' && styles.selectedButton]}
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
            style={[styles.filterButton, selectedCategory === 'Sedan' && styles.selectedButton]}
            onPress={() => filterVehicles('Sedan')}
          >
            <Text style={styles.buttonText}>Sedan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedCategory === 'SUV' && styles.selectedButton]}
            onPress={() => filterVehicles('SUV')}
          >
            <Text style={styles.buttonText}>SUV</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedCategory === 'Van' && styles.selectedButton]}
            onPress={() => filterVehicles('Van')}
          >
            <Text style={styles.buttonText}>Van</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedCategory === 'Others' && styles.selectedButton]}
            onPress={() => filterVehicles('Others')}
          >
            <Text style={styles.buttonText}>Others</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
         <View style={styles.cardContainer}>
         <PlaceholderCard />
         <PlaceholderCard />
         <PlaceholderCard />
         <PlaceholderCard />
         <PlaceholderCard />
         <PlaceholderCard />
       </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: fadeAnim } } }],
            { useNativeDriver: false }
          )}
        >
          <View style={styles.cardContainer}>
            {filteredVehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.vehicle_id}
                style={styles.cardTouchable}
                onPress={() => {
                  if (userData && userData.status === 'approved') {
                    handleCardPress(vehicle);
                  } else {
                    console.log('User Status:', userData?.status);
                    Alert.alert(
                      'Not Approved',
                      'You are not approved to view this vehicle. Please check your profile and make sure it is approved.',
                      [
                        {
                          text: 'OK',
                          onPress: () => console.log('OK Pressed'),
                        },
                      ]
                    );
                  }
                }}
              >
                <PaperCard key={vehicle.id} style={styles.card}>
                <Image source={{ uri: vehicle.vehicle_image }} style={styles.VecImage} />
                <Text style={styles.vehicleName}>
                  {vehicle.make} {vehicle.model}
                </Text>
                <View style={styles.ratings}>
                  <Icon name="star" style={styles.star}></Icon>
                  <Icon name="star" style={styles.star}></Icon>
                  <Icon name="star" style={styles.star}></Icon>
                  <Icon name="star" style={styles.star}></Icon>
                  <Icon name="star" style={styles.star}></Icon>
                </View>
                <Text style={styles.seater}>{vehicle.seatingCapacity}-Seater</Text>
                <View style={styles.saveContainer}>
                  <Text style={styles.price}>P{vehicle.rate}/DAY</Text>
                </View>
              </PaperCard>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      <Animated.View
        style={[
          styles.scrollToTopButton,
          {
            opacity: fadeAnim,
            backgroundColor: bgColorAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(46, 204, 113, 1)', 'rgba(46, 204, 113, 0.8)'],
            }),
          },
        ]}
      >
        <TouchableOpacity onPress={scrollToTop}>
          <Text style={styles.scrollToTopButtonText}>
            <Icon name="arrow-up" color="white" size={24} />
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '102%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)', 
    // Transparent background
  },
  swiperContainer: {
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
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
    
    elevation: 9,
  },
  selectedButton: {
    backgroundColor: '#2ecc71',
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
    marginBottom: 30,
    paddingTop: 10,
    marginLeft: -10,
  },
  cardContainer: {
    height: '100%',
    width: '100%',
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
    elevation: 9,
    marginLeft: 18,
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    opacity: 0.5,
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 50,
    elevation: 6,
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  scrollToTopButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  placeholderCard: {
    backgroundColor: '#ddd', // Placeholder background color
    borderRadius: 8, // Placeholder border radius
    padding: 16, // Placeholder padding
    marginBottom: 16, // Placeholder margin bottom
    width: 160, // Placeholder width
    elevation: 9, // Margin for spacing between cards
  },
  placeholderImage: {
    width: '100%', // Image width
    height: 110, // Image height
    backgroundColor: '#ccc', // Image placeholder color
    borderRadius: 15, // Image border radius
    marginBottom: 8, // Margin bottom for spacing
  },
  placeholderText: {
    width: '70%', // Text width
    height: 16, // Text height
    backgroundColor: '#ccc', // Text placeholder color
    borderRadius: 4, // Text border radius
    marginBottom: 8, // Margin bottom for spacing
  },
});

export default DashBoardScreen;
