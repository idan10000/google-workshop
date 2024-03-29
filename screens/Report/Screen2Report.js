import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";

import React, { useState } from "react";
import { Nofar_styles } from "../../styles/NofarStyle";
import StepIndicator from "react-native-step-indicator";
import MapForCreation from "../Map/MapForCreation";

// this is the second screen when you report. here you can control the location where the dog got lost

export default function Screen2Report({ route, navigation }) {
  const labels = ["תמונה", "מיקום", "פרטים"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#DCA277",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#DCA277",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#DCA277",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#DCA277",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#DCA277",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelSize: 13,
    currentStepLabelColor: "#DCA277",
  };
  let report = route.params.report;

  const initLocation = route.params.edit ? report.location : 0;

  const [location, setLocation] = useState(null);

  const nextScreen = () => {
    if (location !== null) {
      navigation.navigate("ReportCreation3", {
        report: report,
        location: location,
        image: route.params.image,
        edit: route.params.edit,
        ref: route.params.ref,
      });
    }
  };
  return (
    <View style={Nofar_styles.container}>
      <View style={{ marginTop: "5%" }}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={1}
          labels={labels}
          stepCount={3}
        />
      </View>

      <MapForCreation
        preLocation={initLocation}
        usePreLocation={route.params.edit}
        location={location}
        setLocation={setLocation}
        nextScreen={nextScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundCamera: {
    marginTop: "5%",
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 1.5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    resizeMode: "cover",
  },
  proceedButton: {
    paddingVertical: "3%",
    paddingRight: "5%",
    paddingLeft: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#DCA277",
    marginVertical: "5%",
    width: Dimensions.get("window").width / 2.2,
    marginLeft:
      (Dimensions.get("window").width - Dimensions.get("window").width / 1.2) /
      2,
  },
  errorImage: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  imagePicked: {
    marginLeft: "7.5%",
    marginTop: "1%",
  },
  bottomView: {
    flexDirection: "row",
    marginHorizontal: "7.5%",
  },
  bottomText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomTextView: {
    flexDirection: "row",
    marginLeft: "2.5%",
  },
});
