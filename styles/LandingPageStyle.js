import { StyleSheet, Text, View } from "react-native";

export const landingPageStyle = StyleSheet.create({
  totalWrapper: {
    flex: 1,
  },
  appNameHeader: {
    fontSize: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4%",
  },
  slogenContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
  },
  appLogo: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: "8%",
    height: "85%",
    width: "37%",
    resizeMode: "stretch",
    marginBottom: "5%",
  },

  AvatarContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },

  text: {
    fontSize: 18,
    margin: 2,
  },

  containerForRegisterClick: {
    marginVertical: "5%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  sellingText: {
    textAlign: "center",
    marginVertical: "5%",
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    fontSize: 16,
    textAlign: "center",
  },
  privacyPolicyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#DCA277",
  },
  linksText: {
    textDecorationLine: "underline",
  },
  clickHere: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  bigTitle: {
    color: "#1B1209",
    fontSize: 24,
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emailRegist: {
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    color: "#1B1209",
  },
});
