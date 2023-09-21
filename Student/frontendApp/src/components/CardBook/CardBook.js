import React from 'react';
import { StyleSheet,Linking ,View} from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const CardBook = ({ book }) => {
    const handleReadPress = (previewLink) => {
        if (previewLink) {
          Linking.openURL(previewLink);
        }
      };

  return (
    <View>
    {book.map((item, index) => (
      <Card key={index} style={{ marginBottom: 10 }}>
        <Card.Title title={"Title: " + (item.volumeInfo?.title || 'No Title')} subtitle={"Date Published: " + (item.volumeInfo?.publishedDate || 'No Subtitle')} />
        <Card.Cover style={{ margin: 1 }} source={{ uri: item.volumeInfo?.imageLinks?.thumbnail || 'https://picsum.photos/700' }} />
        <Card.Content>
          <Text style={{ alignItems: "center", alignContent: "center" }}>{"Description: " + (item.volumeInfo?.description || 'No description available')}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => handleReadPress(item.volumeInfo?.previewLink)}>Read</Button>
        </Card.Actions>
      </Card>
    ))}
  </View>
  
  );
};

export default CardBook;