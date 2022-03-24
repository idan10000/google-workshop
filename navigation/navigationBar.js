import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/homeScreen';

const Tab = createMaterialBottomTabNavigator();

export default function NavigationBar() {
  return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Profile" component={HomeScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Browse" component={HomeScreen} />
      </Tab.Navigator>
  );
}