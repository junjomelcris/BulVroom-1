import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions,} from 'react-native';

import Logo1 from '../../../assets/images/bulv.png';

import LottieView from 'lottie-react-native';
const GetStarted = () => {

  const MyComponent = () => {
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      const windowWidth = Dimensions.get('window').width;
      const imageWidth = windowWidth; // Set the image width to the window width
      const imageHeight = imageWidth * (originalImageHeight / originalImageWidth); // Calculate the image height to maintain aspect ratio
  
      setImageDimensions({ width: imageWidth, height: imageHeight });
    }, []);
  
    // Replace these values with your actual image dimensions
    const originalImageWidth = 800;
    const originalImageHeight = 600;
  
    return (
      <View>
        <Image
          source={{ uri: '../../../assets/images/bulv.png' }}
          style={{ width: imageDimensions.width, height: imageDimensions.height }}
        />
      </View>
    );
  };
  
  return (
    <View style={styles.root}>

      <View style={styles.imageContainer}>
          {/* Replace the Image with LottieView */}
          <LottieView
            source={require('../../../assets/images/splash.json')} // Replace with the path to your Lottie JSON file
            autoPlay
            loop={true} // Make the animation loop
            style={styles.lottieAnimation} // Add a style for your Lottie animation
          />
        <Image source={Logo1} resizeMode='contain' style={styles.image} />
      </View>
      <Text style={styles.appName}>Bulvroom</Text>


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
    backgroundColor: 'white',
  },
  circle: {
    position: 'absolute',
    top: windowHeight * 0.306,
    left: windowWidth * 0.15,
    width: windowWidth * 0.7, // Increase the size of the circle
    height: windowWidth * 0.7, // Increase the size of the circle
    borderRadius: windowWidth * 0.5, // Adjust the border radius accordingly
    backgroundColor: '#56e894', // Adjust the color of the circle as desired
  },
  circle2: {
    position: 'absolute',
    top: windowHeight * 0.33,
    left: windowWidth * 0.20,
    width: windowWidth * 0.6, // Increase the size of the circle
    height: windowWidth * 0.6, // Increase the size of the circle
    borderRadius: windowWidth * 0.5, // Adjust the border radius accordingly
    backgroundColor: 'white', // Adjust the color of the circle as desired
  },
  circle3: {
    position: 'absolute',
    top: windowHeight * 0.282,
    left: windowWidth * 0.10,
    width: windowWidth * 0.8, // Increase the size of the circle
    height: windowWidth * 0.8, // Increase the size of the circle
    borderRadius: windowWidth * 0.5, // Adjust the border radius accordingly
    backgroundColor: '#3ad67c', // Adjust the color of the circle as desired
  },
  imageContainer: {
    position: 'absolute',
    top: windowHeight * 0.282,
    left: windowWidth * 0.10,
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer1: {
    position: 'absolute',
    top: windowHeight * 0.092,
    left: windowWidth * 0.50,
    width: 2, // Increase the size of the circle
    height: 2, // Increase the size of the circle
  },
  image: {
    width: '80%',
    height: '80%',
  },
  image1: {
    position: 'absolute',
    top: windowHeight * -0.40,
    left: windowWidth * -1.3,
    width: windowWidth * 2.2,
    height: windowWidth * 3.20,
    opacity: 0.2,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: windowWidth * 0.03,
  },
  welcome: {
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.04,
    marginTop: windowHeight * -0.01,
    marginBottom: windowHeight * 0.01,
  },
  welcome1: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.16,
    marginTop: windowHeight * 0.25,
  },
  content: {
    fontSize: windowWidth * 0.04,
    color: '#ffffff',
    fontFamily: 'Poppins',
    padding: windowHeight * 0.01,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '48%',
    paddingHorizontal: windowWidth * 0.1,
    paddingBottom: windowHeight * 0.10,
  },
  btn: {
    borderRadius: windowWidth * 0.05,
    fontSize: windowWidth * 0.04,
    backgroundColor: 'white',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  appName: {
    fontSize: windowWidth * 0.10, // Adjust the font size as needed
    fontWeight: 'bold',
    color: '#5db370',
    marginTop: 250,
    fontStyle: 'italic'
     // Adjust the margin-top as needed
  },
});

export default GetStarted;
