import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../../screens/Profile/EditProfile";
import ProfilePage from "../../screens/Profile/Profile";
import SupportPage from "../../screens/Profile/TechnicalSupport";

const Stack = createStackNavigator();

export default function ProfileStack() {
  const options = { headerShown: false };

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="ProfileScreen" component={ProfilePage} />
      {/* <Stack.Screen name="EditProfileScreen" component={EditProfile} /> */}
    </Stack.Navigator>
  );
}
