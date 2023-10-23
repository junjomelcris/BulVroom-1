import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setCPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitted,setIsSubmitted] = useState(false);
  const navigation = useNavigation();
  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const isPasswordStrong = (password) => {
    // Define your password strength criteria (e.g., at least 8 characters, including numbers, uppercase, and lowercase letters)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  // BTN Function
  const onSignInPressed = () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || checked === false) {
      ToastAndroid.show('Fields must not be empty', ToastAndroid.SHORT);
      return;
    }
  
    if (!isEmailValid(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }
  
    if (!isPasswordStrong(password)) {
      Alert.alert('Password is not strong enough');
      return;
    }
  

    if (password !== Cpassword) {
      ToastAndroid.show("Passwords don't match", ToastAndroid.SHORT);
    } else {
      axios
        .post('https://bulvroom.onrender.com/register/app', {
          fName: fName,
          lName: lName,
          email: email,
          username: username,
          password: password,
          address: address,
          contact: contact,
        })
        .then((response) => {
          console.log(response.data.message);
          if (response.data.message === 'email already exists') {
            ToastAndroid.show('Email Already Exists', ToastAndroid.SHORT);
          } else if (response.data.message === 'Username already exists') {
            ToastAndroid.show('Username Already Exists', ToastAndroid.SHORT);
          } else if (response.data.message === 'User registered successfully') {
            ToastAndroid.show('Registered Successfully', ToastAndroid.SHORT);
            AsyncStorage.setItem('username', username);
            setIsSubmitted(true);
            navigation.navigate('verify');
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle other error scenarios if needed
        });
    }
  };

  const onCreate = () => {
    navigation.navigate('SignIn');
  };


  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-200} style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <CustomInputs
          onChangeText={(e) => setfName(e)}
          mode="outlined"
          label="First Name"
          placeholder="Enter First Name"
        />
        <CustomInputs
          onChangeText={(e) => setlName(e)}
          mode="outlined"
          label="Last Name"
          placeholder="Enter Last Name"
        />

        <CustomInputs
          onChangeText={(e) => setEmail(e)}
          mode="outlined"
          label="Email"
          placeholder="Enter Email"
        />

        <CustomInputs
          onChangeText={(e) => setUsername(e)}
          mode="outlined"
          label="Username"
          placeholder="Enter Username"
        />

        <CustomInputs
          onChangeText={(e) => setContact(e)}
          mode="outlined"
          label="Contact"
          placeholder="Enter Contact"
        />

        <CustomInputs
          onChangeText={(e) => setAddress(e)}
          mode="outlined"
          label="Address"
          placeholder="Enter Address"
        />

        <CustomInputs
          onChangeText={(e) => setPassword(e)}
          mode="outlined"
          label="Password"
          placeholder="Enter Password"
          secureTextEntry={true}
        />

        <CustomInputs
          onChangeText={(e) => setCPassword(e)}
          mode="outlined"
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.btnContainer} onPress={onSignInPressed}>
          <CustomButton
            style={styles.btn}
            mode="contained"
            text="Register"
            labelStyle={styles.btnLabel}
          />
        </TouchableOpacity>
        <Text style={styles.text}>
          Already have an account?{' '}
          <Text style={styles.signInText} onPress={onCreate}>
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    minHeight: height,
  },
  title: {
    fontFamily: 'poppins',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  btnContainer: {
    width: width * 0.9,
  },
  btn: {
    marginVertical: 20,
    backgroundColor: '#2ecc71', // Button background color
  },
  btnLabel: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    fontFamily: 'poppins',
    color: 'black',
    fontSize: 14,
    marginVertical: 10,
    letterSpacing: 1.2,
  },
  signInText: {
    color: '#59C4CB',
  },
});

export default SignUpScreen;
