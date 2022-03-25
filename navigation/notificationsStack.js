import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared/header';
import NotificationsScreen from '../screens/notificationsScreen';
import NavigationBar from './navigationBar';
import { NavigationContainer } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';


const Stack = createStackNavigator();

export default function NotificationsStack() {
  const options = {header: ({navigation}) => <Header navigation={navigation}/>}

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Main" component={NavigationBar} options={options}/>
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
      <FAB
        style={styles.fab}
        icon="camera"
        onPress={() => console.log('Pressed')}
      />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 300,
    bottom: 50,
  },
})