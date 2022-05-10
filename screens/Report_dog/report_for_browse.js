import {
  Text,
  View,
  ScrollView,
  Linking, ImageBackground
} from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Report_style";

import ReportTemplate from "./report_template";
import {Button} from "react-native-paper";
import NewAdPage from "../Ad_dog/ad_page";
export default function ReportForBrowse({route}) {
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
        <NewAdPage route={route}/>

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
