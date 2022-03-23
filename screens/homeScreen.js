import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <Button                          //maybe replace buttons with custom ones?
      title='upload a photo'
      onPress={() => console.log('upload a photo')}/>
      
      <Button 
      title='upload missing ad'
      onPress={() => console.log('upload missing ad')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
