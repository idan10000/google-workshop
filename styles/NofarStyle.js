import { Dimensions, StyleSheet } from "react-native";

export const Nofar_styles = StyleSheet.create({
  // background:
  container: {
    backgroundColor:"#F4F2E3",
    flex: 1,
    paddingTop: "1%",
  },
  text: { fontSize: 20 },
  BigTitle: {
    color: "#1B1209",
    fontSize: 30,
    // textAlign: "center",
    fontWeight: "700",
  },
  SmallTitle: {
    color: "#1B1209",
    fontSize: 20,
    // textAlign: "center",
    fontWeight: "700",
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
    backgroundColor: "#DCA277",
    shadowColor: "#00000021",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 7.49,
  },
  BigButtonText: {
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
  },

  //   chips:
  Viewchips: {
    shadowColor: "#000",

    shadowOpacity: 0.01,
    shadowRadius: 100,
    elevation: 8,
    width: Dimensions.get("window").width / 1.2,
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor :"#DCA277",
    marginBottom:"4%",
    borderColor:"#000",
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",

    borderRadius:20,

  },
  chips: {
    marginRight: "1.5%",
    paddingRight: 3,
    paddingLeft: 3,
    height: 35,
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#EADDCA",
  },
  chipsText: {
    color: "#483C32",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
  },
  mainImage: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 2.2,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    borderRadius:2,
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
    backgroundColor: "#F9F8F0",
    marginHorizontal: 5,
  },

  //   tiny button
  TinyButtonView: {
    overflow: "hidden",
    paddingVertical: "8%",
    paddingHorizontal: 16,
  },
  TinyButtonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  TinyButton: {
    paddingRight: 15,
    paddingLeft: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#DCA277",
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
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
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
    backgroundColor: "#DCA277",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },

  //   text input
  actionInput: {
    paddingRight: "8%",
    paddingLeft: "8%",
  },
  error: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 0,
    fontSize: 17,
    textAlign: "center",
    color: "#3B3B3B",
    fontWeight: "600",
  },
});
