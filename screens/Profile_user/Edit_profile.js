import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { edit_styles } from "./Edit_style";
import { useTheme } from "react-native-paper";
// import { Provider as PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

// import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

// import ImagePicker from "react-native-image-crop-picker";

export default function EditProfileScreen() {
  const { colors } = useTheme();
  // const pressHandler = () => {
  //   navigation.goBack();
  // };

  return (
    <View style={edit_styles.container}>
      <View style={edit_styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          placeholder="שם "
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            edit_styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={edit_styles.action}>
        <Feather name="phone" color={colors.text} size={20} />
        <TextInput
          placeholder="טלפון"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          style={[
            edit_styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={edit_styles.action}>
        <FontAwesome name="envelope-o" color={colors.text} size={20} />
        <TextInput
          placeholder="אימייל"
          placeholderTextColor="#666666"
          keyboardType="email-address"
          autoCorrect={false}
          style={[
            edit_styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={edit_styles.action}>
        <FontAwesome name="globe" color={colors.text} size={20} />
        <TextInput
          placeholder="מדינה"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            edit_styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={edit_styles.action}>
        <Icon name="map-marker-outline" color={colors.text} size={20} />
        <TextInput
          placeholder="עיר"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            edit_styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
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
