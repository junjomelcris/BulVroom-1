import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Provider,
  TextInput,
  Button,
  Portal,
  Dialog,
  Snackbar,
} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [contact, setContact] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);

  const selectProfilePicture = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectedImage(response.uri);
      }
    });
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
        setUserId(storedId);
        fetchUserData(storedId);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveData();
  }, []);

  const navigation = useNavigation();

  const onSignUpPressed = () => {
    // Check if the contact is valid
    if (!isValidContactNumber(contact)) {
      setDialogVisible(true); // Show the dialog for invalid input
    } else {
      const updatedData = {
        fName: userData.fName,
        lName: userData.lName,
        address: userData.address,
        email: userData.email,
        contact: contact,
      };

      updateUserProfile(userId, updatedData);
    }
  };

  const updateUserProfile = async (userId, updatedData) => {
    try {
      const response = await axios.put(
        `https://bulvroom.onrender.com/update/${userId}`,
        updatedData
      );
      if (response.data.Status === 'Success') {
        // User data updated successfully
        setSnackbarVisible(true);
      } else {
        console.log('Failed to update user data');
      }
    } catch (error) {
      console.log('Error updating user data:', error);
    }
  };

  const onChangePass = () => {
    navigation.navigate('ResetPW');
  };

  const onBackPressed = () => {
    navigation.navigate('Homes');
  };

  const isValidContactNumber = (text) => {
    // Validate if the contact is 11 digits and starts with '09'
    return text.match(/^09\d{9}$/) !== null;
  };

  const onContactChange = (text) => {
    setContact(text);
  };

  return (
    <Provider>
      <View>
        <View style={styles.container}>
          <View style={styles.title}>
            <TouchableOpacity onPress={onBackPressed}>
              <Icon name="arrow-back" style={styles.back}></Icon>
            </TouchableOpacity>
            <View style={styles.titleCenter}>
              <Icon name="person" style={styles.title2}></Icon>
              <Text style={styles.titleText}>View and Edit profile</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <TouchableOpacity onPress={selectProfilePicture} style={styles.imageContainer}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              ) : (
                <Text style={styles.selectImageText}>Select Profile Picture</Text>
              )}
            </TouchableOpacity>

            <View style={styles.container1}>
              <TextInput
                label="First Name"
                value={userData ? userData.fName : ''}
                editable={false}
                style={{ pointerEvents: 'none', marginBottom: 20 }}
              />

              <TextInput
                label="Last Name"
                value={userData ? userData.lName : ''}
                editable={false}
                style={{ pointerEvents: 'none', marginBottom: 20 }}
              />

              <TextInput
                label="Address"
                value={userData ? userData.address : ''}
                editable={false}
                style={{ pointerEvents: 'none', marginBottom: 20 }}
              />

              <TextInput
                label="Email"
                value={userData ? userData.email : ''}
                editable={false}
                style={{ pointerEvents: 'none',  marginBottom: 20 }}
              />

              <TextInput
                label={"Contact Number:" + " " + (userData ? userData.contact : '')}
                keyboardType="numeric"
                onChangeText={onContactChange}
                style={{ backgroundColor: 'white' }}
                value={contact}
                maxLength={11}
              />
            </View>
            <TouchableOpacity onPress={onChangePass} style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSignUpPressed} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Invalid Input</Dialog.Title>
          <Dialog.Content>
            <Text>Contact number should start with '09' and be 11 digits long.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000} // Display duration in milliseconds
        >
          User data updated successfully
        </Snackbar>
      </Portal>
    </Provider>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#2ecc71',
  },
  id: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10, // Margin between the back button and the title
  },
  container1:{
    width:'90%',
    borderColor:'#e8e8e8',
    borderRadius:5,
    paddingHorizontal:10,
    marginVertical:5,
    marginTop:20,
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
  saveButton: {
    backgroundColor: '#2ecc71', // Background color
    borderRadius: 30, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    alignItems: 'center', // Center the text horizontally
    marginVertical: 16, // Vertical margin
  },
  changeButton: {
    textDecorationLine: 'underline',
    borderRadius: 30, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    alignItems: 'center', // Center the text horizontally
    marginVertical: 16, // Vertical margin
  },
  saveButtonText: {
    color: 'white', // Text color
    fontSize: 18, // Font size
    fontWeight: 'bold', // Bold text
  },
  changeButtonText: {
    color: 'black', // Text color
    fontSize: 18, // Font size
    fontWeight: 'bold', // Bold text
    textDecorationLine: 'underline',
  },
  back: {
    fontSize: 30,
    color: 'white', // Adjust the color as needed
  },
  image1: {
    position: 'absolute',
    top: (height - windowWidth * 4.50) / 2, // Center vertically
    left: (width - windowWidth * 2.2) / 2, // Center horizontally
    width: windowWidth * 2.2,
    height: windowWidth * 2.90,
    opacity: 0.2,
  },
  circle: {
    top: (height - width * 1.89) / 2,
    left: (width - width * 1) / 2,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.3,
    backgroundColor: '#2ecc71',
    marginBottom: 10,
  },
  circle2: {
    position: 'absolute',
    top: (height - width * 1.86) / 2,
    left: (width - width * 0.372) / 2,
    width: width * 0.37,
    height: width * 0.37,
    borderRadius: width * 0.3,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  titleCenter: {
    flex: 1, // This allows the center content to take up available space
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
  },
  title2: {
    fontSize: 30,
    color: 'white', // Adjust the color as needed
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Adjust the color as needed
  },
  header: {
    height: width * 0.6,
    alignItems: 'center',
    paddingTop: height * 0.1,
    marginBottom: 10,
    zIndex: 2,
  },
  logo: {
    position: 'absolute',
    width: windowWidth * 0.6,
    height: windowWidth * 0.7,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer1: {
    marginBottom: 15,
    marginLeft: 5,
    marginTop: 10,
  },
  newImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  selectImageText: {
    marginTop: 20,
    marginBottom: -20,
    backgroundColor: 'white', // Background color
    color: 'black',             // Text color
    left: (width - width * 1) / 2,
    fontSize: 16,
    padding: 10,                // Add padding for better UI
    borderRadius: 5,            // Add border radius for rounded corners
    textAlign: 'center',        // Center text horizontally
  },
  selectImageText1: {
    marginTop: 5,
    marginBottom: -20,
    textDecorationLine: 'underline',
    color: 'black',             // Text color
    left: (width - width * 1) / 2,
    fontSize: 15,
    padding: 10,                // Add padding for better UI
    borderRadius: 5,            // Add border radius for rounded corners
    textAlign: 'center',        // Center text horizontally
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 35,
    paddingBottom: 15,
  },
  text1: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: 'white',
    letterSpacing: 1.5,
  },
  text2: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
