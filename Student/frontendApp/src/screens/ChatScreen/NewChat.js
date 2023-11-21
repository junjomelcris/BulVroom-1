import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    // Sample chat messages (you can replace these with your data)
    { id: '1', sender: 'Sender', message: 'Hello, I want to rent this car' },
    //{ id: '2', sender: 'Receiver', message: 'My Toyota 86 is available on Wednesday. Just let me know.' },
  ]);

  const sendMessage = () => {
    if (message.trim() === '') {
      // Don't send empty messages
      return;
    }

    // Create a new chat message
    const newMessage = {
      id: `${chatMessages.length + 1}`,
      sender: 'Sender', // You can change this to the actual sender
      message: message,
    };

    // Add the new message to the chatMessages state
    setChatMessages([...chatMessages, newMessage]);

    // Clear the input field
    setMessage('');
  };
  const navigation = useNavigation(); // Initialize the navigation object
  onBackPressed = () => {
    navigation.navigate('Homes');
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={onBackPressed}>
          <Icon name="arrow-back" style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.titleText}> Chat</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {chatMessages.map((chatMessage) => (
          <View
            key={chatMessage.id}
            style={[
              styles.messageContainer,
              chatMessage.sender === 'Sender'
                ? styles.senderMessage
                : styles.receiverMessage,
            ]}
          >
            <Text style={styles.messageText}>{chatMessage.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
  },
  back: {
    fontSize: 30,
    color: 'black',
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2ecc71',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2ecc71',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: 25,
    color: 'white',
  },
});

export default ChatScreen;
