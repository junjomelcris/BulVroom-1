import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { Searchbar, Card as PaperCard, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RefreshControl } from 'react-native';

const { width, height } = Dimensions.get('window');

const Card = ({ data }) => {
    const cancelBooking = async () => {
        try {
            Alert.alert("Cancel Booking",
                "Do you want to cancel this booking?",
                [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            const response = await axios.delete(`https://bulvroom.onrender.com/mybookings/delete/${data.transaction_id}`);
                            if (response.status == 204) {
                                Alert.alert("My Bookings", "Booking Cancellation Successful.");
                            }
                        },
                    },
                    {
                        text: 'No',
                        onPress: () => console.log('No Pressed'),
                    },
                ]);
        } catch (error) {
            console.log('Failed to delete:', error);
        }
    }

    console.log(data.transaction_status);

    return (
        <PaperCard style={styles.card} key={data.transaction_id}>
            <View style={styles.fave}>
                {/* Container for text elements */}
                <View style={styles.row}>
                    <Image source={{
                        uri: data.vehicle_image
                    }} style={styles.VecImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.vehicleTitle}>{data.make} {data.model}</Text>
                        <Text style={styles.vehicleInfo}>Type: {data.data}</Text>
                        <Text style={styles.vehicleInfo}>Rental Price: {data.rate}</Text>
                        <Text style={styles.vehicleStatus}>{data.transaction_status === 1 ? "Pending" : "Approved"}</Text>
                        <Button onPress={cancelBooking}>Cancel Booking</Button>
                    </View>
                </View>
            </View>
        </PaperCard>
    );
};

const MyBooking = () => {
    const navigation = useNavigation();
    const [cardData, setCardData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = async () => {
        const user_id = await AsyncStorage.getItem('id');
        try {
            const response = await axios.get(`https://bulvroom.onrender.com/mybookings/${user_id}`);
            setCardData(response.data);
            setRefreshing(false);
        } catch (error) {
            console.log('Failed to fetch notifications data:', error);
            setRefreshing(false);
        }
    }

    const onBackPressed = () => {
        navigation.navigate('Homes');
    };

    const onRefresh = () => {
        setRefreshing(true);
        getBookings();
    };

    const Cards = cardData.map((item) => (
        <Card
            data={item}
        />
    ));

    const pairs = [];
    for (let i = 0; i < Cards.length; i += 2) {
        pairs.push(
            <View key={i / 2} style={styles.row}>
                {Cards.slice(i, i + 2)}
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
                    <Icon name="car-sport-outline" style={styles.title2}></Icon>
                    <Text style={styles.titleText}>My Booking</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
        fontWeight: '900',
        color: 'black', // Adjust the color as needed
    },
    date_time: {
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
    VecImage: {
        width: 150, // Set the width of the image
        height: 110, // Set the height of the image
        marginRight: 10, // Add some margin to separate the image from text
    },
    vehicleTitle: {
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 8,
    },
    vehicleInfo: {
        fontSize: 16,
        marginBottom: 4,
    },
    vehicleStatus: {
        fontSize: 16,
        marginBottom: 4,
        color: '#2ECC71',
    },
});

export default MyBooking;
