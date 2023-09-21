import { View, Text ,Image, StyleSheet, useWindowDimensions,ToastAndroid,
  TouchableOpacity,Dimensions} from 'react-native'
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/images/bulv.png'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';

const {width,height} = Dimensions.get('window');

const SignInScreen = () => {
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const navigation = useNavigation();
    //BTN Function

    const onSignInPressed = () =>{
      navigation.navigate('Homes');
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
    
       <View style={styles.circle} />
          
      <Image source={Logo} style={[styles.logo, {height:height * 0.3}]}  resizeMode='contain'/>
      <CustomInputs 
       mode="outlined"
       label="Username"
       placeholder="Enter Username"
       onChangeText={(e) => setUsername(e)}
     />
      <CustomInputs
       mode="outlined"
       label="Password"
       placeholder="Enter Password"
       onChangeText={(e) => setPassword(e)}
       secureTextEntry={true}/>
      <Text style={styles.forgot} onPress={onForgot}>Forgot Password</Text>
        <TouchableOpacity  onPress={onSignInPressed} style={{width:width * 0.90}}>
          
        
        <CustomButton 
       
        mode="elevated" 
        text="Sign in" />
        </TouchableOpacity>

        <Text style={styles.text1}>Don't have an Account?  <Text style={styles.text2} onPress={onCreate}>Create one</Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
        root:{
            alignItems:'center',
            backgroundColor:'#2ecc71',
            width:width * 1,
            height:height * 1,
        },
        circle: {
          position: 'absolute',
          top: 50,
          left: 75,
          width: 244,
          height: 236,
          borderRadius: 200,
          backgroundColor: 'white',  // Adjust the color of the circle as desired
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 5,
        },

        logo:{
          
            maxWidth:500,
            maxHeight: 400,
            width:width * 0.70,
            marginVertical:50,
            
        },
        forgot:{
          textDecorationLine: 'underline',
            fontSize:16,
            color:'black',
            marginVertical:10
            
        },
        text1:{
        fontFamily:'poppins',
        fontSize:14,
        color:'white',
        marginVertical:'20%',
        letterSpacing:1.5,
        },

        text2:{
        fontSize:16,
        color:'black', 
        textDecorationLine: 'underline',
        }
});

export default SignInScreen