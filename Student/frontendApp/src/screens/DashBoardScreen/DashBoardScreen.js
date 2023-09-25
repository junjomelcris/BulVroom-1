import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
import { Searchbar, Card as PaperCard } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

const MyComponent = ({
  imageSource,
  owner,
  ownername,
  label,
  label2,
  feature,
  feature1,
  rate,
  itemData,
  onToggleFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [prevIsFavorite, setPrevIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    onToggleFavorite(itemData, !isFavorite);

    const message = prevIsFavorite ? 'Removed from My Favorites' : 'Added to My Favorites';
    setPrevIsFavorite(!prevIsFavorite);
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setShowFullImage(false);
  };

  const toggleShowFullImage = () => {
    setShowFullImage((prevShowFullImage) => !prevShowFullImage);
  };

  const navigation = useNavigation();

  return (
    <PaperCard style={styles.card}>
      <TouchableOpacity onPress={openModal}>
        <View>
          <Image source={imageSource} style={styles.image} />
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.label2}>{label2}</Text>
          <View style={styles.rateContainer}>
            <Text style={styles.rate}>{rate}/ Day</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                style={[styles.icons, { color: isFavorite ? 'red' : 'gray' }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContainer1}>
            {showFullImage ? (
              <TouchableOpacity onPress={toggleShowFullImage}>
                <Image source={imageSource} style={styles.FullImage} />
              </TouchableOpacity>
            ) : (
              <View style={styles.imgmodal}>
                <TouchableOpacity onPress={toggleShowFullImage}>
                  <Image source={imageSource} style={styles.Modalimage} />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.rateContainer}>
              <Text style={[styles.label, { fontSize: 25 }]}>{label}</Text>
              <TouchableOpacity onPress={toggleFavorite}>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  style={[styles.icons, { color: isFavorite ? 'red' : 'gray' }]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.labell}>
              This is a sample short description of the car.{' '}
            </Text>
            <Text style={styles.label3}>Features: </Text>
            <View style={styles.row}>
              <View style={styles.descriptionColumn}>
                <Text style={styles.multiRowDescription}>{feature}</Text>
              </View>
              <View style={styles.descriptionColumn}>
                <Text style={styles.multiRowDescription}>{feature1}</Text>
              </View>
            </View>
            <Text style={styles.rateModal}>{rate}/ Day</Text>
          </View>
          <View style={styles.infoModal}>
            <Image source={owner} style={styles.modalimage} />
              

            <Text style={styles.infoModal1}>{ownername}</Text>
          </View>
          <View style={styles.infoModal3}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                Linking.openURL('tel:09954047078');
              }}
            >
              <Icon name="call" style={styles.buttonText}></Icon>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                navigation.navigate('NewChat'); // Replace 'ChatScreen' with the name of your ChatScreen component
              }}
            >
              <Icon name="chatbubble" style={styles.buttonText}></Icon>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </PaperCard>
  );
};
//yung names and address, gagawin ko lang na katulad ng sa rate, features and others, kailangan ko rin dagdagan ng marami pang katulad nyan like vehicle type and others 
const DashBoardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const navigation = useNavigation();

  const [cardData, setCardData] = useState([
    {
      id: '1',
      imageSource: require('../../../assets/images/86.jpg'),
      label: 'Toyota 86',
      owner: require('../../../assets/images/luwi.jpg'),
      ownername: 'Cristian Louie',
      feature: '2 seater\nAutomatic\nGas',
      feature1: 'Airconditioned\nEntertainment System\nPower Windows\nSun Roof',
      label2: '2 seater',
      rate: '₱1,500',
    },
    {
      id: '2',
      imageSource: require('../../../assets/images/jimny.jpg'),
      owner: require('../../../assets/images/misis.png'),
      ownername: 'Nathelie Mae Quiloña',
      label: 'Suzuki Jimny',
      feature: '4 seater\nAutomatic\nGas\n4x4 Mode',
      feature1: 'Airconditioned\nEntertainment System\nPower Windows\nSun Roof',
      label2: '4 seater',
      rate: '₱1,500',
    },
    {
      id: '3',
      imageSource: require('../../../assets/images/raptor.jpg'),
      owner: require('../../../assets/images/junnel.jpg'),
      ownername: 'Junnel Balasabas',
      label: 'Ford Raptor',
      label2: '5 seater',
      feature: '4 seater\nAutomatic\nDiesel\n4x4 Mode',
      feature1: 'Airconditioned\nEntertainment System\nPower Windows\nSun Roof',
      rate: '₱1,500',
    },
    {
      id: '4',
      imageSource: require('../../../assets/images/hiace.jpg'),
      label: 'Toyota Hi Ace',
      owner: require('../../../assets/images/eltom.jpg'),
      ownername: 'Eltom John Navarro',
      label2: '12 seater',
      feature: '12 seater\nManual\nDiesel',
      feature1: 'Airconditioned\nEntertainment System\nPower Windows\n',
      rate: '₱1,500',
    },
    {
      id: '5',
      imageSource: require('../../../assets/images/mtb.jpg'),
      label: 'Mountainpeak Vulcan',
      owner: require('../../../assets/images/axl.jpg'),
      ownername: 'Axl Villalon',
      feature: '1 seater\n12 Speed\nHydraulic Brake',
      feature1: 'Hollowtech Crank\nAirfork\n29er',
      label2: '1 seater',
      rate: '₱1,500',
    },
    {
      id: '6',
      imageSource: require('../../../assets/images/nmax.jpg'),
      label: 'Yamaha NMax',
      owner: require('../../../assets/images/jomer.jpg'),
      ownername: 'Jomer Mundo',
      feature: '2 seater\nAutomatic\nRegular Gas',
      feature1: 'RS8 Pulley Set\nMaxxis Tires\nYSS Rear Suspensions',
      label2: '2 seater',
      rate: '₱1,500',
    },
    // Add more card data as needed
  ]);

  const toggleFavorite = (item, isFavorite) => {
    const updatedCardData = cardData.map((card) =>
      card.id === item.id ? { ...card, isFavorite } : card
    );
    setCardData(updatedCardData);
  };

  const onNotifPressed = () => {
    navigation.navigate('NotifScreen');
  };

  const myComponents = cardData.map((item) => (
    <MyComponent
      key={item.id}
      imageSource={item.imageSource}
      owner={item.owner}
      ownername={item.ownername}
      label={item.label}
      label2={item.label2}
      feature={item.feature}
      feature1={item.feature1}
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
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder=""
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <TouchableOpacity onPress={onNotifPressed}>
          <Icon name="notifications" style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <TouchableOpacity style={styles.activeButton}>
          <Text style={styles.text}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={styles.text}>Bicycle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={styles.text}>Motorcycle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={styles.text}>Sedan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={styles.text}>SUV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={styles.text}>Van</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/offer.png')}
            style={styles.offer}
          />
        </View>
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
  FullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  multiRowDescription: {
    marginLeft: 7,
    fontSize: 14,
    marginBottom: 10,
  },
  descriptionColumn: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  activeButton: {
    marginLeft: 10,
    backgroundColor: '#2ecc71',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  inactiveButton: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginLeft: 7,
    fontSize: 15,
    color: 'black',
    fontWeight: '800',
  },
  label2: {
    marginLeft: 7,
    fontSize: 16,
    marginBottom: 15,
  },
  labell: {
    textAlign: 'center',
    marginLeft: 7,
    fontSize: 16,
    marginBottom: 15,
  },
  label3: {
    color: 'black',
    marginLeft: 7,
    fontSize: 16,
  },
  rate: {
    fontSize: 15,
    color: '#1b944e',
    fontWeight: '800',
  },
  rateModal: {
    marginTop: 55,
    marginLeft: 7,
    fontSize: 25,
    color: '#1b944e',
    fontWeight: '800',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 7,
    marginRight: 7,
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
    marginRight: 18,
  },
  card: {
    margin: 5,
    marginBottom: 25,
  },
  icons: {
    fontSize: 30,
  },
  image: {
    width: 160,
    height: 150,
  },
  modalimage: {
    margin: 5,
    width: 90,
    height: 80,
    borderRadius: 1500,
  },
  button: {
    marginTop: 75,
    backgroundColor: '#2ecc71', // Use your desired background color
    borderRadius: 8, // Adjust the border radius for rounded corners
    paddingVertical: 10, // Adjust the button's vertical padding
    paddingHorizontal: 20, // Adjust the button's horizontal padding
    alignSelf: 'center', // Center the button horizontally
  },
  actionButton: {
    backgroundColor: '#138041', // Use your desired background color
    borderColor: 'white',
    color: 'white',
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8, // Adjust the border radius for rounded corners
    alignSelf: 'flex-end', // Align the button to the right

    marginTop: 10, // Add margin from the top if needed
  },
  buttonText: {

    color: 'white', // Use an appropriate text color for readability
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold', // Use a bold font if desired
  },
  Modalimage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: width * 0.9,
    height: 180,
    marginBottom: 10,
  },
  offer: {
    width: 360,
    height: 210,
    marginLeft: 15,
    marginTop: -10,
    marginBottom: 10,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  infoModal: {
    flexDirection: 'row',
    backgroundColor: '#2ecc71',
    width: width * 0.9, // Adjust the width as needed
    position: 'absolute', // Position at the bottom of the modal
    bottom: 133, // Place at the bottom
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  infoModal3: {
    flexDirection: 'row',
     marginBottom: 5,
    width: width * 0.9, // Adjust the width as needed
    position: 'absolute', // Position at the bottom of the modal
    bottom: 133, // Place at the bottom
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,

    justifyContent: 'flex-end',
  },
  infoModal1: {
    color: 'white',
    fontSize: 22,
  },
  infoModal2: {
    marginLeft: 65,
    color: 'white',
    fontSize: 14,
  },
  modalContainer1: {
    backgroundColor: 'white',
    width: width * 0.9, // Adjust the width as needed
    height: height * 0.7, // Adjust the height as needed
    borderRadius: 15,
  },
  imgmodal: {
    alignItems: 'center',
  },
});

export default DashBoardScreen;
