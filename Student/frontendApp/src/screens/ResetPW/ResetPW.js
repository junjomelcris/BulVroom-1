import { View, Text ,Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/images/bulv.png'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs/forgotpw';
import CustomInputs2 from '../../components/CustomInputs/forgotpw2';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';


const ResetPW = () => {
    const [password, setPassword] = useState('');



    const navigation = useNavigation();
    //BTN Function

    const onResetPWPressed = () =>{
      navigation.navigate('SignIn');
    };
    
    /* const onSignInPressed = () =>{
      if(username.trim() === '' || password.trim() === ''){
        ToastAndroid.show('Please Enter Username and Password',ToastAndroid.SHORT);
        return;
      }else{
        axios.post ('http://192.168.1.83:5000/login/app',{
          username:username,
          password:password,
        }).then((response) => {
          console.log(response.data.message);
        if(response.data.message === 'User found'){
          
          AsyncStorage.setItem('username', username);
          AsyncStorage.setItem('id', response.data.id.toString());
          setUsername(''); // Clear the username input
          setPassword(''); // Clear the password input
          navigation.navigate('Started');
          
        }
        else
        {
          ToastAndroid.show('User not Exist',ToastAndroid.SHORT);
        }
        });
      }  
    }; */

    const onForgot = () =>{
      navigation.navigate('Forgot');
    };

    const onCreate = () =>{
      //console.warn('Sign Up');

      navigation.navigate('SignUp');
    };
  return (
    <View style={styles.root}>
          <View style={styles.imageContainer1}>
        <Image source={Logo} resizeMode='cover' style={styles.image1} />
      </View>
      <View style={styles.div1}>
      <Text style={styles.forgotlabel}></Text>
      <Text style={styles.frgt}>Enter your new password</Text>
     </View>
      <CustomInputs
       mode="outlined"
       label="New Password"
       placeholder="Enter Password"
       onChangeText={(e) => setPassword(e)}
       secureTextEntry={true}/>
             <CustomInputs2

       mode="outlined"
       label="Confirm Password"
       placeholder="Enter Password"
       onChangeText={(e) => setPassword(e)}
       secureTextEntry={true}/>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onResetPWPressed}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      
        
    </View>
  )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
        root:{
            alignItems:'center',
            backgroundColor:'#2ecc71',
            width:'100%',
            height:'100%',
        },
        frgt: {
            marginTop: -220,
            color: 'black', // Set text color to red
            fontSize: 21,
        
          },
        div1: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 390,
          },
          forgotlabel: { //white container
            position: 'absolute',
            flex: 0.5, // This ensures the container takes up all available space
            backgroundColor: 'white', // Set the background color if needed
            paddingVertical: 140, // Padding at the top and bottom
            paddingHorizontal: 168, // Padding on the left and right
            marginLeft: -168,
            marginTop: -150,
            alignItems: 'center', // Align content horizontally (centered in this case)
            borderRadius: windowWidth * 0.05,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          },
        image1: {
            position: 'absolute',
            top: windowHeight * -0.40,
            left: windowWidth * -1.3,
            width: windowWidth * 2.2,
            height: windowWidth * 2.90,
            opacity: 0.2,
          },
        imageContainer1: {
            position: 'absolute',
            top: windowHeight * 0.092,
            left: windowWidth * 0.50,
            width: 2, // Increase the size of the circle
            height:  2, // Increase the size of the circle
          },
        buttonText: {
            fontSize: 16,
            color: 'white', // Text color
            paddingHorizontal: 80,
          },
          buttonContainer: {
            marginTop: 25,
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

        logo:{
          
            maxWidth:500,
            maxHeight: 400,
            width:'70%',
            marginVertical:50,
            
        },
        forgot:{
          textDecorationLine: 'underline',
            fontSize:16,
            color:'black',
            marginVertical:10
            
        },
});

export default ResetPW;