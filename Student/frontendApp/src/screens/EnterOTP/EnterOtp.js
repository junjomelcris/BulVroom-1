import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, } from 'react-native';
import Logo from '../../../assets/images/carstarted.png';
import Logo1 from '../../../assets/images/bulv.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomInputs from '../../components/CustomInputs/CustomInputs';

const OTP = () => {
  const navigation = useNavigation();

  const onOTPPressed = () => {
    navigation.navigate('ResetPW');
  };
  const onBack = () =>{
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
    <View style={styles.div1}>
      <Text style={styles.forgotlabel}></Text>
     </View>
     <View style={styles.div1}>
      <Text style={styles.frgt}>Enter your OTP</Text>
     </View>
     <View style={styles.div2}>
      <Text style={styles.frgtdeets}>We sent an OTP code in your email.</Text>
     </View>
     <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        // Other TextInput props like onChangeText, value, etc.
      />
     <View style={styles.container}>
     <View style={styles.container11}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onOTPPressed}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.forgot} onPress={onBack}>Go back to Log in</Text>
    </View>
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
  div1: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frgt: {
    marginTop: -220,
    color: 'black', // Set text color to red
    fontSize: 21,

  },
  forgot: {
    color: 'black', // Set text color to red
    textDecorationLine: 'underline',
  },
  div2: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frgtdeets: {
    marginTop: -145,
    textAlign: 'center',
    color: 'black', // Set text color to red
    fontSize: 14,
  },
  input: {
    width: '80%',
    height: 40,
    marginTop: -15,
    borderWidth: 1, // Add a border
    borderColor: 'gray', // Border color
    borderRadius: 5, // Border radius for rounded corners
    paddingLeft: 10, // Add left padding for better appearance
    paddingRight: 10, // Add right padding for better appearance
    fontSize: 16,
  },
  forgotlabel: { //white container
    position: 'absolute',
    flex: 0.5, // This ensures the container takes up all available space
    backgroundColor: 'white', // Set the background color if needed
    paddingVertical: 140, // Padding at the top and bottom
    paddingHorizontal: 168, // Padding on the left and right
    marginLeft: -168,
    marginTop: -170,
    alignItems: 'center', // Align content horizontally (centered in this case)
    borderRadius: windowWidth * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  container11: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 145,
  },
  buttonContainer: {
    marginTop: 90,
    marginBottom: 30,
    padding: 10, // Add padding for better appearance
    borderRadius: 50, // Border radius for rounded corners if desired
    backgroundColor: '#2ecc71',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white', // Text color
    paddingHorizontal: 80,
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -windowHeight * 0.01,
  },
  imageContainer1: {
    position: 'absolute',
    top: windowHeight * .162,
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
  container: {
    position: 'absolute',
    paddingHorizontal: windowWidth * 0.1,
    paddingBottom: windowHeight * 0.10,
    marginTop: 20,
  },
  bottomContainer: {
    width: '250%',
    marginLeft: -36,
    marginTop: 160,
    borderColor: 'black'
  },
  btn: {
    padding: 50,
    width: '48%',
    borderRadius: windowWidth * 0.05,
    fontSize: windowWidth * 0.04,
    
  },
  

});

export default OTP;