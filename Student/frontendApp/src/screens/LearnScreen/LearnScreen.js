import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import CardBook from '../../components/CardBook/CardBook';

const LearnScreen = () => {

  return (
    <View style={styles.container}>
   
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: windowHeight * 0.1,
  },
  container: {
    height: '100%',
    margin: windowWidth * 0.05,
  },
  search: {
    marginBottom: windowHeight * 0.01,
    marginTop: windowHeight * 0.01,
  },
  content: {
    padding: windowWidth * 0.05,
    marginBottom: windowHeight * 0.05,
  },
});

export default LearnScreen;
