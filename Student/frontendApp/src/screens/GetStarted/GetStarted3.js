import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/STARTED3.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  const onGetStartedPressed = () => {
    navigation.navigate('Homes');
  };


  return (
    <View style={styles.root}>
    <View style={styles.circlenimage}>
      <View style={styles.circleBackground}>
        <View style={styles.circle} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode='contain' style={styles.logoImage} />
      </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.appName}>LET'S RIDE</Text>
        <Text style={styles.appDescription}>
Let us put you in the driver's seat of your adventure</Text>
        <Text style={styles.appContent}>
        So, are you ready to use the app and embark on hassle-free travels? With Bulvroom, the road to adventure is just a tap away!
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: 'row', marginTop: 50, }}>
          <Text style={styles.dot2}>•</Text>
          <Text style={styles.dot2}>•</Text>
          <Text style={styles.dot}>•</Text>
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
    top: windowHeight * 0.17 - windowWidth * 0.4, // Adjusted position for centering
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
    height: windowWidth * 0.9,
    borderRadius: windowWidth * 0.45,
    backgroundColor: '#2ec771',
  },
  imageContainer: {
    top: windowHeight * 0.109 - windowWidth * 0.35, // Adjusted position for centering
    left: windowWidth * 0.0,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlenimage: {
    marginTop: 40,
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
    fontFamily: 'Poppins-Regular',
    fontSize: windowWidth * 0.04,
    marginBottom: 20,
    textAlign: 'center',
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
  },
});

export default GetStarted;
