import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { HelperText, TextInput, Button } from "react-native-paper";
import { Nofar_styles } from "../../styles/NofarStyle";


export default function EditProfile({ navigation }) {
  const [state, setState] = useState({
    fname: "",
    phone: "",
    email: "",
    city: "",
    country: "",
  });

  const pressHandler = () => {
    navigation.navigate("ProfileScreen");
  };
  const hasErrors = (det) => {
    if (det == "email") {
      return !state.email.includes("@");
    }
    if (det == "name" || det == "city" || det == "county") {
      return !state.email.includes("@");
    }
    if (det == "phone") {
      return !state.email.includes("@");
    }
  };
  return (

    <View style={Nofar_styles.container}>
      <View style={Nofar_styles.actionInput}>
        <TextInput
          placeholder="שם"
          value={state.fname}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="face" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("name")}>
        <Text style={Nofar_styles.error}>
          {"אותיות בעברית בלבד, ללא תווים מיוחדים"}
        </Text>
      </HelperText>

      <View style={Nofar_styles.actionInput}>
        <TextInput
          placeholder="אימייל"
          value={state.email}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="email" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("email")}>
        <Text style={Nofar_styles.error}> abc@gmail.com</Text>
      </HelperText>

      <View style={Nofar_styles.actionInput}>
        <TextInput
          placeholder="טלפון"
          value={state.phone}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("phone")}>
        <Text style={Nofar_styles.error}>מספרים 0-9</Text>
      </HelperText>

      <View style={Nofar_styles.actionInput}>
        <TextInput
          placeholder="עיר"
          value={state.city}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="map" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("city")}>
        <Text style={Nofar_styles.error}>
          {"אותיות בעברית בלבד, ללא תווים מיוחדים"}
        </Text>
      </HelperText>

      {/*<View style={Nofar_styles.actionInput}>*/}
      {/*  <TextInput*/}
      {/*    placeholder="מדינה"*/}
      {/*    value={state.country}*/}
      {/*    // onChangeText={handleChange("country")}*/}
      {/*    activeUnderlineColor="#000000"*/}
      {/*    activeOutlineColor="#000000"*/}
      {/*    left={<TextInput.Icon name="map" />}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*<HelperText type="error" visible={hasErrors("country")}>*/}
      {/*  <Text style={Nofar_styles.error}>*/}
      {/*    {"אותיות בעברית בלבד, ללא תווים מיוחדים"}*/}
      {/*  </Text>*/}
      {/*</HelperText>*/}

      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginTop: "10%",
        }}
      >
        <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
          <Text style={Nofar_styles.BigButtonText}>עדכן פרטים</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity title="back to profile screen" onPress={pressHandler} />
    </View>
    // </ImageBackground>
  );
}
