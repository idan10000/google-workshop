import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { edit_styles } from "./Edit_style";
import { HelperText, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Nofar_styles } from "../utils/Nofar_style";
// import BottomSheet from "reanimated-bottom-sheet";
// import Animated from "react-native-reanimated";

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
    <View style={edit_styles.container}>
      <View style={edit_styles.actionInput}>
        <TextInput
          label="שם"
          value={state.fname}
          // onChangeText={handleChange}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("name")}>
        <Text style={edit_styles.error}>Name is invalid!</Text>
      </HelperText>

      <View style={edit_styles.actionInput}>
        <TextInput
          label="אימייל"
          value={state.email}
          // onChangeText={handleChange("email")}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("email")}>
        <Text style={edit_styles.error}>Phone number is invalid!</Text>
      </HelperText>

      <View style={edit_styles.actionInput}>
        <TextInput
          label="טלפון"
          value={state.phone}
          // onChangeText={handleChange("phone")}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("phone")}>
        <Text style={edit_styles.error}>Email address is invalid!</Text>
      </HelperText>

      <View style={edit_styles.actionInput}>
        <TextInput
          label="עיר"
          value={state.city}
          // onChangeText={handleChange("city")}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("city")}>
        <Text style={edit_styles.error}>City name is invalid!</Text>
      </HelperText>

      <View style={edit_styles.actionInput}>
        <TextInput
          label="מדינה"
          value={state.country}
          // onChangeText={handleChange("country")}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors("country")}>
        <Text style={edit_styles.error}>country name address is invalid!</Text>
      </HelperText>

      <View style={edit_styles.cardContent}>
        <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
          <Text style={Nofar_styles.BigButtonText}>עדכן</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
