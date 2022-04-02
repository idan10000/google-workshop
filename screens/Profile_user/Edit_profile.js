import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { edit_styles } from "./Edit_style";
import { HelperText, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

// import BottomSheet from "reanimated-bottom-sheet";
// import Animated from "react-native-reanimated";

// import ImagePicker from "react-native-image-crop-picker";

export default function EditProfileScreen() {
  const [text, setText] = React.useState("");

  const onChangeText = (text) => setText(text);

  const hasErrors = () => {
    return !text.includes("@");
  };
  return (
    <View style={edit_styles.container}>
      <View style={edit_styles.actionInput}>
        <TextInput
          label="שם"
          value={text}
          onChangeText={onChangeText}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors()}>
        <Text style={edit_styles.error}>Email address is invalid!</Text>
      </HelperText>

      <View style={edit_styles.actionInput}>
        <TextInput
          label="שם"
          value={text}
          onChangeText={onChangeText}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors()}>
        <Text style={edit_styles.error}>Email address is invalid!</Text>
      </HelperText>

      <View style={edit_styles.actionInput}>
        <TextInput
          label="שם"
          value={text}
          onChangeText={onChangeText}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors()}>
        <Text style={edit_styles.error}>Email address is invalid!</Text>
      </HelperText>

      <View style={edit_styles.actionInput}>
        <TextInput
          label="שם"
          value={text}
          onChangeText={onChangeText}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors()}>
        <Text style={edit_styles.error}>Email address is invalid!</Text>
      </HelperText>

      <View style={edit_styles.actionInput}>
        <TextInput
          label="שם"
          value={text}
          onChangeText={onChangeText}
          activeUnderlineColor="#000000"
          activeOutlineColor="#000000"
          left={<TextInput.Icon name="phone" />}
        />
      </View>
      <HelperText type="error" visible={hasErrors()}>
        <Text style={edit_styles.error}>Email address is invalid!</Text>
      </HelperText>

      <View style={edit_styles.cardContent}>
        <TouchableOpacity style={edit_styles.SmallButton} onPress={() => {}}>
          <Text style={edit_styles.SmallButtonTitle}>עדכן</Text>
        </TouchableOpacity>
        <TouchableOpacity style={edit_styles.SmallButton} onPress={() => {}}>
          <Text style={edit_styles.SmallButtonTitle}>עדכן</Text>
        </TouchableOpacity>
        <TouchableOpacity style={edit_styles.SmallButton} onPress={() => {}}>
          <Text style={edit_styles.SmallButtonTitle}>עדכן</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title="חזור" onPress={() => {}} style={edit_styles.SmallButton} /> */}
    </View>
  );
}
