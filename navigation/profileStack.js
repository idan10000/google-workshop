import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../screens/Profile_user/Edit_profile";
import ProfileScreen from "../screens/Profile_user/User_profile";
import SupportScreen from "../screens/Profile_user/Technical_support";

const Stack = createStackNavigator();

export default function profileStack() {
  const options = { headerShown: false };

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
    </Stack.Navigator>
  );
}
