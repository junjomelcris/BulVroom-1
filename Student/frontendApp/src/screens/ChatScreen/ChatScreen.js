import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const FilterModal = ({ isVisible, onClose, onApplyFilter }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleApplyFilter = () => {
    onApplyFilter(selectedType);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Filter by Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Sedan" value="Sedan" />
            <Picker.Item label="SUV" value="SUV" />
            {/* Add more options as needed */}
          </Picker>
        </View>
        <TouchableOpacity // Use TouchableOpacity instead of Button
          style={styles.applyFilterButton}
          onPress={handleApplyFilter}
        >
          <Text style={styles.applyFilterButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const VehicleSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleSearch = () => {
    const allVehicles = getVehicles();
    const filteredVehicles = allVehicles.filter(
      (vehicle) =>
        vehicle.make.toLowerCase().includes(searchText.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredVehicles);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setFilterType('');
  };

  const handleToggleFilter = () => {
    setIsFilterModalVisible(true);
  };

  const handleApplyFilter = (type) => {
    setFilterType(type);
  };

  const filteredSearchResults = searchResults.filter((vehicle) => {
    if (!filterType || filterType === '') {
      return true;
    }
    return vehicle.type === filterType;
  });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.titleCenter}>
            <Icon name="search" style={styles.titleIcon}></Icon>
            <Text style={styles.titleText}>Search Vehicles</Text>
          </View>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          label="Search"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFilter} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.vehicleList}>
          {filteredSearchResults.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              onPress={() => {
                // Implement navigation to the vehicle details screen
              }}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.cardMakeModel}>{`${vehicle.make} ${vehicle.model}`}</Text>
                  <Text style={styles.cardYear}>{`Year: ${vehicle.year}`}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApplyFilter={handleApplyFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    color: 'black',
    fontSize: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleIcon: {
    fontSize: 30,
    color: 'black',
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: 20,
  },
  vehicleList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 35,
    paddingBottom: 15,
  },
  card: {
    width: width - 32,
    elevation: 3,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardMakeModel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardYear: {
    fontSize: 16,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default VehicleSearchScreen;
