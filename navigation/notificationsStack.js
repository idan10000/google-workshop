import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared_components/header';
import NotificationsScreen from '../screens/notificationsScreen';
import NavigationBar from './navigationBar';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function NotificationsStack() {
  const options = {header: (props) => <Header {...props}/>}

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
          <Stack.Screen name="Main" component={NavigationBar} />
          <Stack.Screen name="התראות" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

