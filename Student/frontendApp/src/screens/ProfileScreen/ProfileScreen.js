import { View, Text,StyleSheet,Image,ScrollView ,Dimensions, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import { Searchbar, Card, Avatar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/bulv.png';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`https://bulvroom.onrender.com/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.log('Failed to fetch user data:', error);
      }
    };

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
      await AsyncStorage.removeItem('user'); // Clear the user session
      navigation.navigate('SignIn'); // Navigate to the sign-in screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  const 
  onNotifPressed = () => {
    navigation.navigate('NotifScreen');
  };

  const 
  onRatesPressed = () => {
    navigation.navigate('Rates');
  };

  const onEditPressed = () => {
    navigation.navigate('Edit'); // Replace 'EditProfileScreen' with your desired screen name
  };

  const onAddVehicle = () => {
    navigation.navigate('Vehicles'); // Replace 'EditProfileScreen' with your desired screen name
  };

  
    
  const MyComponent = () => (
<Card style={styles.card}>
  <Card.Content>
  <Image style={styles.Logo1} source={Logo} />
  <TouchableOpacity  onPress={onAddVehicle}>
    <View style={styles.itemContainer}>
      <Icon name="car-outline" style={styles.icon} />
      <Text style={styles.itemText}>MY VEHICLES</Text>
    </View>
    </TouchableOpacity>
    <View style={styles.line} />
    <TouchableOpacity onPress={onNotifPressed}>
    <View style={styles.itemContainer} >
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
    <View style={styles.root}>

    <View style={{width:width * 1, marginTop: 20, margin:10,}}>
    <View style={{flexDirection: 'row',}}>
      <Icon name="person-circle" style={{ fontSize: 55, color: 'black', alignItems: 'center' }} />
    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
      <Text style={{ fontSize: 17, color: verificationStatus === 'Verified' ? '#1b944e' : 'red' }}>
        {verificationStatus}
      </Text>
      <Text style={{ color: 'black', fontSize: 20 }}>{userData ? userData.fName : 'Loading...'}</Text>
      <TouchableOpacity onPress={onEditPressed}>
        <Text style={{ color: '#1b944e', fontSize: 13, textDecorationLine: 'underline' }}>View and Edit Profile</Text>
      </TouchableOpacity>
  </View>
      
      
      </View>
      <View style={styles.line1}/>
      
      <View style={{marginRight: 20, marginTop: 10,}}>
      <MyComponent></MyComponent>

      </View>
    </View>
    </View>
  )
}

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
      flex: 1, // Allow the line to take up available space
      borderBottomWidth: 2.5, // Thickness of the line
      borderBottomColor: 'black', // Color of the line
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
});

export default ProfileScreen;