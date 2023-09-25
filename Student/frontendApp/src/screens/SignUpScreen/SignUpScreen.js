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

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const onSignUpPressed = () => {
    navigation.navigate('SignIn');
  };

  const onSignIn = () => {
    navigation.navigate('SignIn');
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

  return (
    <ScrollView style={styles.root}>
      <View style={styles.circle} />
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode='contain' />
      </View>
      <View style={styles.imageContainer1}>
        <Image source={Logo} resizeMode='cover' style={styles.image1} />
      </View>
      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
          />
        )}
        <TouchableOpacity onPress={selectImage}>
          <Text style={styles.selectImageText}>Select Profile Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <CustomInputs
          mode="outlined"
          label="First Name"
          placeholder="Enter First Name"
          onChangeText={(e) => setFirstName(e)}
        />
         <CustomInputs
          mode="outlined"
          label="Last Name"
          placeholder="Enter Last Name"
          onChangeText={(e) => setLastName(e)}
        />
        <CustomInputs
          mode="outlined"
          label="Email"
          placeholder="Enter Email"
          onChangeText={(e) => setEmail(e)}
        />
          <CustomInputs
          mode="outlined"
          label="Full Adress"
          placeholder="Enter Adress"
          onChangeText={(e) => setEmail(e)}
        />
          <CustomInputs
          mode="outlined"
          label="Contact Number"
          placeholder="Enter Contact Number"
          onChangeText={(e) => setEmail(e)}
        />
        <CustomInputs
          mode="outlined"
          label="Password"
          placeholder="Create Password"
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={true}
        />
        <CustomInputs
          mode="outlined"
          label="Confirm Password"
          placeholder="Confirm Password"
          onChangeText={(e) => setConfirmPassword(e)}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={onSignUpPressed}>
          <CustomButton mode="elevated" text="Sign Up" />
        </TouchableOpacity>
        <Text style={styles.text1}>
          Already have an account?{' '}
          <Text style={styles.text2} onPress={onSignIn}>
            Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#2ecc71',
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
    position: 'absolute',
    top: (height - width * 1.61) / 2,
    left: (width - width * 0.6) / 2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'white',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.1,
    zIndex: 2,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
  },
  imageContainer: {
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
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
