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
import { Card, TextInput } from 'react-native-paper'; // Import Card and TextInput from react-native-paper
import Logo from '../../../assets/images/bulv.png';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const isValidContactNumber = (text) => {
    // Remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');

    // Check if the numeric value is exactly 10 digits
    return numericValue.length === 10;
  };

  const navigation = useNavigation(); // Initialize the navigation object

  const inboxMessages = [
    {
      id: '1',
      sender: 'Nathelie Quiloña',
      subject: 'Toyota 86',
      message: 'My Toyota 86 is available on Wednesday. Just let me know.',
    },
    // Add more inbox messages as needed
  ];

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.titleCenter}>
            <Icon name="chatbubbles" style={styles.title2}></Icon>
            <Text style={styles.titleText}>Messages</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity>
          <View style={styles.content}>
            {/* Display Inbox Messages */}
            {inboxMessages.map((message) => (
              <TouchableOpacity
                key={message.id}
                onPress={() => {
                  navigation.navigate('NewChat'); // Navigate to NewChat.js when card is pressed
                }}
              >
                <Card style={styles.card}>
                  <Card.Content>
                    <Text style={styles.cardSender}>{message.sender}</Text>
                    <Text style={styles.cardSubject}>{message.subject}</Text>
                    <Text style={styles.cardMessage}>{message.message}</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  titleCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title2: {
    fontSize: 30,
    color: 'black',
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 35,
    paddingBottom: 15,
  },
  card: {
    width: '100%',
    elevation: 3,
    borderRadius: 0,
  },
  cardSender: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubject: {
    fontSize: 16,
    color: 'gray',
  },
  cardMessage: {
    fontSize: 14,
  },
});

export default SignUpScreen;
