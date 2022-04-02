import { StyleSheet } from "react-native";

export const AR_styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#BBB988",
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
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
    height: 50,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#EADDCA",
  },
  chipsText: {
    fontStyle: "bold",
    color: "#483C32",
    fontSize: 20,
    textAlign: "center",
    fontWeight: 720,
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
  btnColor: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginHorizontal: 3,
  },
  contentColors: {
    flexDirection: "row",
  },
  name: {
    fontStyle: "bold",
    color: "#1B1209",
    fontSize: 30,
    // textAlign: "center",
    fontWeight: 750,
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    color: "#696969",
  },
  shareButton: {
    width: 330,
    height: 60,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#816A55",
    shadowColor: "#00000021",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.9,
    shadowRadius: 7.49,
  },
  shareButtonText: {
    fontStyle: "bold",
    color: "#1B1209",
    fontSize: 25,
    textAlign: "center",
    fontWeight: 700,
  },

  /******** card **************/
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
  cardTitle: {
    fontStyle: "bold",
    color: "#1B1209",
    fontSize: 20,
    // textAlign: "center",
    fontWeight: 700,
  },
});
