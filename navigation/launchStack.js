import { createStackNavigator } from '@react-navigation/stack';
import NotificationsStack from './notificationsStack';
import PageLaunch from '../screens/PageLaunch';
import SignUp from '../screens/SignUp';
import HomeStack from './homeStack';

const Stack = createStackNavigator();

export default function LaunchStack() {
  const options = {headerShown: false}

  return (
      <Stack.Navigator screenOptions={options}>
          <Stack.Screen name="Launch" component={PageLaunch} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="App" component={HomeStack}/>
      </Stack.Navigator>
  );
}

