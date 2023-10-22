import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData(userId);
    setRefreshing(false);
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/user/${userId}`);
      setUserData(response.data);
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
    try {
      await AsyncStorage.clear(); // Clear the entire AsyncStorage
      navigation.navigate('SignIn'); // Navigate to the sign-in screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  const onNotifPressed = () => {
    navigation.navigate('NotifScreen');
  };

  const onRatesPressed = () => {
    navigation.navigate('Rates');
  };

  const onEditPressed = () => {
    navigation.navigate('Edit'); // Replace 'EditProfileScreen' with your desired screen name
  };

  const onAddVehicle = () => {
    navigation.navigate('Vehicles'); // Replace 'EditProfileScreen' with your desired screen name
  };

  const renderStatusIcon = () => {
    if (userData) {
      if (userData.status === 'approved') {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="checkmark-circle" style={{ fontSize: 17, color: '#1b944e' }} />
            <Text style={{ fontSize: 17, color: '#1b944e' }}>{userData.status}</Text>
          </View>
        );
      } else if (userData.status === 'disapproved') {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="close-circle" style={{ fontSize: 17, color: 'red' }} />
            <Text style={{ fontSize: 17, color: 'red' }}>{userData.status}</Text>
          </View>
        );
      }
    }
    return null; // Return null if userData is still loading or not available
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
  },
});

export default ProfileScreen;
