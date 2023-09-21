import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import NotificationScreen from '../NotificationScreen/NotificationScreen';
import DashBoardScreen from '../DashBoardScreen/DashBoardScreen';
import LearnScreen from '../LearnScreen/LearnScreen';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();


const HomeScreens = () => (
  <View style={styles.container}>
    <DashBoardScreen />
  </View>
);

const SettingsScreens = () => (
  <View style={styles.container}>
    <LearnScreen/>
  </View>
);



const ChatScreens = () => (
  <View style={styles.container}>
    <Text>Chat Screen</Text>
  </View>
);

const NotificationScreens = () => (
  <View style={styles.container}>
    <NotificationScreen/>
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
        tabBarStyle: { backgroundColor: '#2ecc71',color:'black'},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Car') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Manage') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'settings') {
            iconName = focused ? 'car' : 'car-outline';
          } 

          return <Icon name={iconName} color={"#ffff"} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Car" component={HomeScreens}/>
      <Tab.Screen name="Manage" component={SettingsScreens} />
      <Tab.Screen name="Favorite" component={ChatScreens} />
      <Tab.Screen name="Setting" component={ProfileScreens} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container:{
    width:width * 1,
    alignSelf:'center'
  }
});

export default Apps;
