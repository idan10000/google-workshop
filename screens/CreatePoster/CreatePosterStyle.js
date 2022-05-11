import { StyleSheet, Dimensions } from "react-native";

export const stylesPoster = StyleSheet.create({
  chips: {
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",
    paddingHorizontal:"5%",
  },
  modal: {
    backgroundColor:"#F4F2E3",
    padding: 20,
  },
  addImageContainer: {
    justifyContent: "center",
    borderWidth: 1,
    flex: 1,
    height: Dimensions.get("window").height / 2,
  },
  addImageText: {
    textAlign: "center",
    fontSize: 24,
  },
  pictureContainer: {
    flex: 3,
    justifyContent: "center",
    alignContent: "center",
    height: Dimensions.get("window").height / 2,
  },
  card: {
    resizeMode: "contain",
    flex: 1,
  },
  modalButtonContainer: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  modalButton: {},
  fabContainer: {
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor:"#816A55",

  },
  descriptionContainer: {},
  addTagsBTContainer: {
    paddingTop:"2%",
    flexDirection:"row",
    marginHorizontal:"2%",
    justifyContent:"space-around"
  },
  confirmBTContainer:{
    alignSelf:"center",
    paddingBottom:"6%"
  }

});
