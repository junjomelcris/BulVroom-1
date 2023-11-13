import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Alert,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/bulv.png';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [milestones, setMilestones] = useState([]);

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
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/user/${userId}`);
      setUserData(response.data);
      checkMilestones(response.data);
    } catch (error) {
      console.log('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
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

  const handleLogout = async () => {
    const confirmLogout = () => {
      Alert.alert(
        'Log Out',
        'Are you sure you want to log out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Log Out',
            onPress: async () => {
              try {
                await AsyncStorage.clear();
                navigation.navigate('SignIn');
              } catch (error) {
                console.error('Error logging out:', error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };

    confirmLogout();
  };

  const onNotifPressed = () => {
    navigation.navigate('NotifScreen');
  };

  const onRatesPressed = () => {
    navigation.navigate('Rates');
  };

  const onEditPressed = () => {
    navigation.navigate('Edit');
  };

  const onAddVehicle = () => {
    navigation.navigate('Vehicles');
  };

  const renderStatusIcon = () => {
    if (userData) {
      if (userData.status === 'approved') {
        return (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="checkmark-circle" style={{ fontSize: 17, color: '#1b944e' }} />
              <Text style={{ fontSize: 17, color: '#1b944e', textDecorationLine: 'underline' }}>
                {userData.status}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else if (userData.status === 'disapproved') {
        return (
          <TouchableOpacity onPress={() => showDisapprovedInstructions()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="close-circle" style={{ fontSize: 17, color: 'red' }} />
              <Text style={{ fontSize: 17, color: 'red', textDecorationLine: 'underline' }}>
                {userData.status}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else if (userData.status === 'pending') {
        return (
          <TouchableOpacity onPress={() => showPendingInstructions()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="hourglass-outline" style={{ fontSize: 17, color: 'orange' }} />
              <Text style={{ fontSize: 17, color: 'orange', textDecorationLine: 'underline' }}>
                {userData.status}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    }
    return null;
  };

  const showPendingInstructions = () => {
    Alert.alert(
      'Pending Approval',
      'Your profile is pending approval. To expedite the process, please edit your profile and upload any valid ID and driver\'s license.',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ]
    );
  };

  const showDisapprovedInstructions = () => {
    Alert.alert(
      'Disapproved Profile',
      'Your profile has been disapproved. Please ensure that the uploaded ID and driver\'s license information matches your inputted name, and make sure also the your drivers license is valid.',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ]
    );
  };

  const checkMilestones = (userData) => {
    // You can customize this logic based on your actual milestones and user data
    const userMilestones = [];

    if (userData.profile_pic) {
      userMilestones.push('ID Uploaded');
    }

    if (userData.id_document && userData.driver_license) {
      userMilestones.push('ID and Driver\'s License Uploaded');
    }

    setMilestones(userMilestones);
  };

  const MyComponent = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Image style={styles.Logo1} source={Logo} />
        <TouchableOpacity onPress={onAddVehicle}>
          <View style={styles.itemContainer}>
            <Icon name="car-outline" style={styles.icon} />
            <Text style={styles.itemText}>MY VEHICLES</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={onNotifPressed}>
          <View style={styles.itemContainer}>
            <Icon name="notifications-outline" style={styles.icon} />
            <Text style={styles.itemText}>NOTIFICATIONS</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity>
          <View style={styles.itemContainer}>
            <Icon name="newspaper-outline" style={styles.icon} />
            <Text style={styles.itemText}>POLICIES</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity>
          <View style={styles.itemContainer}>
            <Icon name="newspaper-outline" style={styles.icon} />
            <Text style={styles.itemText}>LEGAL</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={onRatesPressed}>
          <View style={styles.itemContainer}>
            <Icon name="cash-outline" style={styles.icon} />
            <Text style={styles.itemText}>RATES</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonContainer}>
          <CustomButton mode="elevated" text="Log Out" />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView
      style={styles.root}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={{ width: width * 1, marginTop: 20, margin: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={userData && userData.profile_pic ? { uri: userData.profile_pic } : require('../../../assets/images/bulv.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            {renderStatusIcon()}
            <Text style={{ color: 'black', fontSize: 20 }}>
              {userData ? userData.fName + ' ' + userData.lName : 'Loading...'}
            </Text>
            <TouchableOpacity onPress={onEditPressed}>
              <Text style={{ color: '#1b944e', fontSize: 13, textDecorationLine: 'underline' }}>
                View and Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line1} />
        <View style={{ marginRight: 20, marginTop: 10 }}>
          <MyComponent />
        </View>
      </View>

      {/* Modal for Milestones */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Milestones</Text>
            {milestones.map((milestone, index) => (
              <Text key={index} style={styles.milestoneText}>{milestone}</Text>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  Logo1: {
    position: 'absolute',
    marginLeft: -70,
    width: 450,
    height: 280,
    opacity: 0.2,
  },
  root: {
    height: height,
  },
  line1: {
    marginTop: 10,
    marginLeft: -10,
    flex: 1,
    borderBottomWidth: 2.5,
    borderBottomColor: 'black',
  },
  card: {
    marginTop: 50,
    backgroundColor: 'rgba(46, 204, 113, 0.9)',
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 30,
    color: 'black',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  logoutButtonContainer: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  image: {
    width: 120 / 2,  // Set both width and height to the same value
    height: 120 / 2, // Set both width and height to the same value
    borderRadius: 120 / 4, // Half of the width for a circular shape
    marginTop:7,
    borderWidth: 3,
    borderColor: '#2ecc71',
  },

  imageContainer: {
    width: 120 / 2,  // Set both width and height to the same value
    height: 120 / 2, // Set both width and height to the same value
    borderRadius: 120 / 4, // Half of the width for a circular shape
    margin: 15,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  milestoneText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
