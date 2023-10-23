import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const App = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const navigation = useNavigation();
  const handleCardPress = (vehicle) => {
    // Navigate to the DashboardVehicles screen and pass the vehicle details
    navigation.navigate('DashboardVehicles', { vehicle });
  };
  useEffect(() => {
    // Fetch all data from the API
    axios
      .get('https://bulvroom.onrender.com/vehicles')
      .then((response) => {
        const approvedVehicles = response.data.filter((vehicle) => vehicle.status === 'approved');
        setAllData(approvedVehicles);
        setFilteredData(approvedVehicles);
      })
      .catch((error) => console.log(error));
  }, []);
  
  const searchFilter = (text) => {
    setQuery(text); 

    // Filter the data for each input change
    const updatedData = allData.filter((item) => {
      const make = item.make.toLowerCase();
      const model = item.model.toLowerCase();
      const type = item.type.toLowerCase();
      const seatingCapacity = item.seatingCapacity.toString().toLowerCase();
      const transmission = item.transmission.toLowerCase();
      const gas = item.gas.toLowerCase();
      const features = item.features.toLowerCase();
      const textData = text.toLowerCase();

      return (
        make.includes(textData) ||
        model.includes(textData) ||
        type.includes(textData) ||
        seatingCapacity.includes(textData) ||
        transmission.includes(textData) ||
        gas.includes(textData) ||
        features.includes(textData)
      );
    });

    setFilteredData(updatedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={(text) => searchFilter(text)}
          placeholder="Search by make, model, or type..."
        />
      </View>
      <FlatList
  data={filteredData}
  ListEmptyComponent={
    <Text style={styles.emptyText}>No Data Found</Text>
  }
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardPress(item)} // Pass the 'item' as the parameter
    >
      <Image
        source={{ uri: item.vehicle_image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.vehicleInfo}>
        <Text style={styles.makeModelText}>{`${item.make} ${item.model}`}</Text>
        <Text style={styles.typeText}>{`Type: ${item.type}`}</Text>
      </View>
    </TouchableOpacity>
  )}
  keyExtractor={(item) => item.vehicle_id.toString()}
/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  searchBar: {
    backgroundColor: 'white',
    padding: 10,
  },
  searchInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 80,
    height: 50,
    marginRight: 10,
  },
  vehicleInfo: {
    flex: 1,
  },
  makeModelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  typeText: {
    color: 'gray',
  },
  emptyText: {
    alignSelf: 'center',
    marginTop: '80%',
  },
});

export default App;
