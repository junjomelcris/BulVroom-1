import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GetStarted from '../screens/GetStarted/GetStarted';
import GetStarted2 from '../screens/GetStarted/GetStarted2';
import GetStarted3 from '../screens/GetStarted/GetStarted3';
import EnterOtp from '../screens/EnterOTP/EnterOtp';
import ResetPW from '../screens/ResetPW/ResetPW';
import SplashScreens from '../screens/SplashScreen/SplashScreen';
import ForgotScreens from '../screens/ForgotScreen/ForgotScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import RateScreen from '../screens/RateScreen/Rates';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import EditScreen from '../screens/EditScreen/EditScreen';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import NewChat from '../screens/ChatScreen/NewChat';
import Vehicles from '../screens/Vehicles/Vehicles';
import DashBoardScreen from '../screens/DashBoardScreen/DashBoardScreen'; // Import DashBoardScreen
import DashboardVehicles from '../screens/DashBoardScreen/DashboardVehicles';
import AddVehicle from '../screens/Vehicles/AddVehicle';
import VehicleDetailsScreen from '../screens/Vehicles/VehicleDetailsScreen';
import RenterBookings from '../screens/BookingScreen/RenterBookings';
import BookingScreen from '../screens/BookingScreen/BookingScreen';
import VerificationScreen from '../screens/SignUpScreen/VerificationScreen/VerificationScreen';
//import BookingScreen from '../screens/BookingScreen/BookingScreen';


const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Delay for 5 seconds (5000 milliseconds)
  }, []);

  const Stack = createNativeStackNavigator();

  if (isLoading) {
    return <SplashScreens />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Started" component={GetStarted} />
        <Stack.Screen name="Started2" component={GetStarted2} />
        <Stack.Screen name="Started3" component={GetStarted3} />
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
        <Stack.Screen name="Rates" component={RateScreen} />
        <Stack.Screen name="AddVehicle" component={AddVehicle} />
        <Stack.Screen name="VehicleDetailsScreen" component={VehicleDetailsScreen} />
        <Stack.Screen name="DashboardVehicles" component={DashboardVehicles} />
        <Stack.Screen name="RenterBookings" component={RenterBookings} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="verify" component={VerificationScreen} /> 
        {/*<Stack.Screen name="BookingScreen" component={BookingScreen} />*/}

        
        {/* Add DashBoardScreen route with the parameter */}
        <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
