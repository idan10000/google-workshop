import {
  Text,
  View,
  ScrollView,
  Linking, ImageBackground, ImageBackgroundComponent
} from "react-native";
import { Nofar_styles } from "../../styles/NofarStyle";
import { AR_styles } from "./PosterStyle";
import {Button} from "react-native-paper";
import PosterPage from "./PosterPage";

export default function AdForBrowse({route}) {
  const makeCall = () => {
    console.log("Its calling");
    let phoneNumber = "tel://+1234567890";
    Linking.openURL(phoneNumber);
  };

  return (
      <ImageBackground
          style={{flex: 1}}
          source={require('../../assets/new_background.png')}>
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <PosterPage route={route}/>
        {/*<View style={AR_styles.confirmBTContainer}>*/}
        {/*  <Button*/}
        {/*    mode={"contained"}*/}
        {/*    style={Nofar_styles.BigButton}*/}
        {/*    onPress={makeCall}*/}
        {/*    activeOpacity={0.7}*/}
        {/*  >*/}
        {/*    <Text style={Nofar_styles.BigButtonText}>צור קשר עם הבעלים</Text>*/}
        {/*  </Button>*/}
        {/*</View>*/}
      </ScrollView>
    </View>
        </ImageBackground>
  );
}
