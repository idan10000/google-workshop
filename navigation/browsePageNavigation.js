import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
import BrowsePage from '../screens/browsePage/browsePage';

const Tab = createMaterialTopTabNavigator();

export default function BrowseTabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {backgroundColor: "#1B1209"},
            tabBarStyle: {backgroundColor: "#F9F8F0"},
            tabBarLabelStyle: {color: "#1B1209", fontSize: 16, fontWeight: "bold"}
        }}>
            <Tab.Screen name="נמצאו" component={BrowsePage} initialParams={{collectionPath:"Reports", destination:"Report"}}/>

            <Tab.Screen name="אבדו" component={BrowsePage} initialParams={{collectionPath:"Posters", destination:"Poster"}}/>

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab: {
        color: "#F9F8F0"
    }
})
