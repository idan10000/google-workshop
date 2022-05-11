import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Nofar_styles } from "../../styles/NofarStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SupportScreen({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <SafeAreaView style={Nofar_styles.container}>
      <View style={{ marginTop: 50, marginLeft: 40, marginBottom: 5 }}>
        <Text style={Nofar_styles.BigTitle}>תמיכה טכנית</Text>
        <Text style={Nofar_styles.SmallTitle}>
          משתמש\ת יקר\ה, נשמח לשמוע ממך. מענה יהיה עד שלושה ימים לכתובת האימייל
          המעודכנת בחשבונך.
        </Text>
      </View>

      <View style={Nofar_styles.actionInput}>
        <TextInput
          dense={false}
          placeholder={"תיאור"}
          // value={state.fname}
          // onChangeText={handleChange}
          mode="outlined"
          activeUnderlineColor="#FFFFFF"
          activeOutlineColor="#FFFFFF"
          multiline={true}
          style={{ height: 200, backgroundColor: "#D3D3D3" }}
        />
      </View>
      <View style={{ flexDirection: "row", marginTop: 40, marginLeft: 40 }}>
        <TouchableOpacity
          style={Nofar_styles.BigButton}
          onPress={() => alert(" נשלח! ")}
        >
          <Icon name="account-check-outline" color="#FFFFFF" size={25} />
          <Text style={Nofar_styles.BigButtonText}>שלח</Text>
        </TouchableOpacity>
      </View>
      <Button title="back to profile screen" onPress={pressHandler} />
    </SafeAreaView>
  );
}
