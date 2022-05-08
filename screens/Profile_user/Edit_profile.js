import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { edit_styles } from "./Edit_style";
import { HelperText, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Nofar_styles } from "../utils/Nofar_style";

// import ImagePicker from "react-native-image-crop-picker";

export default function EditProfileScreen() {
  const [state, setState] = useState({
    fname: "",
    phone: "",
    email: "",
    city: "",
    country: "",
  });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   console.log(value);
  //   console.log(name);
  //   setState((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
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
          // onChangeText={handleChange}
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
          // onChangeText={handleChange("email")}
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
          // onChangeText={handleChange("phone")}
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
          // onChangeText={handleChange("city")}
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

      <View style={Nofar_styles.actionInput}>
        <TextInput
          placeholder="מדינה"
          value={state.country}
          // onChangeText={handleChange("country")}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="map" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("country")}>
        <Text style={Nofar_styles.error}>
          {"אותיות בעברית בלבד, ללא תווים מיוחדים"}
        </Text>
      </HelperText>

      <View style={{ marginLeft: 50, marginTop: 20 }}>
        <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
          <Text style={Nofar_styles.BigButtonText}>עדכן פרטים</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
