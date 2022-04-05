import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from "react-navigation";
import ProfileScreen from "./User_profile";
import EditProfileScreen from "./Edit_profile";
import SupportScreen from "./Technical_support";
// const screens = {
//   Profile: {
//     screen: ProfileScreen,
//   },
//   Edit: {
//     screen: EditProfileScreen,
//   },
//   Thechnical: {
//     screen: SupportScreen,
//   },
// };

// const Stack = createStackNavigator(screens);
// const ProfileStack = () => <Stack/>

// //export default createAppContainer(ProfileStack);
// export default ProfileStack;

const Stack = createStackNavigator();

export default function ProfileStack() {
  const options = {headerShown: false}

  return (
      <Stack.Navigator screenOptions={options}>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Edit" component={EditProfileScreen} />
          <Stack.Screen name="Thechnical" component={SupportScreen} />

      </Stack.Navigator>
  );
}