import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function NewReportFAB() {
    return (
        <FAB
                style={styles.fab}
                icon='camera'
                color='white'
                onPress={() => console.log('Pressed')}
            />
    );
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 290,
      bottom: 60,
      backgroundColor: "blue"
    },
  })
  