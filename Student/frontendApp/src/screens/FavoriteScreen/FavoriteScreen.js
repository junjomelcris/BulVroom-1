import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const FavoriteScreen = ({ bookmarkedVehicles, toggleBookmark }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Vehicles</Text>
      {bookmarkedVehicles && bookmarkedVehicles.length > 0 ? (
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
