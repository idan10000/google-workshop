import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared/header';
import NotificationsScreen from '../screens/notificationsScreen';
import NavigationBar from './navigationBar';


const Stack = createStackNavigator();

export default function NotificationsStack() {
  const options = {header: ({navigation}) => <Header navigation={navigation}/>}

  return (
    <Stack.Navigator>
        <Stack.Screen name="Main" component={NavigationBar} options={options}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

