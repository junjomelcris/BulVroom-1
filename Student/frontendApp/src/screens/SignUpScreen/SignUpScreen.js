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
  const navigation = useNavigation();

  // BTN Function
  const onSignInPressed = () => {
    navigation.navigate('SignIn');
    if (email.trim() === '' || password.trim() === '') {
      ToastAndroid.show('Fields must not be empty.', ToastAndroid.SHORT);
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
            navigation.navigate('SignIn');
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
