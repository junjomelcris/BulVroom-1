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
    <Image source={imageSource} style={styles.image} />
    
    {/* Container for text elements */}
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.label2}>{label2}</Text>
      <Text style={styles.rate}>{rate}/ Day</Text>
      <TouchableOpacity onPress={toggleFavorite}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          style={[styles.icons, { color: isFavorite ? 'red' : 'gray' }]}
        />
      </TouchableOpacity>
    </View>
  </View>
</PaperCard>

  );
};

const DashBoardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const navigation = useNavigation();

  const [cardData, setCardData] = useState([
    {
      id: '1',
      imageSource: require('../../../assets/images/86.jpg'),
      label: 'Toyota 86',
      label2: '2 seater',
      rate: '$50',
    },
  ]);

  const toggleFavorite = (item, isFavorite) => {
    const updatedCardData = cardData.map((card) =>
      card.id === item.id ? { ...card, isFavorite } : card
    );
    setCardData(updatedCardData);
  };

  const navigateToFavoriteScreen = () => {
    const favoriteItems = cardData.filter((item) => item.isFavorite);
    navigation.navigate('Favorite', { favoriteItems: cardData.filter(item => item.isFavorite) });
  };

  const myComponents = cardData.map((item) => (
    <MyComponent
      key={item.id}
      imageSource={item.imageSource}
      label={item.label}
      label2={item.label2}
      rate={item.rate}
      itemData={item}
      onToggleFavorite={toggleFavorite}
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
    <Text style={styles.title}>My Favorites</Text>
      <ScrollView style={styles.scrollView}>
        {pairs}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 1,
    height: height,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
  },
  scrollView: {
    height: '100%',
    width: '100%', // Occupy the entire width
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 30,
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
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71', // Background color for the header
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    paddingVertical: 10, // Vertical padding for the header
    paddingHorizontal: 16, // Horizontal padding for the header
    elevation: 2, // Add shadow to the header for an elevated look (Android)
    borderBottomWidth: 1, // Add a bottom border for separation
    borderBottomColor: '#ccc', // Color of the bottom border
  },
  rate: {
    fontSize: 15,
    color: '#1b944e',
    fontWeight: '800',
  },
  searchBarContainer: {
    marginTop: 13,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    width: '100%',
  },
  searchBar: {
    flex: 1,
    height: 45,
    backgroundColor: 'white',
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
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  icons: {
    fontSize: 30,
  },
  image: {
    marginRight: 10,
    width: 230,
    height: 150,
    borderRadius: 5,
  },
});

export default DashBoardScreen;
