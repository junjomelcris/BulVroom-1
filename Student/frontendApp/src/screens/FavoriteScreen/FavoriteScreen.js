import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios to fetch vehicle data

const FavoriteScreen = ({ toggleBookmark }) => {
  const [bookmarkedVehicleIds, setBookmarkedVehicleIds] = useState([]);
  const [bookmarkedVehicles, setBookmarkedVehicles] = useState([]);

  useEffect(() => {
    // Load bookmarked vehicle IDs from AsyncStorage
    loadBookmarkedVehicleIds();
  }, []);

  // Load bookmarked vehicle IDs from AsyncStorage
  const loadBookmarkedVehicleIds = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarkedVehicles');
      if (bookmarks) {
        const bookmarkedIds = JSON.parse(bookmarks);
        setBookmarkedVehicleIds(bookmarkedIds);
        
        // Fetch vehicle data from your API using axios
        axios.get('https://bulvroom.onrender.com/api/approved-vehicles')
          .then(response => {
            const vehicles = response.data;
            // Filter vehicles that have matching IDs with bookmarkedVehicleIds
            const storedBookmarkedVehicles = vehicles.filter(vehicle =>
              bookmarkedIds.includes(vehicle.vehicle_id)
            );
            setBookmarkedVehicles(storedBookmarkedVehicles);
          })
          .catch(error => {
            console.error('Error fetching approved vehicles:', error);
          });
      }
    } catch (error) {
      console.error('Error loading bookmarked vehicles from AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Vehicles</Text>
      {bookmarkedVehicles.length > 0 ? (
        <FlatList
          data={bookmarkedVehicles}
          keyExtractor={(item) => item.vehicle_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.vehicleCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.vehicleImage} />
              <View style={styles.vehicleDetails}>
                <Text style={styles.vehicleName}>
                  {item.make} {item.model}
                </Text>
                <Text style={styles.vehicleRate}>${item.rate}/Day</Text>
                <TouchableOpacity onPress={() => toggleBookmark(item)}>
                  <Text style={styles.removeButton}>Remove from Favorites</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No favorite vehicles yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  vehicleCard: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 5,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '900',
  },
  vehicleRate: {
    fontSize: 16,
    color: '#04AD4C',
    fontWeight: '600',
  },
  removeButton: {
    color: '#FF5733',
    textDecorationLine: 'underline',
  },
});

export default FavoriteScreen;
