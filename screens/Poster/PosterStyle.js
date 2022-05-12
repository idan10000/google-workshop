import {Dimensions, StyleSheet} from "react-native";

export const AR_styles = StyleSheet.create({
  confirmBTContainer: {
    alignSelf: "center",
    paddingBottom: "5%",
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
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
    marginBottom:"4%",
  },
  lastSeen: {
    flexDirection:"row",
    alignItems:"center",
    // marginHorizontal: "5%",
    justifyContent:"center",

  },
  ownerData: {
    flexDirection:"row",
    alignItems:"center",
    // marginHorizontal: "5%",
    justifyContent:"center",
    height:"6%",
    marginBottom:"4%",
  },
  verticalLine:{
    height: 16,
    width: 1,
    backgroundColor: '#000',
    color:"#000",
    marginHorizontal: "4%"
  },
  contact: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    // elevation: 6,
    width:Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').height * 0.04,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11.111,
    backgroundColor: "#DCA277",
  },
  contactTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  myCard: {
      borderRadius: 15,
      marginTop:"2%",
  //     shadowColor: "#00000021",
  //     shadowOffset: {
  //       width: 20,
  //       height: 10,
  // },

    // shadowOpacity: 0.5,
    // shadowRadius: 7.49,
    // elevation: 12,
    marginVertical: 5,
    backgroundColor: "#F9F8F0",
    marginBottom:"5%",

  }

});
