import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import LottieView from 'lottie-react-native'; // Import LottieView
import Logo from '../../../assets/images/bulv.png'; // Import the Bulvroom logo
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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
              AsyncStorage.setItem('id', response.data.id.toString());
              console.log('User ID stored:', response.data.id);
            } else {
              console.log('User ID not provided in the response.');
            }
            setUsername('');
            setPassword('');
            setIsSubmitted(true);
            navigation.navigate('Homes');
          } else if (response.data.message.includes('Incorrect')) {
            setErrorMessage('Incorrect username or password');
            ToastAndroid.show('Incorrect username or password', ToastAndroid.SHORT);
          } else if (response.data.message === 'User not found') {
            setErrorMessage('User not found');
            ToastAndroid.show('User not found', ToastAndroid.SHORT);
          } else {
            // Handle other cases
            setErrorMessage('Incorrect username or password');
            ToastAndroid.show('Incorrect username or password', ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          console.error('Error in POST request:', error);
          setErrorMessage('Incorrect username or password');
          ToastAndroid.show('Incorrect username or password', ToastAndroid.SHORT);
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
    <ScrollView contentContainerStyle={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <View style={styles.header}>
          {/* Display the Bulvroom logo */}
          <Image source={Logo} style={styles.logo} resizeMode="contain" />

          {/* Display the LottieView animation */}
          <LottieView
            source={require('../../../assets/images/splash.json')} // Replace with the path to your Lottie JSON file
            autoPlay
            loop={true} // Make the animation loop
            style={styles.lottieAnimation} // Add a style for your Lottie animation
          />
          {/* Add the "Bulvroom" text */}
          <Text style={styles.appName}>Bulvroom</Text>
        </View>
        <View style={styles.content}>
          <CustomInputs
            mode="outlined"
            label="Username"
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
          <Text style={styles.text}>
            Don't have an Account?{' '}
            <Text style={styles.signInText} onPress={onCreate}>
              Create One
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.25,
    paddingBottom: 20,
    elevation: 10,
  },
  logo: {
    marginTop:80,
    width: width * 0.6,
    height: width * 0.6,
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  lottieAnimation: {
    marginTop:45,
    width: width * 0.8,
    height: width * 0.8,
    position: 'absolute',
  },
  appName: {
    fontSize: windowWidth * 0.1, // Adjust the font size as needed
    fontWeight: '900',
    color: '#5db370',
    marginTop: 140, // Adjust the margin-top as needed
    fontStyle: 'italic',
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
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#2ecc71',
  },
  text2: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
  },
  text: {
    fontFamily: 'Roboto',
    color: 'black',
    fontSize: 14,
    marginVertical: 10,
    letterSpacing: 1.2,
  },
  signInText: {
    color: '#2ecc71',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
