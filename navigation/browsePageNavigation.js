import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BrowseReportStack from './browseReportStack';
import { StyleSheet } from 'react-native';
import BrowseReports from '../screens/browseReports';

const Tab = createMaterialTopTabNavigator();

export default function BrowseTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarIndicatorStyle: {backgroundColor: "#1B1209"},
      tabBarStyle: { backgroundColor: "#BBB988" },
      tabBarLabelStyle: {color: "#1B1209", fontSize:16}
    }}>
      <Tab.Screen name="נמצאו" component={BrowseReports} />
      
      <Tab.Screen name="אבדו" component={BrowseReports} /> 
      
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab:{
    color:"#BBB988"
  }
})