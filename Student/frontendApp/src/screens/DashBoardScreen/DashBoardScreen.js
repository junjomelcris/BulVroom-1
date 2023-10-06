import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Import the getVehicles function from vehicless.js
import { getVehicles } from '../../screens/Vehicles/Vehicless';

const { width, height } = Dimensions.get('window');

const images = [
  require('../../../assets/images/offer.png'),
  require('../../../assets/images/TEST.png'),
  require('../../../assets/images/TEST2.png'),
  // Add more image sources as needed
];

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [prevIsFavorite, setPrevIsFavorite] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [vehicles, setVehicles] = useState([]); // State to store vehicle data

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSlide < images.length - 1) {
        scrollViewRef.current.scrollTo({
          x: (activeSlide + 1) * width,
          animated: true,
        });
        setActiveSlide(activeSlide + 1);
      } else {
        scrollViewRef.current.scrollTo({ x: 0, animated: true });
        setActiveSlide(0);
      }
    }, 5000); // Change image every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [activeSlide]);

  useEffect(() => {
    // Fetch vehicle data when the component mounts
    const fetchedVehicles = getVehicles();
    setVehicles(fetchedVehicles);
  }, []);

  const handleCardPress = (vehicle) => {
    // Navigate to the DashboardVehicles screen and pass the vehicle details
    navigation.navigate('DashboardVehicles', { vehicle });
  };

  const toggleBookmark = (vehicle) => {
    // Check if the vehicle is already bookmarked
    const isBookmarked = vehicle.isBookmarked || false;

    // Toggle the bookmark status
    vehicle.isBookmarked = !isBookmarked;

    // Force re-render by updating the state
    setVehicles([...vehicles]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.ceil(event.nativeEvent.contentOffset.x / width);
          setActiveSlide(slideIndex);
        }}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.pagination}>
            <Image source={image} style={styles.offer} />
          </View>
        ))}
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: -205, }}>
        <TouchableOpacity
          style={
            selectedCategory === 'All'
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => setSelectedCategory('All')}
        >
          <Text style={styles.text}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedCategory === 'Motorcycle'
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => setSelectedCategory('Motorcycle')}
        >
          <Text style={styles.text}>Motorcycle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedCategory === 'Sedan'
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => setSelectedCategory('Sedan')}
        >
          <Text style={styles.text}>Sedan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedCategory === 'SUV'
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => setSelectedCategory('SUV')}
        >
          <Text style={styles.text}>SUV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedCategory === 'Van'
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => setSelectedCategory('Van')}
        >
          <Text style={styles.text}>Van</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedCategory === 'Others'
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => setSelectedCategory('Others')}
        >
          <Text style={styles.text}>Others</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
      <View style={styles.cardContainer}>
        {/* Display your vehicle data here based on the selected category */}
        {vehicles
          .filter((vehicle) => {
            if (selectedCategory === 'All') return true;
            return vehicle.type === selectedCategory;
          })
          .map((vehicle) => (
            <TouchableOpacity
                key={vehicle.id}
                style={styles.cardTouchable}
                onPress={() => handleCardPress(vehicle)}
              >
            <PaperCard key={vehicle.id} style={styles.card}>
            <Image source={require('../../../assets/images/sample.png')} style={styles.VecImage} />
              <Text style={styles.vehicleName}> {vehicle.make} {vehicle.model}</Text>
              <View style={styles.ratings}>
              <Icon name="star" style={styles.star}></Icon>
              <Icon name="star" style={styles.star}></Icon>
              <Icon name="star" style={styles.star}></Icon>
              <Icon name="star" style={styles.star}></Icon>
              <Icon name="star" style={styles.star}></Icon>
              </View>
              <Text style={styles.seater}>{vehicle.seatingCapacity}-Seater</Text>
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
  container: {
    FLEX: 1,
    width: width * 1,
    height: height,
    marginTop: -28,

  },
  ratings: {
    flexDirection: 'row', // Arrange cards horizontally
  },
  saveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  save: {
    marginLeft: 45,
    fontSize: 28,
    color: '#2ecc71'
  },
  price: {
    color: '#2ecc71',
    fontWeight: 800,
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
    width: 130, // Set the width of the image
    height: 110, // Set the height of the image
    marginRight: 10, // Add some margin to separate the image from text
    borderRadius: 15,
  },
  cardTouchable: {
    width: '48%',
    
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
  },
  pagination: {
    width: width,
    paddingTop: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
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
    flexDirection: 'row', // Arrange cards horizontally

    flexWrap: 'wrap', // Wrap cards to the next row when needed

    justifyContent: 'space-evenly',
  },
  activeButton: {
    marginLeft: 10,
    backgroundColor: '#2ecc71',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  inactiveButton: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  offer: {
    width: 360,
    height: 210,
    marginLeft: 15,
    marginTop: -10,
    marginBottom: 10,
    padding: 10,
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
