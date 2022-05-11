import {createStackNavigator} from '@react-navigation/stack';
import Header from '../shared_components/Header';
import OldhomeScreen from "../screens/HomePage";
import ReportCreationScreen from "../screens/CreateReport/CreateReportPage";
import ReportPage from "../screens/Report/ReportPage"
import PosterPostingComponent from '../screens/CreatePoster/CreatePosterPage';
import AdPage from '../screens/Poster/PosterPage';
import NotificationsPage from '../screens/NotificationsPage';
import NavigationBar from './NavigationBar';
import ReportForBrowser from '../screens/Report/ReportBrowse';
import AdForBrowse from '../screens/Poster/PosterBrowse';

const Stack = createStackNavigator();

export default function HomeStack() {
    const options = {header: (props) => <Header {...props}/>}

    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="Main" component={NavigationBar} />
            <Stack.Screen name="Home" component={OldhomeScreen}/>
            <Stack.Screen name="ReportCreation" component={ReportCreationScreen}/>
            <Stack.Screen name="ReportPage" component={ReportPage}/>
            <Stack.Screen name="CreateAd" component={PosterPostingComponent}/>
            <Stack.Screen name="AdPage" component={AdPage}/>
            <Stack.Screen name="התראות" component={NotificationsPage} />
            {/* <Stack.Screen name="ReportForBrowse" component={ReportForBrowse}/> */}
            <Stack.Screen name="Report" component={ReportForBrowser} />
            <Stack.Screen name="Poster" component={AdForBrowse} />

        </Stack.Navigator>
    );
}

