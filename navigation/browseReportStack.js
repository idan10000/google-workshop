import { createStackNavigator } from '@react-navigation/stack';
import BrowseReports from '../screens/browseReports';
import ReportForBrowser from '../screens/Report_dog/report_for_browse';

const Stack = createStackNavigator();

export default function BrowseReportStack() {

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="BrowseReports" component={BrowseReports} />
          <Stack.Screen name="Report" component={ReportForBrowser} />
      </Stack.Navigator>
  );
}

