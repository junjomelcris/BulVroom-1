import React, { useState, useEffect } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome'; 
import {
  View,
  Text, Alert,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {
  Provider,
  TextInput,
  Button,
  Portal,
  Dialog,
  Snackbar,
} from 'react-native-paper';
import ImagePicker ,{launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Import Firebase storage
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [contact, setContact] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [driversLicenseImage, setDriversLicenseImage] = useState(null);
  const [validIdImage, setValidIdImage] = useState(null);
  const [viewLicense, setViewLicense] = useState(false);
  const [viewValidId, setViewValidId] = useState(false);

  let options = {
    mediaType: 'mixed', // Allow all media types
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };
  const selectImage = async () => {
    const result = await launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
    console.log(result)
    Alert.alert(
      'Update Images',
      'Are you sure you want to update you Profile Picture?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => Upload(),
          
        },
      ],
      { cancelable: false }
    );
};
const selectLicense = async () => {
  const result = await launchImageLibrary(options);
  setGalleryPhoto(result.assets[0].uri);
  Alert.alert(
    'Update Images',
    "Are you sure you want to Upload your Driver's License",
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => License(),
      },
    ],
    { cancelable: false }
  );
};
const selectValid = async () => {
  const result = await launchImageLibrary(options);
  setValidIdImage(result.assets[0].uri);
  Alert.alert(
    'Update Images',
    'Are you sure you want to Upload your Valid Id?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => Valid(),
      },
    ],
    { cancelable: false }
  );
};
const Upload = async () => {
  if (galleryPhoto) {
    const imagePath = `profile_pic/${userId}/${galleryPhoto.fileName}`;
    const storageRef = ref(storage, imagePath);

    try {
      const response = await fetch(galleryPhoto);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on("state_changed", (snapshot) => {
        // Calculate the progress percentage and update the state
        const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercentage);
      }, (error) => {
        console.error("Error uploading image: ", error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .put(`https://bulvroom.onrender.com/Upload/${userId}`, { image: downloadURL })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
          alert('Image uploaded successfully');
          console.log(userData.profile_pic);
          // Reload your data or update the UI as needed
        });
      });
    } catch (error) {
      console.error("Error while processing the image: ", error);
    }
    } else {
      alert('No file selected');
    }
};
//------------------------------valid-----------
const Valid = async () => {
  if (validIdImage) {
    const imagePath = `images/valid/${userId}/${validIdImage.fileName}`;
    const storageRef = ref(storage, imagePath);

    try {
      const response = await fetch(validIdImage);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on("state_changed", (snapshot) => {
        // Calculate the progress percentage and update the state
        const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercentage);
      }, (error) => {
        console.error("Error uploading image: ", error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .put(`https://bulvroom.onrender.com/Valid/${userId}`, { image: downloadURL })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
          alert('Image uploaded successfully');
          console.log(userData.valid_id);
          // Reload your data or update the UI as needed
        });
      });
    } catch (error) {
      console.error("Error while processing the image: ", error);
    }
  } else {
    alert('No file selected or userData.image_file is null');
  }
};
//------------------------------license-----------
const License = async () => {
  if (validIdImage) {
    const imagePath = `images/license/${userId}/${validIdImage.fileName}`;
    const storageRef = ref(storage, imagePath);

    try {
      const response = await fetch(validIdImage);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on("state_changed", (snapshot) => {
        // Calculate the progress percentage and update the state
        const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercentage);
      }, (error) => {
        console.error("Error uploading image: ", error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .put(`https://bulvroom.onrender.com/License/${userId}`, { image: downloadURL })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
          alert('Image uploaded successfully');
          console.log(userData.driver_license_1);
          // Reload your data or update the UI as needed
        });
      });
    } catch (error) {
      console.error("Error while processing the image: ", error);
    }
  } else {
    alert('No file selected or userData.image_file is null');
  }
};

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/user/${userId}`);
      setUserData(response.data);
      console.log(response.data.driver_license_1);
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
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
          
          <View style={styles.imageContainer}>
  <TouchableOpacity onPress={toggleModal}>
    <Image
      source={userData && userData.profile_pic ? { uri: userData.profile_pic } : require('../../../assets/images/bulv.png')}
      resizeMode="contain"
      style={styles.image}
    />
  </TouchableOpacity>
  <Modal
  transparent={true}
  visible={isModalVisible}
  onRequestClose={toggleModal}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <TouchableOpacity
        onPress={toggleModal}
        style={styles.closeButton}
      >
        <Icon name="close" style={styles.closeIcon} />
      </TouchableOpacity>
      <Image
      source={userData && userData.profile_pic ? { uri: userData.profile_pic } : require('../../../assets/images/bulv.png')}
      resizeMode="contain"
      style={styles.image}
    />
    </View>
  </View>
</Modal>


<TouchableOpacity onPress={selectImage}>
  <View style={styles.centeredTextContainer}>
    <Icons name="pencil" size={15} marginRight={5}color="#2ecc71"  /> 
    <Text style={styles.centeredText}>Change Profile Picture</Text>
  </View>
</TouchableOpacity>
<View style={styles.uploadButtonContainer1}>
    {userData && userData.driver_license_1 && (
        <TouchableOpacity
            style={styles.underlineText}
            onPress={() => setViewLicense(true)}
        >
            
            <Text style={styles.underlineTextText}><Icon name="eye" size={15}  color="#000"  /> View Driver's License</Text>
        </TouchableOpacity>
    )}
</View>
<View style={styles.uploadButtonContainer2}>
    {userData && userData.valid_id && (
        <TouchableOpacity
            style={styles.underlineText}
            onPress={() => setViewValidId(true)}
        >
            
            <Text style={styles.underlineTextText}><Icon name="eye" size={15} textDecorationLine={"none"} color="#000"  /> View Valid ID</Text>
        </TouchableOpacity>
    )}
</View>
        
<View style={styles.uploadButtonContainer}>
        
        <TouchableOpacity onPress={selectLicense} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Driver's License</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={selectValid} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Valid ID</Text>
        </TouchableOpacity>
    </View>
      {viewLicense && (
        <Modal
          transparent={true}
          visible={viewLicense}
          onRequestClose={() => setViewLicense(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setViewLicense(false)}
                style={styles.closeButton}
              >
                <Icon name="close" style={styles.closeIcon} />
              </TouchableOpacity>
              <Image
                source={{ uri: userData.driver_license_1 }}
                resizeMode="contain"
                style={styles.fullSizeImage}
              />
            </View>
          </View>
        </Modal>
      )}

      {viewValidId && (
        <Modal
          transparent={true}
          visible={viewValidId}
          onRequestClose={() => setViewValidId(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setViewValidId(false)}
                style={styles.closeButton}
              >
                <Icon name="close" style={styles.closeIcon} />
              </TouchableOpacity>
              <Image
                source={{ uri: userData.valid_id }}
                resizeMode="contain"
                style={styles.fullSizeImage}
              />
            </View>
          </View>
        </Modal>
      )}


</View>
  

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
  image: {
    width: width / 2,  // Set both width and height to the same value
    height: width / 2, // Set both width and height to the same value
    borderRadius: width / 4, // Half of the width for a circular shape
    marginTop: 30,
    borderWidth: 5,
    borderColor: '#2ecc71',
  },

  imageContainer: {
    width: width / 2,  // Set both width and height to the same value
    height: width / 2, // Set both width and height to the same value
    borderRadius: width / 4, // Half of the width for a circular shape
    margin: 15,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
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
  centeredTextContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  icon: {
    marginRight: 5, // Adjust the space between the icon and text
  },
  centeredText: {
    textAlign: 'center',
    color: '#2ecc71',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  
  fullSizeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    fontSize: 30,
    color: 'black', // Adjust the color as needed
  },
  selectImageButton: {
    backgroundColor: '#2ecc71', // Background color
    borderRadius: 30, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    alignItems: 'center', // Center the text horizontally
    marginVertical: 16, // Vertical margin
  },
  
  selectImageButtonText: {
    color: 'white', // Text color
    fontSize: 18, // Font size
    fontWeight: 'bold', // Bold text
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: -20,
  },
  uploadButton: {
    backgroundColor: '#2ecc71', // Gray background
    borderRadius: 5, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    alignItems: 'center',
    marginHorizontal: 10, // Add horizontal margin between the buttons
    marginTop: 7
  },
  uploadButtonText: {
    color: 'white', // Text color
    fontSize: 10.5, // Font size
    fontWeight: 'bold', // Bold text
  },
  underlineText: {
    marginTop: 10,
    marginLeft: 10,
    padding: 5,
    alignSelf: 'flex-start',
   
  },
  underlineTextText: {
    textDecorationLine: 'underline',
    color: 'black',
  },
  uploadButtonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: -60,
    marginRight: 145
  },
  uploadButtonContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: -60,
    marginRight: -175
  },
});

export default SignUpScreen;
