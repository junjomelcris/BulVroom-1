import { View,
  Text ,
  Image, 
  StyleSheet,
Dimensions,
 ScrollView,
 ToastAndroid,
 TouchableOpacity,
} from 'react-native'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
const  {width,height} = Dimensions.get('window');
import axios from 'axios';

const SignUpScreen = () => {
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [Cpassword, setCPassword] = useState('');
   const [contact, setContact] = useState('');
   const [address, setAddress] = useState('');
   const navigation = useNavigation();
   //BTN Function
   const onSignInPressed = () => {
     navigation.navigate('SignIn');
      if (email.trim() === '' || password.trim() === '') {
       ToastAndroid.show('Field must not be empty.',ToastAndroid.SHORT);
       return;
     }
   
     if (password !== Cpassword) {
       console.warn('Password not the same');
     } else {
       axios
         .post('http://192.168.100.152:8082/register/app', {
           fName :fName,
           lName :lName,
           email : email,
           password : password,
           address : address,
           contact : contact
         })
         .then((response) => {
           console.log(response.data.message);
           // Check the response for the status code indicating username already exists
           if (response.data.message === 'email already exists') {
             ToastAndroid.show('Email Already Exists',ToastAndroid.SHORT);
           } else if (response.data.message === 'User registered successfully') {
             ToastAndroid.show('Registered Successfully',ToastAndroid.SHORT);
             navigation.navigate('SignIn');
           }
         })
         .catch((error) => {
           console.error(error);
           // Handle other error scenarios if needed
         });
     }
   };
   const onCreate = () =>{
     navigation.navigate('SignUp');
   };

 return (
   <ScrollView showsVerticalScrollIndicator={false} style ={{height: height * 1}}>
   <View style={styles.root}>
 
   <Text style={styles.title}>Sign Up</Text>
   
   <CustomInputs 
   onChangeText={(e) => setfName(e)}
    mode="outlined"
    label="First name"
    placeholder="Enter First Name"
  />
  <CustomInputs 
   onChangeText={(e) => setlName(e)}
    mode="outlined"
    label="Last name"
    placeholder="Enter Last Name"
  />

<CustomInputs 
   onChangeText={(e) => setEmail(e)}
    mode="outlined"
    label="Email"
    placeholder="Enter Email"
  />
  <CustomInputs 
     onChangeText={(e) => setContact(e)}
    mode="outlined"
    label="Contact"
    placeholder="Enter Contact"
  />
     <CustomInputs 
   onChangeText={(e) => setAddress(e)}
    mode="outlined"
    label="Address"
    placeholder="Enter Address"
  />
<CustomInputs
   onChangeText={(e) => setPassword(e)}
    mode="outlined"
    label="Password"
    placeholder="Enter Password"
    secureTextEntry={true}/>


<CustomInputs
    onChangeText={(e) => setCPassword(e)}
    mode="outlined"
    label="Confirm Password"
    placeholder="Enter Confirm Password"
    secureTextEntry={true}/>    
<TouchableOpacity style ={{width:width* 0.90}} onPress={onSignInPressed}>
<CustomButton  
     
     style={styles.btn}
     mode="elevated" 
     text="Register"
     labelStyle={{ color: 'green' ,fontWeight:'bold',fontSize:20}}
     />
     </TouchableOpacity>
     <Text style={styles.text}>Already have an account?<Text style={{color:'#59C4CB'}} onPress={onCreate}> Sign In</Text></Text>
 </View>
   </ScrollView>

  
 )
}
const styles = StyleSheet.create({
   root:{
       alignItems:'center',
       padding: 20,
       backgroundColor: '#4CA456',
       height: height * 1,
   },
   circle: {
     position: 'absolute',
     top: -150,
     right: -50,
     width: 224,
     height: 216,
     borderRadius: 110,
     backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
   },
   circle2: {
     position: 'absolute',
     top: -50,
     right: -100,
     width: 224,
     height: 216,
     borderRadius: 110,
     backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
   },
   forgot:{
       fontSize:16,
       color:'#EF5757',
       marginVertical:10
   },
   text:{
   fontFamily:'poppins',
   color:'black',
   fontSize:14,
   marginVertical:0,
   letterSpacing:1.2,
   },
   title:{
       fontFamily:'poppins',
       fontSize:30,
       letterSpacing:1.5,
       marginVertical:5,
       fontWeight:'bold',
       color:'black',
       margin:10,
   },
   btn:{
       marginVertical:50,
      
   }
});

export default SignUpScreen