import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  HomeScreen from '../screens/homeScreen';


const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={HomeScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Browse" component={HomeScreen} />
      </Tab.Navigator>
  );
}