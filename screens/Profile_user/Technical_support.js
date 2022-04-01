import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-paper";

export default function SupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>תמיכה טכנית</Text>
      <Text>
        משתמש\ת יקר\ה, נשמח לשמוע ממך. מענה יהיה עד שלושה ימים לכתובת האימייל
        המעודכנת בחשבון.
      </Text>
      <TextInput
        right={<TextInput.Affix text="/100" />}
        multiline={true}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={() => alert(" נשלח! ")}>
        <Text style={styles.text}>שלח</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    borderColor: "black",
    width: "80%",
    borderWidth: 3,
    borderRadius: 1,
    padding: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
