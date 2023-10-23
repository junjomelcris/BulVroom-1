import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { Card, TextInput, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const FilterModal = ({ isVisible, onClose, onApplyFilter, selectedType, selectedComponent }) => {
  const componentOptions = ['All', 'AC'];
  const vehicleTypeOptions = ['All', 'Sedan', 'SUV', 'Van', 'Motorcycle'];

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter by Type and Component</Text>
          <Text style={styles.radioLabel}>Select Vehicle Type:</Text>
          <RadioButton.Group
            onValueChange={onApplyFilter}
            value={selectedType}
          >
            {vehicleTypeOptions.map((option) => (
              <View style={styles.radioGroup} key={option}>
                <Text>{option}</Text>
                <RadioButton value={option} />
              </View>
            ))}
          </RadioButton.Group>
          <Text style={styles.radioLabel}>Select Component:</Text>
          <RadioButton.Group
            onValueChange={onApplyFilter}
            value={selectedComponent}
          >
            {componentOptions.map((option) => (
              <View style={styles.radioGroup} key={option}>
                <Text>{option}</Text>
                <RadioButton value={option} />
              </View>
            ))}
          </RadioButton.Group>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.applyFilterButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const VehicleSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedComponent, setSelectedComponent] = useState('All');

  const handleSearch = () => {
    // Implement your search logic here
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  const handleToggleFilter = () => {
    setIsFilterModalVisible(true);
  };

  const handleApplyFilter = (value) => {
    if (value === 'type') {
      setSelectedType(value);
    } else if (value === 'component') {
      setSelectedComponent(value);
    }
  };

  useEffect(() => {
    // Fetch data based on filters
    // You can make an API request here to retrieve vehicle data
  }, [selectedType, selectedComponent]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.titleCenter}>
          <Icon name="search" style={styles.titleIcon}></Icon>
          <Text style={styles.titleText}>Search Vehicles</Text>
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
      </View>
      <View style={styles.clear}>
        <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFilter} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.vehicleList}>
          {searchResults.map((vehicle) => (
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
        selectedType={selectedType}
        selectedComponent={selectedComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute buttons evenly
    marginTop: 20,

  },
  button: {
    flex: 1, // Each button takes 50% of available width
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 15,

  },
  cancelButton: {

    backgroundColor: '#E6E6E6',
  },
  applyFilterButton: {

    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 19,
  },
  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
  clear: {
    flexDirection: 'row',
  },
  titleCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
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
    
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 140,
    marginLeft: 10,

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
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    justifyContent: 'flex-end', // Align to the bottom
    alignItems: 'center',
  },

  modalContent: {
    height: '70%',
    width: '100%', // Set the width to 100% of the screen width
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  radioLabel: {
    flex: 1,
  },

  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default VehicleSearchScreen;
