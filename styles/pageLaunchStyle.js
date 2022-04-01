import { StyleSheet, Text, View } from 'react-native';

export const pageLaunchStyle = StyleSheet.create({
    totalWrapper:{
        paddingTop: 50,
        flex: 1,

    },
    appNameHeader:{
        fontSize:35,
        alignItems: 'center',
        justifyContent: 'center',
        margin:10
    },
    slogenContainer:{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',

    },
    appLogo: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:160,
        width:200,
        resizeMode: 'stretch',
      },

    AvatarContainer:{
        justifyContent: 'center',
        flex: 1,
        flexDirection: "row",

    },

    avatar:{
        marginRight:20,
        marginLeft: 20
    },
    containerForMiddleLines:{
        justifyContent: 'center',

        flexDirection: "row",
        padding: 1,
        alignItems: 'center',

    },
    orSeperator1: {
        flex:1,
        height: 3,
        backgroundColor: '#333',
      },
      text:{
        margin: 13
    },
      orSeperator2: {
        width: 70,
        height: 3,
        backgroundColor: '#333',
      },
    signupButton:{
        height: 60,
        marginBottom:24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,

    },
    containerForRegisterClick:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginBottom:400,

    },
    sellingText:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin:15
    }

  });
