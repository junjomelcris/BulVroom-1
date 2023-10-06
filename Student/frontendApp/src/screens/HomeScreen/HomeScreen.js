import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import DashBoardScreen from '../DashBoardScreen/DashBoardScreen';
import ChatScreen from '../ChatScreen/ChatScreen';
import FavoriteScreen from '../FavoriteScreen/FavoriteScreen';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();


const HomeScreens = () => (
  <View style={styles.container}>
    <DashBoardScreen />
  </View>
);

const ChatScreens = () => (
  <View style={styles.container}>
    <ChatScreen />
  </View>
);


const FaveScreen = () => (
  <View style={styles.container}>
        <FavoriteScreen />
  </View>
);

const ProfileScreens = () => (
  <View style={styles.container}>
    <ProfileScreen />
  </View>
);

const Apps = () => {
  return (
<Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarLabelStyle: { fontWeight: 'bold' },
    tabBarStyle: { backgroundColor: '#2ecc71' },
    tabBarIcon: ({ focused, size }) => {
      let iconName;

      if (route.name === 'Car') {
        iconName = focused ? 'car' : 'car-outline';
      } else if (route.name === 'Search') {
        iconName = focused ? 'search' : 'search';
      } else if (route.name === 'Favorite') {
        iconName = focused ? 'heart' : 'heart-outline';
      } else if (route.name === 'Settings') {
        iconName = focused ? 'settings' : 'settings-outline';
      }

      return <Icon name={iconName} color={focused ? 'black' : 'white'} size={size} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: 'black', // Color when active
    inactiveTintColor: 'white', // Color when inactive
  }}
>
  <Tab.Screen name="Car" component={HomeScreens} />
  {/*<Tab.Screen name="Search" component={SearchScreens} />*/}
  <Tab.Screen name="Search" component={ChatScreens} />
  <Tab.Screen name="Favorite" component={FaveScreen} />
  <Tab.Screen name="Settings" component={ProfileScreens} />
</Tab.Navigator>

  );
};

const styles = StyleSheet.create({
  container:{
    width:width * 1,
  }
});

export default Apps;
