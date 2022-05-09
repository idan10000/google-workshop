import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ProfileScreen from "../screens/Profile_user/User_profile";
import EditProfileScreen from "../screens/Profile_user/Edit_profile";

const screens = {
  ProfileScreen: {
    screen: ProfileScreen,
  },
  EditProfileScreen: {
    screen: EditProfileScreen,
  },
};

// profile stack navigator screens
const profileStack = createStackNavigator(screens);

export default createAppContainer(profileStack);
