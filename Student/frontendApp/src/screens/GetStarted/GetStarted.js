import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'RENTING MADE EASY',
      description: 'Your Key to Easy Vehicle Rentals',
      animation: require('../../../assets/images/car.json'),
      nextScreen: 'Started2',
    },
    {
      title: 'DIVERSE FLEET',
      description: 'No more hassles in finding the perfect vehicle for your trip',
      animation: require('../../../assets/images/vehicle.json'),
      nextScreen: 'Started3',
    },
    {
      title: "LET'S RIDE",
      description: "Let us put you in the driver's seat of your adventure",
      animation: require('../../../assets/images/ride.json'),
      nextScreen: 'Homes',
    },
  ];

  const onGetStartedPressed = (nextScreen) => {
    navigation.navigate(nextScreen);
  };

  const onSkipButtonPressed = () => {
    navigation.navigate('SignIn');
  };

  const onIndexChanged = (index) => {
    setActiveSlide(index);
  };

  const onNextButtonPressed = () => {
    const nextIndex = activeSlide + 1;
    if (nextIndex < slides.length) {
      swiperRef.current.scrollBy(1);
    } else {
      onGetStartedPressed(slides[activeSlide].nextScreen);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        loop={false}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={onIndexChanged}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.circlenimage}>
              
              <View style={styles.imageContainer}>
                <LottieView
                  source={slide.animation}
                  autoPlay
                  loop={true}
                  style={styles.lottieAnimation}
                />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.appName}>{slide.title}</Text>
              <Text style={styles.appDescription}>{slide.description}</Text>
              <Text style={styles.appContent}>
  Explore a wide range of vehicles tailored to your journey at BULVROOM. Find the perfect ride for your every adventure, ensuring a seamless and comfortable travel experience.
</Text>


            </View>
          </View>
        ))}
      </Swiper>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          {slides.map((_, i) => (
            <Text key={i} style={i === activeSlide ? styles.dot : styles.dot2}>
              •
            </Text>
          ))}
        </View>
        {activeSlide === slides.length - 1 ? (
          <TouchableOpacity onPress={() => onGetStartedPressed(slides[activeSlide].nextScreen)} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onNextButtonPressed} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
        {activeSlide === slides.length - 1 ? (
          <TouchableOpacity onPress={onSkipButtonPressed} style={styles.skipButton}>
            <Text style={styles.skipButtonText}></Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onSkipButtonPressed} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>SKIP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBackground: {
    position: 'absolute',
    top: windowHeight * 0.1 - windowWidth * 0.4,
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
    color: '#2ec771',
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
    transform: [{ rotate: '180deg' }],
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
    fontFamily: 'Roboto',
    fontSize: windowWidth * 0.08,
    marginBottom: 10,
  },
  appDescription: {
    color: '#555',
    fontFamily: 'Roboto',
    fontSize: windowWidth * 0.04,
    marginBottom: 20,
  },
  appContent: {
    fontSize: windowWidth * 0.04,
    color: '#777',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#2ec771',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 35,
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  skipButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 35,
    marginTop: 10,
  },
  skipButtonText: {
    color: 'black',
    textDecorationLine: 'underline',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
});

export default OnboardingScreen;
