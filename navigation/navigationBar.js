import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/homeScreen';
import ProfileStack from '../screens/Profile_user/profileStack';
import BrowsePageNavigation from '../navigation/browsePageNavigation';
import Map from '../screens/map';

const Tab = createMaterialBottomTabNavigator();

export default function NavigationBar() {
  
  return (
      <Tab.Navigator initialRouteName='בית' screenOptions={{headerShown: false}}>
        <Tab.Screen name="פרופיל" component={ProfileStack} options={{tabBarIcon: getIcon('account')}}/>
        <Tab.Screen name="בית" component={HomeScreen} options={{tabBarIcon: getIcon('home')}}/>
        <Tab.Screen name="חפש" component={BrowsePageNavigation} options={{tabBarIcon: getIcon('magnify')}}/>
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