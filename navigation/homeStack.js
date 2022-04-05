import {createStackNavigator} from '@react-navigation/stack';
import Header from '../shared_components/header';
import HomeScreen from "../screens/homeScreen";
import ReportCreationScreen from "../screens/reportCreate/create_report_screen";
import ReportPage from "../screens/Report_dog/report_page";
import PosterPostingComponent from '../screens/posterCreate/create_poster_screen';
import AdPage from '../screens/Ad_dog/ad_page';

const Stack = createStackNavigator();

export default function HomeStack() {
    const options = {headerShown: false}

    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="ReportCreation" component={ReportCreationScreen}/>
            <Stack.Screen name="ReportPage" component={ReportPage}/>
            <Stack.Screen name="CreateAd" component={PosterPostingComponent}/>
            <Stack.Screen name="AdPage" component={AdPage}/>
        </Stack.Navigator>
    );
}

