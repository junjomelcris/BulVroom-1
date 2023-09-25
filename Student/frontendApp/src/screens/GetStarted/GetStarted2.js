import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/STARTED2.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  const onGetStartedPressed = () => {
    navigation.navigate('Started3');
  };

  return (
    <View style={styles.root}>
    
      <View style={styles.circleBackground}>
        <View style={styles.circle} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode='contain' style={styles.logoImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.appName}>DIVERSE FLEET</Text>
        <Text style={styles.appDescription}>No more hassles in finding the perfect vehicle for your trip</Text>
        <Text style={styles.appContent}>
        Bulvroom offers a wide selection of rental cars, ensuring you find the ideal match for your needs. Our user-friendly platform makes booking a breeze, with just a few taps to get you on the road.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
      <View style={{ flexDirection: 'row', marginTop: 50, }}>
          <Text style={styles.dot2}>•</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot2}>•</Text>
      </View>

        <TouchableOpacity onPress={onGetStartedPressed} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBackground: {
    position: 'absolute',
    top: windowHeight * 0.17,
    left: windowWidth * 0.1,
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    borderRadius: windowWidth * 0.4,
    backgroundColor: 'transparent', // Make the background transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    fontSize: 45,
    marginHorizontal: 15,
    color: '#2ec771'
  },
  dot2: {
    fontSize: 45,
    marginHorizontal: 15,
  },
  circle: {
    top: windowHeight * -0.06,
    left: windowWidth * 0.0,
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
    borderRadius: windowWidth * 0.5,
    backgroundColor: '#2ec771', // Set the background color here
  },
  circle1: {
    position: 'absolute',
    top: windowHeight * 0.05,
    left: windowWidth * 0.0,
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.5,
    backgroundColor: '#2ec771', // Set the background color here
  },
  imageContainer: {
    top: windowHeight * -0.089,
    left: windowWidth * 0.0,
    width: windowWidth, // Use the entire width
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '70%',
    height: '70%',
  },
  textContainer: {
    top: windowHeight * -0.22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.1,
  },
  appName: {
    color: '#333',
    fontFamily: 'Poppins-Bold',
    fontSize: windowWidth * 0.08,
    marginBottom: 10,
  },
  appDescription: {
    color: '#555',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: windowWidth * 0.04,
    marginBottom: 20,
  },
  appContent: {
    fontSize: windowWidth * 0.04,
    color: '#777',
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer1: {
    position: 'absolute',
    bottom: 20,
    left: 130,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#2ec771',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  nextButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
});

export default GetStarted;
