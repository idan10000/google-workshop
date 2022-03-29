import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/homeScreen';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';


const Tab = createMaterialBottomTabNavigator();

export default function NavigationBar() {
  
  return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="פרופיל" component={HomeScreen} options={{tabBarIcon: getIcon('account')}}/>
        <Tab.Screen name="בית" component={HomeScreen} options={{tabBarIcon: getIcon('home')}}/>
        <Tab.Screen name="חפש" component={HomeScreen} options={{tabBarIcon: getIcon('magnify')}}/>
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