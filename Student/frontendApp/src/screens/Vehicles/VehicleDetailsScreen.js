import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CarDetailsScreen = ({ route }) => {
  // Get the car data passed as a route parameter
  const navigation = useNavigation();
  const { car } = route.params;

  const initialReviews = [
    {
      id: 1,
      username: 'User1',
      rating: 4.5,
      reviewText: 'Great car! Smooth driving experience.',
    },
    {
      id: 2,
      username: 'User2',
      rating: 5,
      reviewText: 'Excellent car. I loved it!',
    },
    // Add more reviews as needed
  ];

  const [reviews, setReviews] = useState(initialReviews);

  const onBookingsPressed = () => {
    navigation.navigate('RenterBookings');
  };

  const onBackPressed = () => {
    // Use the navigate method to go back to the previous screen
    navigation.goBack();
  };

  const renderReviews = () => {
    return (
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsHeading}>Reviews</Text>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <Text style={styles.reviewUsername}>{review.username}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" style={styles.starIcon} />
              <Text style={styles.reviewRating}>{review.rating}</Text>
            </View>
            <Text style={styles.reviewText}>{review.reviewText}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderAnnouncement = () => {
    return (
      <View style={styles.announcementContainer}>
        <Text style={styles.announcementHeading}>Admin Message</Text>
        <Text style={styles.announcementText}>You need to update your car images because it is up to date! </Text>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.backIcon}></Icon>
        </TouchableOpacity>
        <View style={styles.titleCenter}>
          <Icon name="share-social" style={styles.carIcon}></Icon>
        </View>
      </View>
      <ScrollView style={styles.scroll}>
      <View style={styles.test}>
        <View style={styles.VecImageContainer}>
        <Image source={{ uri: car.vehicle_image }} style={styles.VecImage} />
        </View>
        <View style={styles.row}>
          <Text style={styles.titleText}>{car.make} {car.model}</Text>
          <Text style={styles.vehicleInfo}>{car.status}</Text>
        </View>
        <Text style={styles.vehiclePrice}>{car.rate}/Day</Text>
        {/* Add more car details here */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button1} onPress={onBookingsPressed}>
          <Text style={styles.buttonText}>Bookings</Text>
        </TouchableOpacity>

        {/* Render the reviews section */}
        {renderReviews()}

        {/* Render the announcement section */}
        {renderAnnouncement()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  scroll: {
    paddingHorizontal: 5,
    paddingBottom: 25,
  },
  test: {
    paddingBottom: 50,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button1: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonUpdate: {
    backgroundColor: '#e6941c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  VecImageContainer: {
    width: 350, // Set the width of the container
    height: 180, // Set the height of the container
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
  VecImage: {
    width: 330, // Set the width of the image
    height: 170, // Set the height of the image
    borderRadius: 15,
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
    flex: 1, // Expand and take up available space
    justifyContent: 'flex-end', // Align content to the right
  },
  row: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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
    marginLeft: 150,
    color: '#2ecc71',
  },
  vehiclePrice: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  approveButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
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
  reviewsContainer: {
    margin: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5, // Android only
  },
  reviewsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 15,
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 16,
    color: 'gold',
    marginRight: 5,
  },
  reviewRating: {
    fontSize: 16,
    color: 'gold',
  },
  reviewText: {
    fontSize: 16,
  },
  announcementContainer: {
    margin: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5, // Android only
  },
  announcementHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  announcementText: {
    fontSize: 16,
  },
});

export default CarDetailsScreen;
