import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Logo from '../../../assets/images/bulv.png';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  const onSignInPressed = () => {
    if (username.trim() === '' || password.trim() === '') {
      ToastAndroid.show('Please Enter Username and Password', ToastAndroid.SHORT);
      return;
    } else {
      axios
  .post('https://bulvroom.onrender.com/login/app', {
    username: username,
    password: password,
  })
  .then((response) => {
    console.log(response.data.message);
    if (response.data.message === 'Success') {
      AsyncStorage.setItem('username', username);
      if (response.data.id) {
        // Store user data in AsyncStorage
        
        AsyncStorage.setItem('id', response.data.id.toString()); // Store user ID
        console.log('User ID stored:', response.data.id);
      } else {
        console.log('User ID not provided in the response.');
        // Handle the case where the user ID is missing
      }
      setUsername(''); // Clear the username input
      setPassword(''); // Clear the password input
      setIsSubmitted(true);
      navigation.navigate('Homes');
    } else {
      ToastAndroid.show('User not Exist', ToastAndroid.SHORT);
    }
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
    ToastAndroid.show('Error occurred', ToastAndroid.SHORT);
  });

    }
  };

  const onForgot = () => {
    navigation.navigate('Forgot');
  };

  const onCreate = () => {
    navigation.navigate('SignUp');
  };




  return (
    <View style={styles.root}>
      <View style={styles.circle} />
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode='contain' />
      </View>
      <View style={styles.imageContainer1}>
        <Image source={Logo} resizeMode='cover' style={styles.image1} />
      </View>
      <View style={styles.content}>
        <CustomInputs
          mode="outlined"
          label="Email/Username"
          placeholder="Enter Username"
          onChangeText={(e) => setUsername(e)}
        />
        <CustomInputs
          mode="outlined"
          label="Password"
          placeholder="Enter Password"
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={true}
        />
        <Text style={styles.forgot} onPress={onForgot}>
          Forgot Password
        </Text>
        <TouchableOpacity onPress={onSignInPressed}>
          <CustomButton mode="elevated" text="Sign in" />
        </TouchableOpacity>
        <Text style={styles.text1}>
          Don't have an Account?{' '}
          <Text style={styles.text2} onPress={onCreate}>
            Create one
          </Text>
        </Text>
      </View>
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
    top: (height - width * 1.61) / 2, // Adjust the top position
    left: (width - width * 0.6) / 2, // Adjust the left position
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3, // Half the width to create a circle
    backgroundColor: 'white',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.1,
    zIndex: 2, // Ensure the logo is in front of the circle
  },
  logo: {
    width: width * 0.6, // Adjust the size of the logo as needed
    height: width * 0.6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  forgot: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
  },
  text1: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: 'white',
    marginTop: 20,
    letterSpacing: 1.5,
  },
  text2: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;