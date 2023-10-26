import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native'; // Import LottieView
const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const VerificationScreen = () => {
  const navigation = useNavigation();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  const [verificationCode, setVerificationCode] = useState('');

  const signIn = () => {
    navigation.navigate('SignIn');
  };

  const submitCode = async () => {
    if (verificationCode.trim() === '') {
      Alert.alert('Verification', 'Please input Verification Code');
    } else {
      try {
        const response = await axios.post('https://bulvroom.onrender.com/verification', {
          verificationCode: verificationCode,
        });

        if (response.status === 200) {
          if (response.data.message === 'match') {
            Alert.alert(
              'Registered Successfully',
              'Your account is now pending. Please wait 2-3 days to be verified.',
              [
                {
                  text: 'OK',
                  onPress: signIn,
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              'Verified User',
              'Verification Success ',
              [
                {
                  text: 'OK',
                  onPress: signIn,
                },
              ],
              { cancelable: false }
            );
          }
        } else {
          Alert.alert('Error', 'Unexpected server response');
        }
      } catch (error) {
        Alert.alert('Network Error', 'Failed to connect to the server');
      }
    }
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.imageContainer}>
          {/* Replace the Image with LottieView */}
          <LottieView
            source={require('../../../../assets/images/code.json')} // Replace with the path to your Lottie JSON file
            autoPlay
            loop={true} // Make the animation loop
            style={styles.lottieAnimation} // Add a style for your Lottie animation
          />
        </View>
      <View  />
      <View />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Verification Code</Text>
        <TextInput
  style={styles.input}
  placeholder="Enter Code"
  onChangeText={(text) => setVerificationCode(text)}
  placeholderTextColor="gray" // Set the placeholder text color
  color="gray"
  backgroundColor="white" // Set the text color to white
/>

        <TouchableOpacity onPress={submitCode}>
          <CustomButton text="Submit" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2ecc71"
  },
 
  contentContainer: {
    width: width,
    alignItems: 'center',
    marginVertical: 60,
    marginTop: -400
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: -80
  },
  input: {
    width: '80%',
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  lottieAnimation: {
    width: '70%',
    height: '70%',
  },
  imageContainer: {
    top: -350,
    left: windowWidth * 0.15,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VerificationScreen;
