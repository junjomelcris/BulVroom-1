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
import { Linking } from 'react-native';

// Import the getVehicles function from vehicless.js
import { getVehicles } from '../../screens/Vehicles/Vehicless';

const { width, height } = Dimensions.get('window');

const images = [
  require('../../../assets/images/offer.png'),
  require('../../../assets/images/luwi.jpg'),
  require('../../../assets/images/eltom.jpg'),
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: -225, }}>
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
        {/* Display your vehicle data here based on the selected category */}
        {vehicles
          .filter((vehicle) => {
            if (selectedCategory === 'All') return true;
            return vehicle.type === selectedCategory;
          })
          .map((vehicle) => (
            <PaperCard key={vehicle.id} style={styles.card}>
              <Text>Make: {vehicle.make}</Text>
              <Text>Model: {vehicle.model}</Text>
              <Text>Type: {vehicle.type}</Text>
              <Text>Features: {vehicle.features}</Text>
              <Text>License Plate: {vehicle.plate}</Text>
              <Text>Description: {vehicle.description}</Text>
              <Text>Rental Price: {vehicle.rate}</Text>
            </PaperCard>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 1,
    height: height,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
  },
  pagination: {
    width: width,
    margin: 5,
    alignItems: 'center',
  },
  scrollView: {
    height: '100%',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 30,
    marginLeft: -10,
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
    elevation: 4,
  },
});

export default DashBoardScreen;
