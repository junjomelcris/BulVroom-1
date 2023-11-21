import { Text,StyleSheet} from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

const CustomButton = ({ mode, onPress, text, style, labelStyle }) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      labelStyle={[styles.label, labelStyle]}
      style={[styles.btn, style]} // Merge the default button style with the custom style prop
    >
      {text}
    </Button>
  );
};
const styles = StyleSheet.create({
    btn:{
    backgroundColor: '#2ecc71', 
    borderRadius: 50,  
    width: '95%',
    padding:5,
    marginVertical:10,
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    },
    label: {
      color: 'white',
      fontWeight: '900',
      fontSize: 16,
    },
})
export default CustomButton