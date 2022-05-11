import { createStackNavigator } from '@react-navigation/stack';
import ReportForBrowser from '../screens/Report/report_for_browse';
import BrowsePage from "../screens/BrowsePage/BrowsePage";

const Stack = createStackNavigator();

export default function BrowseReportStack() {

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Browse" component={BrowsePage} initialParams={{collectionPath:"Reports", destination:"Report"}} />
          <Stack.Screen name="Report" component={ReportForBrowser} />
      </Stack.Navigator>
  );
}

