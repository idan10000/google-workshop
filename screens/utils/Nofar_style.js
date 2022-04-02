import { StyleSheet } from "react-native";

export const Nofar_styles = StyleSheet.create({
  // background:
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#BBB988",
  },
  text: { fontSize: 20 },
  BigTitle: {
    fontStyle: "normal",
    color: "#1B1209",
    fontSize: 30,
    // textAlign: "center",
    fontWeight: 700,
  },
  SmallTitle: {
    fontStyle: "normal",
    color: "#1B1209",
    fontSize: 20,
    // textAlign: "center",
    fontWeight: 700,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },

  BigButton: {
    width: 330,
    height: 60,
    // marginTop: 5,
    // marginBottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#816A55",
    shadowColor: "#00000021",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 7.49,
  },
  BigButtonText: {
    fontStyle: "normal",
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
    fontWeight: 700,
  },

  //   chips:
  Viewchips: {
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",
    paddingBottom: 10,
  },
  chips: {
    marginLeft: 5,
    paddingRight: 3,
    paddingLeft: 3,
    // height: 35,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#EADDCA",
  },
  chipsText: {
    fontStyle: "normal",
    color: "#483C32",
    fontSize: 19,
    textAlign: "center",
    fontWeight: "600",
  },
  mainImage: {
    width: 350,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  //   the white card I have
  card: {
    borderRadius: 15,
    shadowColor: "#00000021",
    shadowOffset: {
      width: 20,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
  },

  //   small button
  SmallButtonView: {
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",
    paddingBottom: 10,
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  SmallButtonTitle: {
    fontStyle: "normal",
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    fontWeight: 700,
  },
  SmallButton: {
    marginBottom: 5,
    marginTop: 5,
    paddingRight: 30,
    paddingLeft: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#816A55",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },

  //   text input
  actionInput: {
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,
    borderBottomWidth: 5,
    borderBottomColor: "#f2f2f2",
  },
  error: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 0,
    fontSize: 17,
    textAlign: "center",
  },

  //   example for input text i have:

  //   <View style={edit_styles.container}>
  //   <View style={edit_styles.actionInput}>
  //     <TextInput
  //       label="שם"
  //       value={text}
  //       onChangeText={onChangeText}
  //       activeUnderlineColor="#000000"
  //       activeOutlineColor="#000000"
  //       left={<TextInput.Icon name="phone" />}
  //     />
  //   </View>
  //   <HelperText type="error" visible={hasErrors()}>
  //     <Text style={edit_styles.error}>Email address is invalid!</Text>
  //   </HelperText>
});
