
import { Text, View,StyleSheet } from 'react-native';
import Navigation from './src/navigation';


const App = () =>{
    return(
      <View style={styles.parent}>
     <Navigation/>
      </View>
    )
}

const styles = StyleSheet.create({
      parent:{
        backgroundColor:'Black',
        height:'100%',
      }
})
export default App;
