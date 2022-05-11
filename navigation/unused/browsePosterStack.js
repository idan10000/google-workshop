import { createStackNavigator } from '@react-navigation/stack';
import AdForBrowse from "../screens/Poster/ad_for_browse";
import BrowsePage from "../screens/BrowsePage/BrowsePage";

const Stack = createStackNavigator();

export default function BrowsePosterStack() {

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="BrowsePosters" component={BrowsePage} initialParams={{collectionPath:"Posters", destination:"Poster"}} />
          <Stack.Screen name="Poster" component={AdForBrowse} />
      </Stack.Navigator>
  );
}

