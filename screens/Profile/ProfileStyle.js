import {Dimensions, StyleSheet} from "react-native";
export const user_styles = StyleSheet.create({
  confirmBTContainer: {
    alignSelf: "center",
    paddingBottom: "5%",
  },

  ProfileCard: {
    marginTop: "10%",
    marginRight: "7.5%",
    marginLeft: "7.5%",
    marginBottom: "15%",
    borderRadius: 15,
    shadowColor: "#F5F5DC",
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
  profileButton:{
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.08,
    // marginTop: 5,
    // marginBottom: 0,
    marginBottom:"2%",

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
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
  },
});
