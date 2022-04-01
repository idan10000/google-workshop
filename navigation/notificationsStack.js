import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared_components/header';
import NotificationsScreen from '../screens/notificationsScreen';
import NavigationBar from './navigationBar';
import { NavigationContainer } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState } from 'react';


const Stack = createStackNavigator();

export default function NotificationsStack() {
  const options = {header: ({navigation}) => <Header navigation={navigation}/>}

  const [inHome, setInHome] = useState(true) 
  //setInHome(newState.routes[newState.index].name === "בית"
  return (
    <NavigationContainer onStateChange={(newState) => console.log(newState.routeNames, newState.index)}>
      <Stack.Navigator>
          <Stack.Screen name="Main" component={NavigationBar} options={options}/>
          <Stack.Screen name="התראות" component={NotificationsScreen} />
      </Stack.Navigator>
      <FAB
        style={styles.fab}
        icon='camera'
        color='white'
        visible={!inHome}
        onPress={() => console.log('Pressed')}
      />
    </NavigationContainer>
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
