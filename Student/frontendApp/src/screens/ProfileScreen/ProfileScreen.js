import { View, Text,StyleSheet,Image,ScrollView ,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react';
import { Searchbar, Card, Avatar,} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/bulv.png';

const { width, height } = Dimensions.get('window');


const ProfileScreen = () => {
    
  const MyComponent = () => (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.root}>
      <Image style={styles.Logo1} resizeMode='cover' source={Logo} />

    <View style={{width:width * 1, marginTop: 25, margin:10,}}>
    <View style={{flexDirection: 'row',}}>
<Icon name="arrow-back" style={{fontSize: 30, color: 'white',}}></Icon>
<Icon name="person" style={{fontSize: 35, color: 'white',}}></Icon>
<Icon name="checkmark-circle" style={{fontSize: 20, color: 'white',}}></Icon>
<Text style={{color: 'white',}}>Verified{'\n'} 
      Cristian Louie Concepcion</Text>
      
      <Image style={styles.Logo} source={Logo} />
      
      
      </View>
      
      <View style={{marginRight: 20, marginTop: 10,}}>
      <MyComponent></MyComponent>
      <MyComponent></MyComponent>
      <MyComponent></MyComponent>
      <MyComponent></MyComponent>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Logo: {
      marginTop: -15,
      marginLeft: 25,
      width: 84,
      height: 76,
    },
    Logo1: {
      position: 'absolute',
      marginLeft: -230,
      width: 900,
      height: 800,
      opacity: 0.2,
    },
    root: {
      backgroundColor: '#2ecc71',
      height: height,
    },
});

export default ProfileScreen;