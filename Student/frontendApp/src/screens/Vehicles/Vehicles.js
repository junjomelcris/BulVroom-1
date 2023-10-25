import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DashboardScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [showPending, setShowPending] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State to manage pull-to-refresh
  const navigation = useNavigation();
  const route = useRoute();
  const newVehicle = route.params?.newVehicle;
  const [userId, setUserId] = useState(null);

  const fetchUserData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('id');
      setUserId(storedId);
      const response = await axios.get(`https://bulvroom.onrender.com/user/${storedId}/vehicles`);
      setCardData(response.data);
    } catch (error) {
      console.log('Failed to fetch user vehicles:', error);
    } finally {
      setRefreshing(false); // Stop the refresh indicator
    }
  };

  const onRefresh = () => {
    setRefreshing(true); // Start the refresh indicator
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const approveVehicle = async (item) => {
    try {
      const response = await axios.put(`https://bulvroom.onrender.com/vehicle/${item.vehicle_id}`, {
        status: 'approved',
      });
      if (response.data.success) {
        Alert.alert('Success', 'The vehicle has been approved.');
        // Refresh the data to reflect the updated status
        fetchUserData();
      } else {
        Alert.alert('Error', 'Failed to approve the vehicle.');
      }
    } catch (error) {
      console.log('Failed to approve the vehicle:', error);
    }
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
      <TouchableOpacity onPress={() => navigation.navigate('AddVehicle')} style={styles.addButton}>
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
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {cardData
          .filter((item) => (showPending ? item.status === 'pending' : item.status === 'approved'))
          .map((item) => (
            <TouchableOpacity key={item.vehicle_id} style={styles.card} onPress={() => navigation.navigate('VehicleDetailsScreen', { car: item })}>
              <View style={styles.row}>
                <Image source={{ uri: item.vehicle_image }} style={styles.VecImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.vehicleTitle}>{item.make} {item.model}</Text>
                  <Text style={styles.vehicleInfo}>Type: {item.type}</Text>
                  <Text style={styles.vehicleInfo}>Rental Price: {item.rate}</Text>
                  <Text style={styles.vehicleStatus}>{item.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

        {cardData
          .filter((item) => (showPending ? item.status === 'pending' : item.status === 'approved'))
          .length === 0 && (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                {showPending ? 'No pending vehicles' : 'No approved vehicles'}
              </Text>
            </View>
          )}
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
    width: 150,
    height: 110,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 30,
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
  noDataContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#555',
  },
});

export default DashboardScreen;
