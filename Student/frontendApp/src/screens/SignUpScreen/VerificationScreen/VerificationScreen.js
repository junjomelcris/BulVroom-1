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

const { width, height } = Dimensions.get('window');

const VerificationScreen = () => {
  const navigation = useNavigation();

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
          } else {
            Alert.alert('Verification', 'Verification is Invalid');
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
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Code"
          onChangeText={(text) => setVerificationCode(text)}
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
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    width: '80%',
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default VerificationScreen;
