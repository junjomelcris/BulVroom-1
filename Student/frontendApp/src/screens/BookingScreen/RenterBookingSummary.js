import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const RenterBookingSummary = ({ route }) => {
    const { bookingData } = route.params;
    const navigation = useNavigation();

    const onBackPressed = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <TouchableOpacity onPress={onBackPressed}>
                    <Icon name="arrow-back" style={styles.backIcon}></Icon>
                </TouchableOpacity>
                <View style={styles.titleCenter}>
                    <Icon name="book" style={styles.carIcon}></Icon>
                    <Text style={styles.titleText}> My Bookings</Text>
                </View>
            </View>
            <View style={styles.bodycontainer}>
                <Text style={styles.text}>Booking Details</Text>
                <Image source={{ uri: bookingData.profile_pic }} style={styles.profilePic} />
                <Text>Booker ID: {bookingData.booker_id}</Text>
                <Text>Name: {`${bookingData.fName} ${bookingData.lName}`}</Text>
                <Text>Email: {bookingData.email}</Text>
                <Text>Contact: {bookingData.contact}</Text>
                <Text>Address: {bookingData.address}</Text>
                <Text>Username: {bookingData.username}</Text>
                <Text>Status: {bookingData.status}</Text>
                <Text>Registration Date: {bookingData.dateAdded}</Text>
                <Text>Vehicle Details:</Text>
                <Text>Make: {bookingData.make}</Text>
                <Text>Model: {bookingData.model}</Text>
                <Text>Plate: {bookingData.plate}</Text>
                <Text>Type: {bookingData.type}</Text>
                <Text>Transmission: {bookingData.transmission}</Text>
                <Text>Seating Capacity: {bookingData.seatingCapacity}</Text>
                <Text>Features: {bookingData.features}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bodycontainer: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    container: {
        flex: 1,
        paddingBottom: 16,
    },
    titleBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backIcon: {
        fontSize: 30,
        color: 'white',
    },
    carIcon: {
        fontSize: 30,
        color: 'white',
    },
    titleCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '900',
        color: 'white',
    },
});

export default RenterBookingSummary;
