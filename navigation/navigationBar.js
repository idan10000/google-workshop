import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  HomeScreen from '../screens/homeScreen';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={HomeScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Browse" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}