import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BrowseReportStack from './browseReportStack';


const Tab = createMaterialTopTabNavigator();

export default function BrowseTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="דיווחים" component={BrowseReportStack} />
      
      <Tab.Screen name="מודעות" component={BrowseReportStack} /> 
      
    </Tab.Navigator>
  );
}
