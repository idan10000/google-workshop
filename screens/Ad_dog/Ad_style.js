import { StyleSheet } from "react-native";

export const AR_styles = StyleSheet.create({
  content: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
  },
  mainImage: {
    width: 350,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  smallImagesContainer: {
    flexDirection: "column",
    marginLeft: 30,
  },
  smallImage: {
    width: 60,
    height: 60,
    marginTop: 5,
  },
  // btnColor: {
  //   height: 40,
  //   width: 40,
  //   borderRadius: 40,
  //   marginHorizontal: 3,
  // },
  contentColors: {
    flexDirection: "row",
  },
  /******** card **************/
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
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
});
