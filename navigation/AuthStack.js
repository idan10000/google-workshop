import { createStackNavigator } from '@react-navigation/stack';
import PageLaunch from '../screens/PageLaunch';
import SignUp from '../screens/SignUp';
import HomeStack from './HomeStack';
import SignIn from "../screens/SignIn";

//connect between signing ( authentication) and our home stack after we successfully entered the app

const Stack = createStackNavigator();

export default function AuthStack() {
    const options = {headerShown: false}

    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="Launch" component={PageLaunch} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
    );
}

