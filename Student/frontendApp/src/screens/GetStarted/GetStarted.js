import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  const onGetStartedPressed = () => {
    navigation.navigate('Started2');
  };
  const onSkipButtonPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.root}>
      <View style={styles.circlenimage}>
        <View style={styles.circleBackground}>
          <View style={styles.circle} />
        </View>
        <View style={styles.imageContainer}>
          {/* Replace the Image with LottieView */}
          <LottieView
            source={require('../../../assets/images/car.json')} // Replace with the path to your Lottie JSON file
            autoPlay
            loop={true} // Make the animation loop
            style={styles.lottieAnimation} // Add a style for your Lottie animation
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.appName}>RENTING MADE EASY</Text>
        <Text style={styles.appDescription}>Your Key to Easy Vehicle Rentals</Text>
        <Text style={styles.appContent}>
          The premier vehicle renting application designed to simplify the process of finding and booking rental cars. With Bulvroom, your journey begins with convenience and ease, as we redefine your travel experience.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: 'row', marginTop: 50, }}>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot2}>•</Text>
          <Text style={styles.dot2}>•</Text>
        </View>
        <TouchableOpacity onPress={onGetStartedPressed} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkipButtonPressed} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>SKIP</Text>
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
    top: windowHeight * .10 - windowWidth * 0.4,
    left: windowWidth * 0.1,
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    borderRadius: windowWidth * 0.4,
    backgroundColor: 'transparent',
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
    width: windowWidth * 0.9,
    height: windowWidth * 0.45,
    borderBottomLeftRadius: windowWidth * 0.9,
    borderBottomRightRadius: windowWidth * 0.9,
    backgroundColor: '#FFFDD0',
    transform: [{ rotate: '180deg' }] // Rotate the half-circle 180 degrees
  },
  
  imageContainer: {
    top: windowHeight * 0.109 - windowWidth * 0.35,
    left: windowWidth * 0.0,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlenimage: {
    marginTop: 50,
  },
  lottieAnimation: {
    width: '70%',
    height: '70%',
  },
  textContainer: {
    top: windowHeight * -0.40,
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
    top: 350,
    bottom: 20,
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
  skipButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  skipButtonText: {
    position: 'absolute',
    left: 150,
    color: 'black',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    top: 100
  },
});

export default GetStarted;
