import { StyleSheet, Text, View } from 'react-native';

export const pageLaunchStyle = StyleSheet.create({
    totalWrapper:{
        paddingTop: 50,
        flex: 1,

    },
    appNameHeader:{
        fontSize:70,
        alignItems: 'center',
        justifyContent: 'center',
        margin:8,

    },
    slogenContainer:{
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',


    },
    appLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        height:150,
        width:170,
        resizeMode: 'stretch',
        marginBottom:'5%'

    },

    AvatarContainer:{

        justifyContent: 'center',
        flexDirection: "row",

    },

    avatar:{
        marginRight:10,
        marginLeft:10,
    },


    text:{
        fontSize: 18,
        margin: 2
    },


    containerForRegisterClick:{
        marginTop:"8%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",

    },
    sellingText:{
        textAlign: 'center',
        marginTop:40,
        justifyContent: 'center',
        alignItems: 'center',
    }, bottomText: {
        fontSize: 16,
    },
    howToSign: {
        marginTop:30,
        flexDirection:'column',
        justifyContent: 'center',
    },
    cliclHere: {
        fontSize:20,
        fontWeight: 'bold'
    },
        bigTitle: {
            color: "#1B1209",
            fontSize: 24,
            fontWeight: "700",
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',

        },
    emailRegist: {
        marginVertical:10,
        marginTop:"8%",
        alignItems: 'center',
        justifyContent: 'center',
        color:"#1B1209",
    }


});
