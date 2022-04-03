import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ProfileScreen from "./User_profile";
import EditProfileScreen from "./Edit_profile";
import SupportScreen from "./Technical_support";
const screens = {
  Profile: {
    screen: ProfileScreen,
  },
  Edit: {
    screen: EditProfileScreen,
  },
  Thechnical: {
    screen: SupportScreen,
  },
};

const ProfileStack = createStackNavigator(screens);

//export default createAppContainer(ProfileStack);
export default ProfileStack;
