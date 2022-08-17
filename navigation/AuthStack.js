import { createStackNavigator } from "@react-navigation/stack";
import PageLaunch from "../screens/PageLaunch";
import SignUp from "../screens/SignUp";
import InsertUsername from "../screens/insertUsername";

//connect between signing ( authentication) and our home stack after we successfully entered the app

const Stack = createStackNavigator();

export default function AuthStack({ username, setUsername, setIsLoading }) {
  const options = { headerShown: false };

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Launch" component={PageLaunch} />
      <Stack.Screen name="SignUp">
        {(props) => (
          <SignUp
            {...props}
            username={username}
            setUsername={setUsername}
            setIsLoading={setIsLoading}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="InsertUsername">
        {(props) => (
          <InsertUsername
            {...props}
            username={username}
            setUsername={setUsername}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
