import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../screens/Profile/EditProfile";
import ProfileScreen from "../screens/Profile/Profile";
import SupportScreen from "../screens/Profile/TechnicalSupport";

const Stack = createStackNavigator();

export default function ProfileStack() {
  const options = { headerShown: false };

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
    </Stack.Navigator>
  );
}
