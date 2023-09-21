import { View ,StyleSheet,Image,ScrollView,Dimensions,ToastAndroid,ImageBackground,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import { Searchbar, Card, Text, Avatar, Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
//Screen route
const { width, height } = Dimensions.get('window');

  


const DashBoardScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const MyComponent = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">4.1</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{margin:10}} />
      <Card.Actions style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
      <Button style={{width:300}}>Rent</Button>
      
    </Card.Actions>
    </Card>
  );

  return (
 
    <View style={styles.container}>
        <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{margin:20,}}
    />

    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
        <Text style={styles.text}>Bicycle</Text>
        <Text style={styles.text}>Bicycle</Text>
        <Text style={styles.text}>Bicycle</Text>
        <Text style={styles.text}>Bicycle</Text>
    </View>
    <ScrollView style={{height:height * 1 , marginBottom:80}}>
      <MyComponent/>
      <MyComponent/>
      <MyComponent/>
      <MyComponent/>
      <MyComponent/>
      <MyComponent/>
      <MyComponent/>
      </ScrollView>
    </View>
   
  )

}
const styles = StyleSheet.create({
    container:{
      width: width * 1,
      height:height,
      
    },
    text:{
      fontSize:15,
      fontWeight:'800'
    },
    card:{
      margin:20,
    },
})
export default DashBoardScreen