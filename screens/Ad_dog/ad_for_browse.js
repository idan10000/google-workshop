import {
  Text,
  View,
  ScrollView,
  Linking, ImageBackground, ImageBackgroundComponent
} from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Ad_style";
import AdTemplate from "./ad_template";
import {Button} from "react-native-paper";

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
        <AdTemplate data={route.params.data}/>

        <View style={AR_styles.confirmBTContainer}>
          <Button
            mode={"contained"}
            style={Nofar_styles.SmallButton}
            onPress={makeCall}
            activeOpacity={0.7}
          >
            <Text style={Nofar_styles.SmallButtonTitle}>צור קשר עם הבעלים</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
        </ImageBackground>
  );
}
