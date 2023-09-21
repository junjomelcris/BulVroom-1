import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import Logo from '../../../assets/images/carstarted.png';
import Logo1 from '../../../assets/images/bulv.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  const onGetStartedPressed = () => {
    navigation.navigate('SignIn');
  };
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
          <View style={styles.imageContainer1}>
        <Image source={Logo1} resizeMode='cover' style={styles.image1} />
      </View>
      <View style={styles.circle3} />
      <View style={styles.circle} />
      <View style={styles.circle2} />

      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode='contain' style={styles.image} />
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.welcome1}>BulVroom</Text>
        <Text style={styles.welcome}>Bulacan-Wide Vehicle Renting App</Text>
        <Text style={styles.content}>
        Your travel plan is in your hands. With BulVroom, Vehicle renting is now easy with just types and taps. 
        Save time and effort in booking a vehicle for your trips and other errands. 
        Let's start your happy driving journey now.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
      <TouchableOpacity onPress={onGetStartedPressed}>
        <CustomButton text="Let's Go"/>
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
    backgroundColor: '#2ecc71',
  },
  circle: {
    position: 'absolute',
    top: windowHeight * 0.106,
    left: windowWidth * 0.15,
    width: windowWidth * 0.7, // Increase the size of the circle
    height: windowWidth * 0.7, // Increase the size of the circle
    borderRadius: windowWidth * 0.5, // Adjust the border radius accordingly
    backgroundColor: '#56e894', // Adjust the color of the circle as desired
  },
  circle2: {
    position: 'absolute',
    top: windowHeight * 0.13,
    left: windowWidth * 0.20,
    width: windowWidth * 0.6, // Increase the size of the circle
    height: windowWidth * 0.6, // Increase the size of the circle
    borderRadius: windowWidth * 0.5, // Adjust the border radius accordingly
    backgroundColor: 'white', // Adjust the color of the circle as desired
  },
  circle3: {
    position: 'absolute',
    top: windowHeight * 0.082,
    left: windowWidth * 0.10,
    width: windowWidth * 0.8, // Increase the size of the circle
    height: windowWidth * 0.8, // Increase the size of the circle
    borderRadius: windowWidth * 0.5, // Adjust the border radius accordingly
    backgroundColor: '#3ad67c', // Adjust the color of the circle as desired
    
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -windowHeight * 0.01,
  },
  imageContainer1: {
    position: 'absolute',
    top: windowHeight * 0.092,
    left: windowWidth * 0.50,
    width: 2, // Increase the size of the circle
    height:  2, // Increase the size of the circle
  },
  image: {
    position: 'absolute',
    top: windowHeight * -0.085,
    left: windowWidth * -0.4,
    width: windowWidth * 0.8,
    height: windowWidth * 0.60,
  },
  image1: {
    position: 'absolute',
    top: windowHeight * -0.40,
    left: windowWidth * -1.3,
    width: windowWidth * 2.2,
    height: windowWidth * 2.90,
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

});

export default GetStarted;
