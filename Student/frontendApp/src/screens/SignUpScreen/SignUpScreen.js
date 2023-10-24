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
  Modal,
  // Remove the Checkbox import
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // State to track agreement
  const navigation = useNavigation();

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isPasswordStrong = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
const toggleModal = () => {
  setModalVisible(!modalVisible);
};
  const toggleAgreeToTerms = () => {
    setAgreeToTerms(!agreeToTerms); // Toggle the agreement state
  };

  const onSignInPressed = () => {
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      !agreeToTerms
    ) {
      ToastAndroid.show('Fields must not be empty and you must agree to the terms', ToastAndroid.SHORT);
      return;
    }

    if (!isEmailValid(email)) {
      ToastAndroid.show('Please enter a valid email address', ToastAndroid.SHORT);
      return;
    }

    if (!isPasswordStrong(password)) {
      ToastAndroid.show('Password is not strong enough', ToastAndroid.SHORT);
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
            AsyncStorage.setItem('username', username);
            setIsSubmitted(true);
            navigation.navigate('verify');
          }
        })
        .catch((error) => {
          console.error(error);
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

        
          <TouchableOpacity style={styles.openTermsButton} onPress={toggleModal}>
          <Text style={styles.openTermsButtonText}>View Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.termsContainer} onPress={toggleAgreeToTerms}>
          <View style={styles.checkbox}>
            {agreeToTerms && <Text>✓</Text>}
          </View>
          <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer} onPress={onSignInPressed}>
          <CustomButton
            style={styles.btn}
            mode="contained"
            text="Register"
            labelStyle={styles.btnLabel}
            disabled={!agreeToTerms}
          />
        </TouchableOpacity>

        <Text style={styles.text}>
          Already have an account?{' '}
          <Text style={styles.signInText} onPress={onCreate}>
            Sign In
          </Text>
        </Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text>Terms and Conditions for Vehicle Rental

1. Introduction
Welcome to Bul-Vroom! Please read these Terms and Conditions carefully before renting a vehicle from us. By renting a vehicle, you agree to abide by these terms and conditions.

2. Policies of Renting a Vehicle
a. Eligibility: To rent a vehicle, you must be at least [18] years old and possess a valid driver's license.

b. Reservation: Reservations are subject to vehicle availability.

c. Rental Period: The rental period begins on the agreed start date and time and ends on the agreed return date and time.

d. Payment: Rental charges must be paid in advance. Additional fees may apply for mileage exceeding the agreed limit or late returns.

e. Insurance: You are responsible for any damages to the vehicle during the rental period. We offer optional insurance coverage for an additional fee.

f. Prohibited Use: The vehicle must not be used for illegal purposes, racing, off-roading, or transporting hazardous materials.

g. Maintenance: You are responsible for checking and maintaining proper fluid levels and tire pressure during the rental.

h. Return: The vehicle must be returned in the same condition as when rented, with a full tank of fuel, or as specified in your rental agreement.

3. Legal Terms of Renting a Vehicle
a. Liability: You are liable for any accidents, damages, or injuries that occur during the rental period, unless covered by insurance.

b. Indemnification: You agree to indemnify us against any claims, losses, or liabilities arising from your use of the vehicle.

c. Termination: We reserve the right to terminate the rental agreement if you breach any terms or misuse the vehicle.

4. Sign-up Terms
a. Registration: To rent a vehicle, you must provide accurate and complete information during the sign-up process.

b. Account Security: You are responsible for maintaining the confidentiality of your account login information.

5. Information Privacy Terms
a. Data Collection: We collect and use personal information as described in our Privacy Policy.

b. Consent: By using our service, you consent to the collection and use of your information as outlined in our Privacy Policy.

6. Miscellaneous

a. Severability: If any provision of these terms is found to be invalid or unenforceable, it will not affect the validity of the remaining provisions.

b. Changes: We may modify these terms at any time, and it is your responsibility to review them periodically.

7. Contact Information
If you have any questions or concerns regarding these terms and conditions, please contact us at bulvroom@gmail.com.</Text>
              <Text>Your Terms and Conditions Here</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
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
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    margin: 15
  },
  termsText: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: 'black',
    marginLeft: 8,
  },
  btnContainer: {
    width: width * 0.9,
  },
  btn: {
    marginVertical: 20,
    backgroundColor: '#2ecc71',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: width * 0.9,
  },
  closeText: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: '#59C4CB',
    textAlign: 'right',
    marginTop: 10,
  },
  openTermsButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  openTermsButtonText: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: '#59C4CB',
  },
});

export default SignUpScreen;
