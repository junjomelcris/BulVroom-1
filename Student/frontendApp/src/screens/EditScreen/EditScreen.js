import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Logo from '../../../assets/images/bulv.png';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [number, setContact] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const onSignUpPressed = () => {
    navigation.navigate('Homes');
  };

  const onChangePass = () => {
    navigation.navigate('ResetPW');
  };

  const onSignIn = () => {
    navigation.navigate('SignIn');
  };

  const onBackPressed = () => {
    navigation.navigate('Homes');
  };

  const selectImage = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

  };

  const isValidContactNumber = (text) => {
    // Remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');

    // Check if the numeric value is exactly 10 digits
    return numericValue.length === 10;
  };

  return (
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
          <View style={styles.circle} />
          <Image
          style={styles.circle2}
            source={require('../../../assets/images/luwi.jpg')}
          />
          {/* Profile Image */}
          <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            ) : (
              <Text style={styles.selectImageText}>Select Profile Picture</Text>
            )}
          </TouchableOpacity>
          <View style={styles.id}>
            <TouchableOpacity onPress={selectImage} style={styles.imageContainer1}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              ) : (
                <Text style={styles.selectImageText1}>Upload Driver's License</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={selectImage} style={styles.imageContainer1}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              ) : (
                <Text style={styles.selectImageText1}>Upload Valid ID</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.container1}>
          <TextInput
            label="First Name"
            value={"Cristian Louie"}
            onChangeText={(text) => setFirstName(text)}
            editable={false}
            style={{ pointerEvents: 'none', marginBottom: 20,}}
          />
          
          <TextInput
            label="Last Name"
            value={"Concepcion"}
            onChangeText={(text) => setLastName(text)}
            editable={false}
            style={{ pointerEvents: 'none', marginBottom: 20,}}
          />
          <TextInput
            label="Address"
            value={"282, Purok 4, Liciada, Bustos, Bulacan"}
            onChangeText={(text) => setAddress(text)}
            editable={false}
            style={{ pointerEvents: 'none', marginBottom: 20,}}
          />
          <TextInput
            label="Email"
            value={"louieconcepcion18@gmail.com"}
            onChangeText={(text) => setEmail(text)}
            editable={false}
            style={{ pointerEvents: 'none',}}
          />
          </View>
<CustomInputs
  label="Contact Number"
  value={number}
  keyboardType="numeric"
  onChangeText={(text) => {
    // Remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');

    // Check if the numeric value is exactly 10 digits
    if (numericValue.length <= 11) {
      const formattedValue =
        numericValue.length === 0
          ? numericValue
          :numericValue;

      setContact(formattedValue);
    }
  }}
/>
<TouchableOpacity onPress={onChangePass} style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSignUpPressed} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    width: width * 0.6,
    height: width * 0.7,
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
