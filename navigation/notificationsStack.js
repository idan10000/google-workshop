import { createStackNavigator } from '@react-navigation/stack';
import NotificationsScreen from '../screens/notificationsScreen';
import NavigationBar from './navigationBar';


const Stack = createStackNavigator();

export default function NotificationsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={NavigationBar} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}