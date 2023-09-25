import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GetStarted from '../screens/GetStarted/GetStarted';
import EnterOtp from '../screens/EnterOTP/EnterOtp';
import ResetPW from '../screens/ResetPW/ResetPW';
import SplashScreens from '../screens/SplashScreen/SplashScreen';
import ForgotScreens from '../screens/ForgotScreen/ForgotScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import EditScreen from '../screens/EditScreen/EditScreen';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import NewChat from '../screens/ChatScreen/NewChat';
import Vehicles from '../screens/Vehicles/Vehicles';




const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Delay for 5 seconds (5000 milliseconds)
  }, []);

  const Stack = createNativeStackNavigator();

  if (isLoading) {
    return <SplashScreens />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Started" component={GetStarted} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Forgot" component={ForgotScreens} />
        <Stack.Screen name="OTP" component={EnterOtp} />
        <Stack.Screen name="ResetPW" component={ResetPW} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Homes" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="NotifScreen" component={NotificationScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="NewChat" component={NewChat} />
        <Stack.Screen name="Vehicles" component={Vehicles} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
