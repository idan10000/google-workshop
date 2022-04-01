import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/User_profile';
import BrowsePage from '../screens/browse_page';
import Map from '../screens/map';

const Tab = createMaterialBottomTabNavigator();

export default function NavigationBar() {
  
  return (
      <Tab.Navigator initialRouteName='בית' screenOptions={{headerShown: false}}>
        <Tab.Screen name="פרופיל" component={ProfileScreen} options={{tabBarIcon: getIcon('account')}}/>
        <Tab.Screen name="בית" component={HomeScreen} options={{tabBarIcon: getIcon('home')}}/>
        <Tab.Screen name="חפש" component={BrowsePage} options={{tabBarIcon: getIcon('magnify')}}/>
        <Tab.Screen name="מפה" component={Map} options={{tabBarIcon: getIcon('map-outline')}}/>
      </Tab.Navigator>
  );
}

const getIcon = (iconName) => { 
  return (tabBarInfo) => {
    return (<IconButton
      icon={iconName}
      color={tabBarInfo.focused ? "white" : "blue"}
      size={30}
      style={styles.icon}
    />)
  }
}

const styles = StyleSheet.create({
  icon:{
    bottom:17
  },
});