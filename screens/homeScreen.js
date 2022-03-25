import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <Button                          
        mode='contained'
        icon='camera'
        style={styles.button}
        onPress={() => console.log('take a photo')}>
      take a photo
      </Button>
      
      <Button
        mode='outlined'
        icon='image'
        style={styles.smallButton}
        onPress={() => console.log('upload from gallery')}> 
      upload from gallery
      </Button>

      <Button
        style={styles.smallButton}
        onPress={() => console.log('upload missing ad')}> 
      upload missing ad
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  smallButton: {
    margin: 20,
    bottom: 60
  },
  button: {
    padding: 50,
    bottom: 150,
    borderRadius: 50
  }
});
