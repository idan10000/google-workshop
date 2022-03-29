import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <Button                          
        mode='contained'
        icon='camera'
        color='blue'
        style={styles.button}
        onPress={() => console.log('take a photo')}>
      מצאתי כלב!
      </Button>
      
      <Button
        mode='outlined'
        icon='image'
        color='blue'
        style={styles.smallButton}
        onPress={() => console.log('upload from gallery')}> 
      העלאה מגלריה
      </Button>

      <Button
        mode='outlined'
        color='blue'
        style={styles.smallButton}
        onPress={() => console.log('upload missing ad')}> 
      יצירת מודעה
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
