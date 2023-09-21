import { View,
   Text ,
   Image, 
   StyleSheet,
Dimensions,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native'
import Logo from '../../../assets/images/Mindmatters.png'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
const  {width,height} = Dimensions.get('window');

const SignUpScreen = () => {
  const [Fullname, setFullname] = useState('');
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Cpassword, setCPassword] = useState('');
    const [StudID, setStudID] = useState('');
    const navigation = useNavigation();
    //BTN Function
    const onSignInPressed = () => {
      navigation.navigate('SignIn');
      /* if (Username.trim() === '' || Email.trim() === '' || password.trim() === '') {
        ToastAndroid.show('Field must not be empty.',ToastAndroid.SHORT);
        return;
      }
    
      if (password !== Cpassword) {
        console.warn('Password not the same');
      } else {
        axios
          .post('http://192.168.1.83:5000/register/app', {
            fullname: Fullname,
            username: Username,
            email: Email,
            password: password,
            stud_no: StudID,
          })
          .then((response) => {
            console.log(response.data.message);
            // Check the response for the status code indicating username already exists
            if (response.data.message === 'Username already exists') {
              ToastAndroid.show('User Already Exists',ToastAndroid.SHORT);
            } else if (response.data.message === 'User registered successfully') {
              ToastAndroid.show('Registered Successfully',ToastAndroid.SHORT);
              navigation.navigate('SignIn');
            }
          })
          .catch((error) => {
            console.error(error);
            // Handle other error scenarios if needed
          });
      }*/
    };
    const onCreate = () =>{
      navigation.navigate('SignIn');
    };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style ={{height: height * 1}}>
    <View style={styles.root}>
  
    <Text style={styles.title}>Sign Up</Text>
    
    <CustomInputs 
    onChangeText={(e) => setFullname(e)}
     mode="outlined"
     label="Fullname"
     placeholder="Enter Fullname"
   />

    <CustomInputs 
    onChangeText={(e) => setUsername(e)}
     mode="outlined"
     label="Username"
     placeholder="Enter Username"
   />
<CustomInputs 
    onChangeText={(e) => setEmail(e)}
     mode="outlined"
     label="Email"
     placeholder="Enter Email"
   />
   <CustomInputs 
      onChangeText={(e) => setStudID(e)}
     mode="outlined"
     label="Student ID"
     placeholder="Enter Student ID"
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