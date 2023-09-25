import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Searchbar, Card as PaperCard } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MyComponent = ({ imageSource, label, label2, rate, itemData, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(true);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    onToggleFavorite(itemData, !isFavorite);
  };

  return (
<PaperCard style={styles.card}>
  <View style={styles.fave}>
    {/* Container for text elements */}
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.label2}>{label2}</Text>
      <Text style={styles.rate}>{rate}</Text>
    </View>
  </View>
</PaperCard>

  );
};

const DashBoardScreen = () => {
  const navigation = useNavigation();

  const [cardData, setCardData] = useState([

  ]);
  const onBackPressed = () => {
    navigation.navigate('Homes');
  };

  const myComponents = cardData.map((item) => (
    <MyComponent
      key={item.id}
      imageSource={item.imageSource}
      label={item.label}
      label2={item.label2}
      rate={item.rate}
      itemData={item}

    />
  ));

  const pairs = [];
  for (let i = 0; i < myComponents.length; i += 2) {
    pairs.push(
      <View key={i / 2} style={styles.row}>
        {myComponents.slice(i, i + 2)}
      </View>
    );
  }

  return (
    <View style={styles.container}>
<View style={styles.title}>
  <TouchableOpacity onPress={onBackPressed}>
    <Icon name="arrow-back" style={styles.back}></Icon>
  </TouchableOpacity>
  <View style={styles.titleCenter}>
    <Icon name="cash-outline" style={styles.title2}></Icon>
    <Text style={styles.titleText}>Rates Guide</Text>
  </View>
</View>

<View style={styles.conta}>
  <Image
        source={require('../../../assets/images/tariff.png')}
        style={styles.img}
      />
  </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
        flex: 1,
    width: width * 1,
    height: height,
    backgroundColor: '#509D58',
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
  },
  scrollView: {
    height: '100%',
    width: '100%', // Occupy the entire width
    marginTop: 10,

  },
  imageContainer: {
    width: '93%', // Occupy the entire width
    margin: 5,
    alignItems: 'center', // Center the image horizontally
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontWeight: '800',
  },
  textContainer: {
    flexDirection: 'column',
    // Add any other styles you need for spacing, alignment, etc.
  },
  
  fave: {
    flexDirection: 'row',
    marginRight: 15,
  },
  label2: {
    fontSize: 16,
  },
  conta: {
    flex: 1,
    top: -130,
    alignItems: 'center',
  },
  img: {
    marginTop: 100,
    width: '100%', // Use the full width of the screen
    height: '100%', // Use the full height of the screen
    resizeMode: 'contain', // Adjust the image's aspect ratio to cover the entire screen
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    color: 'black',
    fontSize: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  back: {
    fontSize: 30,
    color: 'black', // Adjust the color as needed
  },
  titleCenter: {
    flex: 1, // This allows the center content to take up available space
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
  },
  title2: {
    fontSize: 30,
    color: 'black', // Adjust the color as needed
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', // Adjust the color as needed
  },
  rate: {
    fontSize: 15,
    color: '#1b944e',
    fontWeight: '800',
  },
  notificationIcon: {
    fontSize: 30,
    color: '#2ecc71',
    marginTop: -3,
    marginLeft: 9,
    marginRight: 10,
  },
  card: {
    paddingHorizontal: 5,
    margin: 5,

  },
  row: {
    flexDirection: 'column',

  },
  icons: {
    fontSize: 30,
  },
});

export default DashBoardScreen;
