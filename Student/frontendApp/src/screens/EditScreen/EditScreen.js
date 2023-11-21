import React, { useState, useEffect } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text, Alert,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions, RefreshControl,
  Modal, ActivityIndicator
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const [viewLicense, setViewLicense] = useState(null);
  const [validIdImage, setValidIdImage] = useState(null);
  const onRefresh = () => {
    setRefreshing(true);

    // Fetch your data here
    axios
      .get(`https://bulvroom.onrender.com/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setRefreshing(false); // Set refreshing to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching approved vehicles:', error);
        setRefreshing(false); // Ensure refreshing is set to false even if there's an error
      });

  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setGalleryPhoto(result.assets[0].uri);
      Alert.alert(
        'Update Images',
        'Are you sure you want to update your Profile Picture?',
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
    }
  };

  const selectLicense = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setViewLicense(result.assets[0].uri);
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
    }
  };

  const selectValid = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
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
    }
  };

  const Upload = async () => {
    setLoading(true);
    console.log(galleryPhoto)
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
          setLoading(false);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            axios
              .put(`https://bulvroom.onrender.com/Upload/${userId}`, { image: downloadURL })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
            setLoading(false);
            alert('Image uploaded successfully');
            console.log(userData.profile_pic);
            // Reload your data or update the UI as needed
          });
        });
      } catch (error) {
        console.error("Error while processing the image: ", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert('No file selected');
    }
  };
  //------------------------------valid-----------
  const Valid = async () => {
    setLoading(true);
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
          setLoading(false);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            axios
              .put(`https://bulvroom.onrender.com/Valid/${userId}`, { image: downloadURL })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
            setLoading(false);
            alert('Image uploaded successfully');
            console.log(userData.valid_id);
            // Reload your data or update the UI as needed
          });
        });
      } catch (error) {
        console.error("Error while processing the image: ", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert('No file selected or userData.image_file is null');
    }
  };
  //------------------------------license-----------
  const License = async () => {
    setLoading(true);
    if (viewLicense) {
      const imagePath = `images/license/${userId}/${viewLicense.fileName}`;
      const storageRef = ref(storage, imagePath);

      try {
        const response = await fetch(viewLicense);
        const blob = await response.blob();
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on("state_changed", (snapshot) => {
          // Calculate the progress percentage and update the state
          const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercentage);
        }, (error) => {
          console.error("Error uploading image: ", error);
          setLoading(false);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            axios
              .put(`https://bulvroom.onrender.com/License/${userId}`, { image: downloadURL })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
            setLoading(false);
            alert('Image uploaded successfully');
            console.log(userData.driver_license_1);
            // Reload your data or update the UI as needed
          });
        });
      } catch (error) {
        console.error("Error while processing the image: ", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
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
  const toggleModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };
  const toggleModal1 = () => {
    setIsModalVisible1(!isModalVisible1);
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
      setLoading(true);
    }
  };

  const updateUserProfile = async (userId, updatedData) => {
    try {
      const response = await axios.put(
        `https://bulvroom.onrender.com/update/${userId}`,
        updatedData
      );
      if (response.data.Status === 'Success') {
        setLoading(false); // User data updated successfully
        alert('Update successful');

      } else {
        console.log('Failed to update user data');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
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
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                      <Icon name="close" style={styles.closeIcon} />
                    </TouchableOpacity>
                    {userData && userData.profile_pic ? (
                      <Image
                        source={{ uri: userData.profile_pic }}
                        resizeMode="contain"
                        style={styles.image2}
                      />
                    ) : (
                      <Text>No uploaded Picture</Text> // Display this message if valid_id is not available
                    )}
                  </View>
                </View>
              </Modal>


              <TouchableOpacity onPress={selectImage}>
                <View style={styles.centeredTextContainer}>
                  <Icons name="pencil" size={15} marginRight={5} color="#2ecc71" />
                  <Text style={styles.centeredText}>Change Profile Picture</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.selectedImageContainer}>

              </View>
              <View style={styles.uploadButtonContainer1}>

                <TouchableOpacity
                  style={styles.underlineText}
                  onPress={toggleModal1}
                >

                  <Text style={styles.underlineTextText}><Icon name="eye" size={15} color="#000" /> View Driver's License</Text>
                </TouchableOpacity>

              </View>
              <Modal
                transparent={true}
                visible={isModalVisible1}
                onRequestClose={toggleModal1}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity onPress={toggleModal1} style={styles.closeButton}>
                      <Icon name="close" style={styles.closeIcon} />
                    </TouchableOpacity>
                    {userData && userData.driver_license_1 ? (
                      <Image
                        source={{ uri: userData.driver_license_1 }}
                        resizeMode="contain"
                        style={styles.image2}
                      />
                    ) : (
                      <Text>No uploaded Picture</Text> // Display this message if valid_id is not available
                    )}
                  </View>
                </View>
              </Modal>
              <View style={styles.uploadButtonContainer2}>

                <TouchableOpacity
                  style={styles.underlineText}
                  onPress={toggleModal2}
                >

                  <Text style={styles.underlineTextText}><Icon name="eye" size={15} textDecorationLine={"none"} color="#000" /> View Valid ID</Text>
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                visible={isModalVisible2}
                onRequestClose={toggleModal2}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      onPress={toggleModal2}
                      style={styles.closeButton}
                    >
                      <Icon name="close" style={styles.closeIcon} />
                    </TouchableOpacity>
                    <Image
                      source={userData && userData.valid_id ? { uri: userData.valid_id } : 'Loading...'}
                      resizeMode="contain"
                      style={styles.image2}
                    />
                  </View>
                </View>
              </Modal>

              <View style={styles.uploadButtonContainer}>

                <TouchableOpacity onPress={selectLicense} style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>Upload Driver's License</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={selectValid} style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>Upload Valid ID</Text>
                </TouchableOpacity>
              </View>


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
                style={{ pointerEvents: 'none', marginBottom: 20 }}
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
      <Modal visible={isLoading} transparent={true}>
        <View style={styles.loadingModal}>
          <ActivityIndicator size="large" color="green" />
          <Text style={styles.loadingText}>Updating...</Text>
        </View>
      </Modal>
    </Provider>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  loadingModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
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
  container1: {
    width: '90%',
    borderColor: '#e8e8e8',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginTop: 20,
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
    fontWeight: '900', // Bold text
  },
  changeButtonText: {
    color: 'black', // Text color
    fontSize: 18, // Font size
    fontWeight: '900', // Bold text
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
  image2: {
    width: width / 2,  // Set both width and height to the same value
    height: width / 2, // Half of the width for a circular shape
    marginTop: 30,
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
    fontWeight: '900',
    color: 'white', // Adjust the color as neededupload dr
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
    fontFamily: 'Roboto',
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
    fontWeight: '900', // Bold text
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
    fontWeight: '900', // Bold text
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
    marginRight: -170
  },
});

export default SignUpScreen;
